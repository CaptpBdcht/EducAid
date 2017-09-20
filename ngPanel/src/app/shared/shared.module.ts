import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterModule } from './footer/footer.module';
import { MakersModule } from './makers/makers.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

import {
  AutoCompleteModule,
  ButtonModule,
  ChartModule,
  CodeHighlighterModule,
  ConfirmDialogModule,
  DataListModule,
  DataTableModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  GalleriaModule,
  GrowlModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  MessagesModule,
  OrderListModule,
  PanelModule,
  PickListModule,
  RatingModule,
  SelectButtonModule,
  TabMenuModule,
  TabViewModule,
  TreeModule
} from 'primeng/primeng';

@NgModule({
  imports: [],
  exports: [
    // Angular
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    // EducAid
    FooterModule,
    MakersModule,
    NavbarModule,
    SidebarModule,
    // PrimeNG
    AutoCompleteModule,
    ButtonModule,
    ChartModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    DataListModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    GalleriaModule,    
    GrowlModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MessagesModule,
    OrderListModule,
    RatingModule,
    PanelModule,
    PickListModule,
    SelectButtonModule,
    TabMenuModule,
    TabViewModule,
    TreeModule
  ],
  declarations: []
})
export class SharedModule {}
