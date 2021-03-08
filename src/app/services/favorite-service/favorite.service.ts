import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// rxjs
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  baseUrl;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }

  listFavorite(page): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/Seleccion/api/favoritos`
    ).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  createFavorite(data): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/Seleccion/api/favoritos`,
      data
    ).pipe(
      map((response: any) => {
        return response;
      }),

    )
  }

  updateFavorite(data): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/Seleccion/api/favoritos`,
      data
    ).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  deleteFavorite(id): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/Seleccion/api/favoritos/${id}`,
    ).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

}
