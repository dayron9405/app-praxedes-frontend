import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// modules
import { ComponentsModule } from 'src/app/components/components.module';

// routes
import { AppPraxedesRoutingModule } from './app-praxedes-routing.module';

//Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';

// component
import { AppPraxedesComponent } from './app-praxedes.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { PersonageComponent } from './personage/personage.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [AppPraxedesComponent, EpisodesComponent, PersonageComponent, FavoritesComponent],
  imports: [
    CommonModule,
    AppPraxedesRoutingModule,
    ComponentsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  providers: [DatePipe]
})
export class AppPraxedesModule { }
