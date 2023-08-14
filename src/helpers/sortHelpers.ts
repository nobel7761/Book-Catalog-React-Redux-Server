type IOptions = {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

type IOptionsResult = {
  sortBy: string;
  sortOrder: "asc" | "desc";
};
const calculateSorting = (options: IOptions): IOptionsResult => {
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    sortBy,
    sortOrder,
  };
};

export const sortHelpers = {
  calculateSorting,
};
