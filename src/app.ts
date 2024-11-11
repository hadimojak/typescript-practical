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

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById("project-input");
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLTextAreaElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

    this.configure();
    this.attach();
  }

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

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

class SingleProject {}

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLAreaElement;
  assignedProjects: any[] = [];

  constructor(private type: "active" | "finished") {
    this.templateElement = <HTMLTemplateElement>document.getElementById("project-list");
    this.hostElement = <HTMLDivElement>document.getElementById("app");
    const impoertedNode = document.importNode(this.templateElement.content, true);

    this.element = impoertedNode.firstElementChild as HTMLAreaElement;
    this.element.id = `${this.type}-projects`;

    projectState.addlistener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProject();
    });

    this.attach();
    this.renderContent();
  }

  private renderProject() {
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    (this.element.querySelector("ul") as HTMLUListElement).id = listId;
    (this.element.querySelector("h2") as HTMLHeadElement).textContent = this.type.toUpperCase() + " PROJECTS";
  }
}

class ProjectState {
  private projects: any[] = [];
  private listeners: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addlistener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, desc: string, people: number) {
    const newProject = { id: Math.random().toString(), title, desc, people };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();
new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
