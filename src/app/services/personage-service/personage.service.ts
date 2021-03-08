import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonageService {

  apiSerie;

  constructor(
    private http: HttpClient
  ) {
    this.apiSerie = environment.apiSerie;
  }

  listPersonages(page): Observable<any> {
    return this.http.get<any>(
      `${this.apiSerie}/character/?page=${page}`
    ).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  personage(id): Observable<any> {
    return this.http.get<any>(
      `${this.apiSerie}/character/${id}`
    ).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
