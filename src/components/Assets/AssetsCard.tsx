import { IAssets } from "@/types";

interface IProps {
  item: IAssets;
  handleClick: (id: number) => void;
  selectedId: number;
}

export const AssetsCard: React.FC<IProps> = ({
  item,
  handleClick,
  selectedId,
}) => {
  console.log(item);
  return (
    <div
      onClick={() => handleClick(item.id)}
      className={`rounded-md shadow-sm m-2 w-[8rem] md:w-[7rem] ${
        selectedId == item.id ? "border border-zinc-400" : ""
      }`}
    >
      <div className="max-w-full hover:cursor-pointer">
        <img
          className=""
          width={item.width}
          height={item.height}
          src={item.source}
          alt=""
        />
      </div>
      <p className="py-2 px-1 text-center">Nome do assets</p>
    </div>
  );
};
