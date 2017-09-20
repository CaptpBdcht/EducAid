import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';

import { SidebarComponent }	from './sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule
    ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule { }
