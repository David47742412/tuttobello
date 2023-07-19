export interface IResponse<T> {
  count: number;
  statusCode: number;
  message?: string;
  body?: T[];
}
