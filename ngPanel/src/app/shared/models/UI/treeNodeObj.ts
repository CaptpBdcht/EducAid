export class TreeNodeObj {
  constructor(
    public label: string = null,
    public data: string = null,
    public expandedIcon: string = null,
    public collapsedIcon: string = null,
    public icon: string = null,
    public selectable: boolean = true,
    public children: TreeNodeObj[] = null
  ) {}
}
