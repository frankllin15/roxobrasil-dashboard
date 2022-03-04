import { IProduct } from "@/types";
import { Link } from "react-router-dom";

interface IProps {
  item: IProduct;
  handleDelete: (productID: string) => void;
}

export const ProductItem: React.FC<IProps> = ({ item, handleDelete }) => {
  const handleClick = () => {
    if (item.id) handleDelete(item.id);
  };

  return (
    <li className="bg-zinc-100  h-40 grid grid-cols-[8rem_2fr_1fr_1fr] border border-neutral-300 shadow-sm rounded-sm items-center place-items-center mb-2 p-2 gap-">
      <img
        className="h-ful max-h-[9rem] w-auto mr-auto"
        src={item.variants[0].assets[0]?.source}
        alt=""
        width={item.variants[0].assets[0]?.width}
        height={item.variants[0].assets[0]?.height}
      />
      <span>{item.name}</span>
      <Link to={`edit/${item.id}`}>Editar</Link>
      <button onClick={handleClick} className="text-red-400">
        Deletar
      </button>
    </li>
  );
};
