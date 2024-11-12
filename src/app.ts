function AutoBind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDiscriptop: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDiscriptop;
}

// function ValidateInput(validateFn: (instance: any) => boolean) {
//   return function (_: any, _2: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//       if (!validateFn(this)) alert("invalid input1");
//       else return originalMethod.apply(this, args);
//     };
//   };
// }

interface Validatable {
  value: string | number;
  required?: boolean;
  //   required: boolean|undefined;
  minLenght?: number;
  maxLenght?: number;
  min?: number;
  max?: number;
}
function validate(validatableInput: Validatable): boolean {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (validatableInput.minLenght != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLenght;
  }
  if (validatableInput.maxLenght != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLenght;
  }
  if (validatableInput.min != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

//#region Component
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElmenentId?: string) {
    this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
    this.hostElement = <T>document.getElementById(hostElementId);
    const impoertedNode = document.importNode(this.templateElement.content, true);
    this.element = impoertedNode.firstElementChild as U;
    if (newElmenentId) this.element.id = newElmenentId;

    this.attach(insertAtStart);
  }

  private attach(insertTerm: boolean) {
    this.hostElement.insertAdjacentElement(insertTerm ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void;

  abstract renderContent(): void;
}
//#endregion Component

//#region ProjectInput
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLTextAreaElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  // @ValidateInput(      (instance: any) =>        instance.titleInputElement.value.trim().length !== 0 &&        instance.descriptionInputElement.value.trim().length !== 0 &&        instance.peopleInputElement.value.trim().length !== 0    )
  private getherUserUnput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titlevalidatable: Validatable = { value: enteredTitle, required: true };
    const descvalidatable: Validatable = { value: enteredDescription, required: true, minLenght: 5 };
    const peoplevalidatable: Validatable = { value: +enteredPeople, required: true, min: 1, max: 5 };

    if (!validate(titlevalidatable) || !validate(descvalidatable) || !validate(peoplevalidatable)) {
      alert("invalid input");
      return;
    } else return [enteredTitle, enteredDescription, +enteredPeople];
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getherUserUnput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}
//#endregion ProjectInput

//#region ProjectList
class ProjectList extends Component<HTMLDivElement, HTMLAreaElement> {
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    (this.element.querySelector("ul") as HTMLUListElement).id = listId;
    (this.element.querySelector("h2") as HTMLHeadElement).textContent = this.type.toUpperCase() + " PROJECTS";
  }

  configure(): void {
    projectState.addlistener((projects: Project[]) => {
      const releventProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        } else return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = releventProjects;
      this.renderProject();
    });
  }

  private renderProject() {
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    listEl.innerHTML = "";

    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }
}
//#endregion ProjectList
enum ProjectStatus {
  Active,
  Finished,
}
//#region Project
class Project {
  constructor(public id: string, public title: string, public descrption: string, public people: number, public status: ProjectStatus) {}
}
//#endregion Project

type Listener<T> = (items: T[]) => void;

//#region state
class State<T> {
  protected listeners: Listener<T>[] = [];

  addlistener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
//#endregion state

//#region ProjectState
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, desc: string, people: number) {
    const newProject = new Project(Math.random().toString(), title, desc, people, ProjectStatus.Active);
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}
//#endregion ProjectState

const projectState = ProjectState.getInstance();
new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
