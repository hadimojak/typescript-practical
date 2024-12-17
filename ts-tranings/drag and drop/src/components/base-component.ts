//#region Component
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
