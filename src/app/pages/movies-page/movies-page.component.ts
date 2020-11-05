import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../core/services/movie.service';
import {SearchResult} from '../../core/models/search-result.model';
import {Movie} from '../../core/models/movie.model';
import {MovieDetails} from '../../core/models/movie-details.model';
import {Genre} from '../../core/models/genre.model';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  result: SearchResult;
  movies: Array<Movie>;
  movieDetails: MovieDetails;
  genres: Array<Genre>;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMoviesGenres();
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

  getMovieDetailsById(movieId: number): void {
    this.movieService.getMovieDetailsById(movieId).subscribe(
      data => this.movieDetails = data,
      error => console.log(error.error.status_message)
    );
  }

  getMoviesGenres(): void {
    this.movieService.getMoviesGenres().subscribe(
      data => this.genres = data.genres,
      error => console.log(error.error.status_message)
    );
  }
}
