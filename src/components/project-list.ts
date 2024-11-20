import { DragTarget } from "../models/drag-drop";
import Component from "./base-component";
import * as PRJ from "../models/project";
import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project";
import { ProjectItem } from "./project-item";

//#region ProjectList
export class ProjectList extends Component<HTMLDivElement, HTMLAreaElement> implements DragTarget {
  assignedProjects: PRJ.Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul") as HTMLUListElement;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul") as HTMLUListElement;
    listEl.classList.remove("droppable");
  }

  @AutoBind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(prjId, this.type === "active" ? PRJ.ProjectStatus.Active : PRJ.ProjectStatus.Finished);
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    (this.element.querySelector("ul") as HTMLUListElement).id = listId;
    (this.element.querySelector("h2") as HTMLHeadElement).textContent = this.type.toUpperCase() + " PROJECTS";
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addlistener((projects: PRJ.Project[]) => {
      const releventProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === PRJ.ProjectStatus.Active;
        } else return prj.status === PRJ.ProjectStatus.Finished;
      });
      this.assignedProjects = releventProjects;
      this.renderProject();
    });
  }

  private renderProject() {
    // new ProjectItem(this.assignedProjects, this.type);
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    listEl.innerHTML = "";

    for (const prjItem of this.assignedProjects) {
      new ProjectItem((this.element.querySelector("ul") as HTMLUListElement).id, prjItem);
    }
  }
}
//#endregion ProjectList
