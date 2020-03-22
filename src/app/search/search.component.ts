import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  books: Book[];
  category: string;
  searchText: string;
  nextBooksLink: string;
  searchTextSubject$ = new Subject<string>();

  constructor(private bookService: BookService, private route: ActivatedRoute,
      private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.category = this.route.snapshot.params['category'];  
  }

  ngOnInit() {
    this.searchTextSubject$.pipe(
      debounceTime(1000)
    ).subscribe(result =>{
      this.searchText = result;
      this.getBooks();
    });

    this.getBooks();
  }

  openBook(book: Book){
    if(book.formats['text/html; charset=utf-8']){
      window.open(book.formats['text/html; charset=utf-8'], '_blank');
    } else if(book.formats['application/pdf']){
      window.open(book.formats['application/pdf'], '_blank');
    } else if(book.formats['text/plain; charset=utf-8']){
      window.open(book.formats['text/plain; charset=utf-8'], '_blank');
    } else{
      this.toastr.error('No viewable version available');
    }
  }

  onScroll() {
    this.spinner.show();
    this.bookService.getNextBooks(this.nextBooksLink)
    .subscribe(
      data => { this.books = this.books.concat(data.books); this.nextBooksLink = data.next, this.spinner.hide() },
      () => this.toastr.error('Unable to get data')
    );
  }

  back(){
    this.router.navigate(['/home']);
  }
  getBooks(){
    this.spinner.show();
    if(this.searchText){
      this.bookService.searchBook(this.category, this.searchText)
        .subscribe(
          data => { this.books = data.books; this.nextBooksLink = data.next; this.spinner.hide() },
          () => { this.toastr.error('Unable to get data'); this.spinner.hide() }
        );
    } else{
      this.bookService.getAllBooksByCategory(this.category)
      .subscribe(
        data => { this.books = data.books; this.nextBooksLink = data.next; this.spinner.hide() },
        () => { this.toastr.error('Unable to get data'); this.spinner.hide() }
      );
    }
  }
}
