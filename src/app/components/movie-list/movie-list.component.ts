import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../core/services/movie.service';
import {ResponseService} from '../../core/services/response.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.getMovies();
  }


  getMovies(): void {
    this.movieService.getMovies().subscribe((result: ResponseService) => {
      if (result.isSuccess()) {
        this.movies = result.getData();
      }
    }, err => {
      console.log(err);
    });
  }
}
