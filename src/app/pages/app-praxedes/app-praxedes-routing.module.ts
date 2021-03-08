import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesComponent } from './episodes/episodes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PersonageComponent } from './personage/personage.component';
import { AppPraxedesComponent } from './app-praxedes.component';

const appPraxedesRoutes: Routes = [
  {
    path: '',
    component: AppPraxedesComponent,
    children: [
      {
        path: 'episodes',
        component: EpisodesComponent
      },
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: 'personage',
        component: PersonageComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appPraxedesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppPraxedesRoutingModule { }
