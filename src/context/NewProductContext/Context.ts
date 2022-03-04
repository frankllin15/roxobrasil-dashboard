import { Payload } from "@/lib/graphql";
import React, { createContext, Dispatch, Reducer } from "react";
import { IProduct, ISession } from "../../types";

export interface ILogin {}

export interface INewProductContext {
  newProduct: IProduct;
  setNewProduct: Dispatch<React.SetStateAction<IProduct>>;
}

const NewProductContext = createContext<INewProductContext>(
  {} as INewProductContext
);

export default NewProductContext;
