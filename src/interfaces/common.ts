import { IGenericErrorMessage } from "./error";

export type IGenericResponse<T> = {
  meta?: {
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
