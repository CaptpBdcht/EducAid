export class CourseHasDocument {
  static fromJSONArray(array: Array<any>): CourseHasDocument[] {
    return array.map(obj => new CourseHasDocument(obj.course_id, obj.document_id));
  }
  constructor(
    public courseId: number,
    public documentId: number
  ) {}
}
