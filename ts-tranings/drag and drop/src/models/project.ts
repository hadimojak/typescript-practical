export enum ProjectStatus {
  Active,
  Finished,
}
//#region Project
export class Project {
  constructor(public id: string, public title: string, public descrption: string, public people: number, public status: ProjectStatus) {}
}
//#endregion Project
