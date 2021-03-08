import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

//components
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

// Services
import { EpisodesService } from 'src/app/services/episodes-service/episodes.service';
import { PersonageService } from 'src/app/services/personage-service/personage.service';
import { EpisodesInterface } from 'src/app/models/episodes/episodes-interface';
import { DataCardInterface } from 'src/app/models/dataCard/data-card-interface';
import { FavoriteService } from 'src/app/services/favorite-service/favorite.service';
import { PersonageInterface } from 'src/app/models/personage/personage-interface';
import { FavoritesInterface } from 'src/app/models/favorites/favorites-interface';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  titleModule: string = 'EPISODIOS';
  listEpisodes: any[] = [];
  personages: PersonageInterface[] = [];
  count: number = 0;
  pagesSize: number = 0;
  optionsRange: number = 20;
  page: number = 1;


  constructor(
    private episodeService: EpisodesService,
    private favoriteService: FavoriteService,
    private personageService: PersonageService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getListEpisodes(this.page);
  }

  getListEpisodes(pageSelect){
    this.episodeService.listEpisodes(pageSelect).subscribe((res) => {
      this.count = res.info.count;
      this.pagesSize = res.info.pages;
      this.optionsRange = res.results.length;
      const dataCard = res.results.map((element: EpisodesInterface): DataCardInterface => {
        return {
          id: element.id,
          avatar: {
            isAvatar: false,
            img: null
          },
          title: `Episodio: ${element.name}`,
          subtitle: `Fecha al aire: ${this.datePipe.transform(element.air_date, 'MM/dd/yyyy')}`,
          imageHead: {
            isImageHead: false,
            img: null
          },
          contentText: {
            isContentText: false,
            text: null
          },
          contentAction: {
            isContentAction: true,
            dataAction: {
              id: element.id,
              name: element.name,
              characters: element.characters
            }
          },
          footerAction: {
            isFooterAction: false,
            dataAction: null
          }
        }
      })
      this.listEpisodes = dataCard;
    }, (err) => {
      console.log('err: ', err)
    })
  }

  changePage(event){
    this.page = (event.pageIndex+1);
    this.getListEpisodes(this.page);
  }

  openDialog(event) {
    const { characters, name } = event;
    characters.map(element => {
      const id = element.split('character/').pop();
      this.personageService.personage(id).subscribe(res => {
        this.personages.push({
          id_caracter: res.id,
          name: res.name,
          species: res.species,
          image: res.image,
          isFavorite: false
        })
      })
    })
    this.favoriteService.listFavorite(this.page).subscribe((favorites: FavoritesInterface[]) => {
      console.log('favorites favoritos filter', favorites)
      for(let item of favorites){
        const filterFavorites = this.personages.find((personage: PersonageInterface) => {
          return personage.id_caracter === item.id_caracter;
        });
        console.log('filterFavorites', filterFavorites)
        if (filterFavorites) {
          const indexFavorite = this.personages.indexOf(filterFavorites);
          console.log('indexFavorite', indexFavorite)
          this.personages[indexFavorite].isFavorite = true;
          console.log('personages[indexFavorite]', this.personages[indexFavorite])
        }
      }
      console.log('personages true favorites', this.personages)
      // const personagesFilter =
    })
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        personages: this.personages,
        episodio: name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
