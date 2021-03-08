import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonageInterface } from 'src/app/models/personage/personage-interface';
import { FavoritesInterface } from 'src/app/models/favorites/favorites-interface';

// Librerias
import Swal from 'sweetalert2';

// services
import { PersonageService } from 'src/app/services/personage-service/personage.service';
import { FavoriteService } from 'src/app/services/favorite-service/favorite.service';

@Component({
  selector: 'app-personage',
  templateUrl: './personage.component.html',
  styleUrls: ['./personage.component.scss']
})
export class PersonageComponent implements OnInit {

  titleModule: string = 'PERSONAJES';
  user: string = '';
  listPersonages: PersonageInterface[] = [];
  dataPersonages: PersonageInterface[] = []
  count: number = 0;
  pagesSize: number = 0;
  optionsRange: number = 20;
  page: number = 1;

  constructor(
    private personageServise: PersonageService,
    private favoriteService: FavoriteService,
    public dialog: MatDialog
  ) {
    this.user = localStorage.getItem('user');
  }

  ngOnInit(): void {
    this.getListPersonages(this.page);
  }

  getListPersonages(pageSelect){
    this.personageServise.listPersonages(pageSelect).subscribe(res => {
      this.count = res.info.count;
      this.pagesSize = res.info.pages;
      this.optionsRange = res.results.length;
      this.dataPersonages = res.results.map(element => {
        return {
          id_caracter: element.id,
          name: element.name,
          species: element.species,
          image: element.image,
          isFavorite: false
        }
      });
      this.favoriteService.listFavorite(this.page).subscribe((favorites: FavoritesInterface[]) => {
        console.log('favorites favoritos filter', favorites)
        for(let item of favorites){
          const filterFavorites = this.dataPersonages.find((personage: PersonageInterface) => {
            return personage.id_caracter === item.id_caracter;
          });
          console.log('filterFavorites', filterFavorites)
          if (filterFavorites) {
            const indexFavorite = this.dataPersonages.indexOf(filterFavorites);
            console.log('indexFavorite', indexFavorite)
            this.dataPersonages[indexFavorite].isFavorite = true;
            console.log('dataPersonages[indexFavorite]', this.dataPersonages[indexFavorite])
          }
        }
        console.log('dataPersonages true favorites', this.dataPersonages)
        // const dataPersonagesFilter =
      })
      this.listPersonages = this.dataPersonages;
    })
  }

  changePage(event){
    this.page = (event.pageIndex+1);
    this.getListPersonages(this.page);
  }

  selectedOption(option: PersonageInterface){
    console.log('Personage option', option)
    const name = `${option.name}`;
    const image = `${option.image}`;
    const species = `${option.species}`;
    let isFavorite = option.isFavorite;
    delete option.name;
    delete option.image;
    delete option.species;
    delete option.isFavorite;
    console.log('isFavorite', isFavorite)
    const dataFavorite = {
      ...option,
      observaciones: '',
      usuario: this.user
    }
    if (!isFavorite) {
      console.log('dataFavorite', dataFavorite);
      Swal.fire({
        icon: 'question',
        title: `¿Quieres agregar un comentario al personaje ${name}? `,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Cancelar',
        preConfirm: (obs) => {
          dataFavorite.observaciones = obs;
          return this.favoriteService.createFavorite(dataFavorite).subscribe(res => {
            console.log('res create favorite', res)
            const filterFavorites = this.listPersonages.find((personage: PersonageInterface) => {
              return personage.id_caracter === option.id_caracter;
            });
            console.log('filterFavorites', filterFavorites)
            if (filterFavorites) {
              const indexFavorite = this.listPersonages.indexOf(filterFavorites);
              console.log('indexFavorite', indexFavorite)
              this.listPersonages[indexFavorite].isFavorite = true;
              console.log('listPersonages[indexFavorite]', this.listPersonages[indexFavorite])
            }
            return res;
          }, (err) => {
            Swal.showValidationMessage(
              `Request failed`
            )
          })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (!result.isConfirmed) {
          return this.favoriteService.createFavorite(dataFavorite).subscribe(res => {
            console.log('res create favorite', res)
            const filterFavorites = this.listPersonages.find((personage: PersonageInterface) => {
              return personage.id_caracter === option.id_caracter;
            });
            console.log('filterFavorites', filterFavorites)
            if (filterFavorites) {
              const indexFavorite = this.listPersonages.indexOf(filterFavorites);
              console.log('indexFavorite', indexFavorite)
              this.listPersonages[indexFavorite].isFavorite = true;
              console.log('listPersonages[indexFavorite]', this.listPersonages[indexFavorite])
            }
            return res;
          }, (err) => {
            Swal.showValidationMessage(
              `Request failed`
            )
          })
        }
      })
    }else {
      console.log('DELETE FAVORITE')
      this.favoriteService.deleteFavorite(dataFavorite.id_caracter).subscribe(res => {
        console.log('res DELETE', res)
      })
    }
    option.name = name;
    option.image = image;
    option.species = species;
    option.isFavorite = isFavorite;
  }

}
