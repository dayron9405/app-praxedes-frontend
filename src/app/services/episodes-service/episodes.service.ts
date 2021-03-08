import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  apiSerie;

  constructor(
    private http: HttpClient
  ) {
    this.apiSerie = environment.apiSerie;
  }

  listEpisodes(page): Observable<any> {
    return this.http.get<any>(
      `${this.apiSerie}/episode?page=${page}`
    ).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

}
