export const booksFilterableFields = ["genre", "publication_year"];

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publication_year?: number;
};
