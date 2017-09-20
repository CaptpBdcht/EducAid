import { DocumentsComponent } from './documents.component';

import { ByCourseDocumentComponent } from './bycourse-document.component';
import { PublicDocumentComponent } from './public-document.component';
import { UploadDocumentComponent } from './upload-document.component';

export const DocumentsRoutes = {
  path: 'documents',
  component: DocumentsComponent,
  children: [
    { path: 'free', component: PublicDocumentComponent },
    { path: 'bycourse', component: ByCourseDocumentComponent },
    { path: 'upload', component: UploadDocumentComponent }
  ]
};

export const DocumentsComponents = [
  DocumentsComponent,
  ByCourseDocumentComponent,
  PublicDocumentComponent,
  UploadDocumentComponent
];
