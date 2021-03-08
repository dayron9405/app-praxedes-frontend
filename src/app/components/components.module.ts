import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

//components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TreeMenuComponent } from './tree-menu/tree-menu.component';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListComponent } from './list/list.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [ToolbarComponent, TreeMenuComponent, CardComponent, DialogComponent, ListComponent, AlertComponent],
  exports: [ToolbarComponent, TreeMenuComponent, CardComponent, DialogComponent, ListComponent, AlertComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTreeModule,
    MatCardModule,
    MatDialogModule,
    MatListModule
  ]
})
export class ComponentsModule { }
