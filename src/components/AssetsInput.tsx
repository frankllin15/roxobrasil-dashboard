import { IAssets } from "@/types";
import { useState } from "react";
import { LandscapeIcon } from "./icons";

export const AssestsInput: React.FC = () => {
  const initialState = [
    {
      source: "image 1",
    },
    {
      source: "image 2",
    },
    {
      source: "image 3",
    },
  ];
  const [assets, setAssets] = useState<IAssets[]>(initialState);

  return (
    <div className="w-full h-full border border-zinc-400 border- bg-zinc-100 shadow-sm rounded-md">
      <div className="w-full  mb-2 p-4 px-3 bg-zinc-200 text-center text-zinc-400 text-xl ">
        <LandscapeIcon className="w-full max-w-[200px] mx-auto stroke-zinc-400" />
        <p>Nenhuma Imagem</p>
      </div>
      <div className="px-2 pb-2 flex flex-row">
        {assets.length > 0 &&
          assets.map((item) => (
            <div className="w-12 h-12 bg-red-400 m-1">{item.source}</div>
          ))}
      </div>
      <hr className="w-full pt-8 border-zinc-400" />
      <div className="w-full p-3">
        <button
          // onClick={handleAddVariant}
          type="button"
          className="border border-cyan-700 px-4 py-1 text-cyan-700 text-xl rounded-[.3rem] hover:bg-teal-50"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};
