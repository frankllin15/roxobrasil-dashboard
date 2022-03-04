import { IProduct } from "@/types";
import { useContext, useState } from "react";
import NewProductContext from "./Context";

export const NewProductProvider: React.FC = ({ children }) => {
  const defatulValue = {
    name: "",
    description: "",
    variants: [],
  };
  const [newProduct, setNewProduct] = useState<IProduct>(
    defatulValue as IProduct
  );

  return (
    <NewProductContext.Provider value={{ newProduct, setNewProduct }}>
      {children}
    </NewProductContext.Provider>
  );
};
export const useNewProductContext = () => useContext(NewProductContext);
