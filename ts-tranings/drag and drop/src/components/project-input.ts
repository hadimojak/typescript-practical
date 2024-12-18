import  Component  from "./base-component";
import * as vali from "../util/validation";
import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project";

//#region ProjectInput
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

    const titlevalidatable: vali.Validatable = { value: enteredTitle, required: true };
    const descvalidatable: vali.Validatable = { value: enteredDescription, required: true, minLenght: 5 };
    const peoplevalidatable: vali.Validatable = { value: +enteredPeople, required: true, min: 1, max: 5 };

    if (!vali.validate(titlevalidatable) || !vali.validate(descvalidatable) || !vali.validate(peoplevalidatable)) {
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
