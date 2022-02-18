export interface IError {
  message: string;
  code: string;
}

export interface Payload {
  errors: IError[];
  success: boolean;
}
