import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '1c5abaaeaa13c66b570ad3042a0d51f4';
  private uri = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false`;

  constructor(protected http: HttpClient) {
  }

  getMoviesByName(name: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${name}`);
  }

  getMovieDetailsById(movieId: number): Observable<any> {
    console.log(movieId);
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
  }
}
