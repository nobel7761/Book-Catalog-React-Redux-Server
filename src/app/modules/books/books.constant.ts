export const booksFilterableFields = [
  "searchTerm",
  "genre",
  "publication_year",
];

export const bookSearchableFields = ["title", "author", "genre"];

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publication_year?: number;
};
