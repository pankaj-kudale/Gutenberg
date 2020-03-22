import { Author } from './author';
import { Format } from './format';

export class Book {
    id: number;
    title: string;
    authors: Author[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean | null;
    media_type: string;
    formats: Format[];
    download_count: number;
}