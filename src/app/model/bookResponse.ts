import { Book } from './book';

export class BookResponse{
    books: Book[];
    next: string;
}