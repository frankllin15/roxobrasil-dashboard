import { IAssets } from "@/types";

export interface IError {
  message: string;
  code: string;
}

export interface Payload {
  errors: IError[];
  success: boolean;
}

export interface IAssetsResult {
  error: IError[];
  success: boolean;

  items: IAssets[];
}
