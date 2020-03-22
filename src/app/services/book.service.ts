import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Observable, of,  } from 'rxjs';
import { map  } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BookResponse } from '../model/bookResponse';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookCategories : string[] =[
    'Fiction',
    'Philosophy',
    'Drama',
    'History',
    'Humour',
    'Adventure',
    'Politics'
  ];
  books : Book[] = [];
  constructor(private http: HttpClient) { }

  getAllCategories(): string[]{
    return this.bookCategories; 
  }

  getAllBooksByCategory(category: string): Observable<BookResponse>{
    return this.http.get<BookResponse>(`http://skunkworks.ignitesol.com:8000/books?mime_type=image%2Fjpeg&topic=${category}`)
      .pipe(
        map(result=> <BookResponse>{
          books: result['results'],
          next: result['next']
        }
        )
      );
  }

  searchBook(category: string, searchText: string): Observable<BookResponse>{
    return this.http.get<BookResponse>(`http://skunkworks.ignitesol.com:8000/books?mime_type=image%2Fjpeg&topic=${category}&search=${searchText}`)
      .pipe(
        map(result=> <BookResponse>{
          books: result['results'],
          next: result['next']
        }
        )
      );
  }
  getNextBooks(url: string): Observable<BookResponse>{
    return this.http.get<BookResponse>(url)
      .pipe(
        map(result=> <BookResponse>{
          books: result['results'],
          next: result['next']
        }
        )
      );
  }
  
}
