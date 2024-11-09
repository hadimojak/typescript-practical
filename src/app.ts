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

  private getherUserUnput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length == 0) {
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
      console.log(title, desc, people);
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

const projectInput = new ProjectInput();
