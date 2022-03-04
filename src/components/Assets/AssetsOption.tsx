import { useNewProductContext } from "@/context/NewProductContext/NewProductProvider";

interface IProps {
  variantId: number | undefined;
  assetsId: string | undefined;
}

const Item: React.FC<React.HTMLAttributes<HTMLLIElement>> = ({
  children,
  ...props
}) => (
  <li
    {...props}
    className="hover:bg-zinc-300 w-full my-1 px-4 cursor-pointer text-zinc-700"
  >
    {children}
  </li>
);

export const AssetsOption: React.FC<IProps> = ({ variantId, assetsId }) => {
  const { newProduct, setNewProduct } = useNewProductContext();
  const handleRemove = () => {
    let variants = newProduct.variants;

    variants[Number(variantId)].assets = variants[
      Number(variantId)
    ].assets.filter((e) => e.id != assetsId);

    setNewProduct({ ...newProduct, variants });
  };
  return (
    <ul className="bg-zinc-100 rounde-md py-1 border">
      <Item onClick={handleRemove}>Remover</Item>
      <Item>Definir como padrão</Item>
    </ul>
  );
};
