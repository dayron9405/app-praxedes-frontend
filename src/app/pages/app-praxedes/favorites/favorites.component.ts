import { Component, OnInit } from '@angular/core';
import { DataCardInterface } from 'src/app/models/dataCard/data-card-interface';
import { FavoritesInterface } from 'src/app/models/favorites/favorites-interface';
import { PersonageFavoritesInterface } from 'src/app/models/personageFavorites/personage-favorites-interface';

// Services
import { FavoriteService } from 'src/app/services/favorite-service/favorite.service';
import { PersonageService } from 'src/app/services/personage-service/personage.service';
import { isArray } from 'util';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  titleModule: string = 'FAVORITOS';
  listFavorites: any[] = [];
  dataPersonageFavorite: PersonageFavoritesInterface[] = [];
  count: number = 0;
  pagesSize: number = 0;
  optionsRange: number = 20;
  page: number = 1;

  constructor(
    private favoriteService: FavoriteService,
    private personageService: PersonageService
  ) {}

  ngOnInit(): void {
    this.getListFavorites(this.page);
  }

  getListFavorites(pageSelect){
    this.favoriteService.listFavorite(pageSelect).subscribe((res) => {
      console.log('res favorites', res)
      for(let item of res){
        this.personageService.personage(item.id_caracter).subscribe((character) => {
          this.dataPersonageFavorite.push({
            id: character.id,
            name: character.name,
            gender: character.gender,
            image: character.image,
            species: character.species,
            observaciones: item.observaciones,
            usuario: item.usuario
          });
          console.log('dataPersonageFavorite init', this.dataPersonageFavorite)
          this.setDataCard();
        })
      }
    })
  }

  setDataCard(){
    const dataCard = this.dataPersonageFavorite.map((element: PersonageFavoritesInterface): DataCardInterface => {
      console.log('element.observaciones ****', element.observaciones)
      return {
        id: element.id,
        avatar: {
          isAvatar: true,
          img: element.image
        },
        title: `Personaje: ${element.name}`,
        subtitle: `Especie: ${element.species}`,
        imageHead: {
          isImageHead: true,
          img: element.image
        },
        contentText: {
          isContentText: true,
          text: element.observaciones || element.observaciones != '' ? element.observaciones : 'No hay comentarios'
        },
        contentAction: {
          isContentAction: false,
          dataAction: null
        },
        footerAction: {
          isFooterAction: true,
          dataAction: {
            id_caracter: element.id,
            observaciones: element.observaciones,
            usuario: element.usuario
          }
        }
      }
    })
    console.log('dataCard', dataCard)
    this.listFavorites = dataCard;
  }

  changePage(event){
    this.page = (event.pageIndex+1);
    this.getListFavorites(this.page);
  }

  editComents(event){
    console.log('Favorite edit coments', event)
  }

  dislike(event){
    console.log('Favorite dislike', event)
  }

}
