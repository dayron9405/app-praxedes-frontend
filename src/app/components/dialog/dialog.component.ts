import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// interfaces
import { PersonageInterface } from 'src/app/models/personage/personage-interface';

// services
import { FavoriteService } from 'src/app/services/favorite-service/favorite.service';

// Librerias
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  data: any[] = []
  episodio: string = '';
  user: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any[],
    private favoriteService: FavoriteService,
    public dialogRef: MatDialogRef<any>
  ) {
    this.user = localStorage.getItem('user');
  }

  ngOnInit(): void {
    this.data = this.dataDialog['personages'];
    this.episodio = this.dataDialog['episodio'];
  }

  selectedOption(option: PersonageInterface){
    const name = `${option.name}`;
    const image = `${option.image}`;
    const species = `${option.species}`;
    const isFavorite = option.isFavorite;
    delete option.name;
    delete option.image;
    delete option.species;
    const dataFavorite = {
      ...option,
      observaciones: '',
      usuario: this.user
    }
    console.log('dataFavorite', dataFavorite)
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
          const filterFavorites = this.data.find((personage: PersonageInterface) => {
            return personage.id_caracter === option.id_caracter;
          });
          console.log('filterFavorites', filterFavorites)
          if (filterFavorites) {
            const indexFavorite = this.data.indexOf(filterFavorites);
            console.log('indexFavorite', indexFavorite)
            this.data[indexFavorite].isFavorite = true;
            console.log('data[indexFavorite]', this.data[indexFavorite])
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
          const filterFavorites = this.data.find((personage: PersonageInterface) => {
            return personage.id_caracter === option.id_caracter;
          });
          console.log('filterFavorites', filterFavorites)
          if (filterFavorites) {
            const indexFavorite = this.data.indexOf(filterFavorites);
            console.log('indexFavorite', indexFavorite)
            this.data[indexFavorite].isFavorite = true;
            console.log('data[indexFavorite]', this.data[indexFavorite])
          }
          return res;
        }, (err) => {
          Swal.showValidationMessage(
            `Request failed`
          )
        })
      }
    })
    option.name = name;
    option.image = image;
    option.species = species;
    option.isFavorite = isFavorite;
  }

}
