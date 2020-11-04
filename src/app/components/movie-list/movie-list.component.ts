import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../core/services/movie.service';
import {ResponseService} from '../../core/services/response.service';
import {Movie} from '../../core/models/movie.model';
import {SearchResult} from '../../core/models/search-result.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  result: SearchResult;
  movies: Array<Movie>;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
  }

  getMovies(movieName: string): void {
    this.movieService.getMoviesByName(movieName).subscribe(
      data => {
        this.result = data;
        this.movies = this.result.results;
      },
      error => console.log(error.error.status_message)
    );
  }

  search(input): void {
    const movieName = input.target.value;

    if (movieName.length > 2) {
      this.getMovies(movieName);
    } else {
      this.movies = [];
    }
  }
}
