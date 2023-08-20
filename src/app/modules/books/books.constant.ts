export const booksFilterableFields = [
  "searchTerm",
  "title",
  "author",
  "genre",
  "publication_date",
];

export const bookSearchableFields = ["title", "author", "genre"];

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publication_year?: number;
};
