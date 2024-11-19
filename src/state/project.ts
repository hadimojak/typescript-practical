import {Project,ProjectStatus} from '../models/project.js'

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
export class ProjectState extends State<Project> {
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
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const prj = this.projects.find((val) => val.id === projectId);
    if (prj && prj.status !== newStatus) {
      prj.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}
//#endregion ProjectState
export const projectState = ProjectState.getInstance();
