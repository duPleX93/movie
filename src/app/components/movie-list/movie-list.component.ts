import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../core/services/movie.service';
import {Movie} from '../../core/models/movie.model';
import {SearchResult} from '../../core/models/search-result.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MovieDetails} from '../../core/models/movie-details.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @ViewChild('content') modalContent: ElementRef;
  result: SearchResult;
  movies: Array<Movie>;
  movieDetails: MovieDetails;

  constructor(private movieService: MovieService,
              private modalService: NgbModal) {
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

  getMovieDetailsById(movieId: number): void {
    this.movieService.getMovieDetailsById(movieId).subscribe(
      data => {
        this.movieDetails = data;
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

  showMovieDetails(movieId) {
    this.getMovieDetailsById(movieId);
    this.open(this.modalContent);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.movieDetails = null;
  }
}
