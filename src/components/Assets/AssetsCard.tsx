import { IAssets } from "@/types";
import React from "react";

interface IProps {
  item: IAssets;
  handleClick: (id: string) => void;
  selectedId: string;
}

const AssetsCard: React.FC<IProps> = ({ item, handleClick, selectedId }) => {
  return (
    <div
      onClick={() => handleClick(item.id)}
      className={`rounded-md shadow-sm hover:shadow-md duration-200 m-2 w-[8rem] md:w-[7rem] ${
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

export default React.memo(AssetsCard);
