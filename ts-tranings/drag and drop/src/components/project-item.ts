import { Draggable } from "../models/drag-drop";
import  Component  from "./base-component";
import { Project } from "../models/project";
import { AutoBind as autobind } from "../decorators/autobind";

//#region projectItem
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons `;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @autobind
  dragEndHandler(_: DragEvent): void {
    console.log("drag end");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    (this.element.querySelector("h2") as HTMLHeadElement).textContent = this.project.title;
    (this.element.querySelector("h3") as HTMLParagraphElement).textContent = this.persons + " assigned";
    (this.element.querySelector("p") as HTMLHeadElement).textContent = this.project.descrption;
  }
}
//#endregion projectItem
