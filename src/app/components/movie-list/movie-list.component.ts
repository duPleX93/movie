import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Movie} from '../../core/models/movie.model';
import {SearchResult} from '../../core/models/search-result.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MovieDetails} from '../../core/models/movie-details.model';
import {Genre} from '../../core/models/genre.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieListComponent {
  @ViewChild('content') modalContent: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() movies: Array<Movie>;
  @Input() result: SearchResult;
  @Input() movieDetails: MovieDetails;
  @Input() genres: Array<Genre>;
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() selectedMovieChange = new EventEmitter<number>();

  constructor(private modalService: NgbModal) {
  }

  search(input): void {
    const movieName = input.target.value;

    if (movieName.length > 2) {
      this.searchTextChange.emit(movieName);
    } else {
      this.movies = [];
    }
  }

  clearSearchInput(): void {
    this.searchInput.nativeElement.value = '';
    this.movies = [];
  }

  showMovieDetails(movieId): void {
    this.selectedMovieChange.emit(movieId);
    this.openModal(this.modalContent);
  }

  openModal(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'dark-modal', backdropClass: 'modal-backdrop'});
    this.movieDetails = null;
  }

  getGenreNamesByIds(genreIds: Array<number>): string {
    const genreNames = [];

    for (const genreId of genreIds) {
      genreNames.push(this.genres.filter(genre => genre.id === genreId).map(genre => genre.name).toString());
    }
    return genreNames.join(', ');
  }
}
