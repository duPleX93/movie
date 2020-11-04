import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ResponseService} from './response.service';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '1c5abaaeaa13c66b570ad3042a0d51f4';
  private uri = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false`;

  constructor(protected http: HttpClient) {
  }

  getMovies(): Observable<ResponseService> {
    return this.http.get(this.uri)
      .pipe(map((res: any) => new ResponseService().deserialize(res)),
        catchError(err => throwError(err.error.messages)));
  }
}
