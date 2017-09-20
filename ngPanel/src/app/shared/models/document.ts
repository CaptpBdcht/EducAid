export interface IDocument {
  id: number;
  subjectId: number;
  subject: String;
  name: string;
  URL: string;
  isPublic: boolean;
}

export class DocumentDTO implements IDocument {
  id: number;
  subjectId: number;
  subject: string;
  name: string;
  URL: string;
  isPublic: boolean;

  constructor(
    id?: number,
    subjectId?: number,
    subject?: string,
    name?: string,
    URL?: string,
    isPublic?: boolean
  ) {
    this.id = id;
    this.subjectId = subjectId;
    this.subject = subject;
    this.name = name;
    this.URL = URL;
    this.isPublic = isPublic;
  }
}

export class Document {
  static fromJSONArray(array: Array<any>): Document[] {
    return array.map(obj => new Document(obj.id, obj.name, obj.URL, obj.is_public));
  }
  constructor(
    public id: number,
    public name: string,
    public URL: string,
    public isPublic: boolean
  ) {}
}
