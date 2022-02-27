import { IProduct } from "@/types";
import { Link } from "react-router-dom";

interface IProps {
  items: IProduct[];
}

const Item: React.FC<{ item: IProduct }> = ({ item }) => {
  return (
    <li className="bg-zinc-200 shadow-sm h-48 grid grid-cols-[1fr_2fr_1fr_1fr] items-center place-items-center mb-4 p-2 gap-1">
      <img
        className="w-36 "
        src={item.variants[0].assets[0].source}
        alt=""
        width={item.variants[0].assets[0].width}
        height={item.variants[0].assets[0].height}
      />
      <span>{item.name}</span>
      <Link to={`edit/${item.id}`}>Editar</Link>
      <button className="text-red-400">Deletar</button>
    </li>
  );
};

export const ProductsList: React.FC<IProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, id) => (
        <Item key={id} item={item} />
      ))}
    </div>
  );
};
