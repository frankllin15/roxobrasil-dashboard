import { IAssetsResult } from "@/lib/graphql";
import { ASSETS_QUERY } from "@/lib/graphql/query";
import { IAssets } from "@/types";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LandscapeIcon } from "../icons";
import { AssetsCard } from "./AssetsCard";

interface IProps {
  handleClose: () => void;
  handleSelect: (selectedAssets: IAssets) => void;
}

export const AssetsModal: React.FC<IProps> = ({
  handleClose,
  handleSelect,
}) => {
  const { data } = useQuery<{ assets: IAssetsResult }>(ASSETS_QUERY, {
    variables: { input: { take: 100 } },
  });

  const [selectedAssets, setSelectedAssets] = useState<IAssets | null>(null);

  const handleClick = (id: number) => {
    if (selectedAssets?.id == id) {
      setSelectedAssets(null);
    } else {
      const assets = data?.assets.items.find((item) => item.id == id);

      if (assets) setSelectedAssets(assets);
    }
  };
  return (
    <div className="w-4/5 h-[95%] flex flex-col  bg-zinc-100 p-4 rounded-md overflow-hidden">
      <div className="mb-4">
        <h1 className="text-xl inline-block">Selecione a imagem</h1>
        <button
          type="button"
          className="border border-cyan-700 px-4 py-1 mx-4 text-neutral-100 text-md rounded-[.3rem] bg-cyan-800 hover:bg-cyan-700"
        >
          Carregar Imagem
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Pesquise por uma image existente"
          className="border border-zinc-600 px-4 mb-4 w-full h-10 rounded-md"
        />
      </div>
      <div className="grid grid-cols-[1fr_280px] md:grid-cols-[1fr_230px] gap-2 overflow-hidde w-full max-h-[85%]">
        <div className="mb-10 inline-flex flex-row flex-wrap overflow-y-scroll ">
          {data?.assets.success &&
            data.assets.items.map((item, id) => (
              <AssetsCard
                selectedId={selectedAssets?.id || -1}
                handleClick={handleClick}
                key={id}
                item={item}
              />
            ))}
        </div>
        <div className="flex flex-col justify-between items-start mb-2 p-4 px-3 border min-h-[300px] shadow-sm border-zinc-200 bg-zinc-100 text-center text-zinc-400 text-xl ">
          {selectedAssets == null ? (
            <>
              <LandscapeIcon className=" max-w-[110px] mx-auto stroke-zinc-400" />
              <p>Nenhuma Imagem</p>
            </>
          ) : (
            <div className="text-left mb-2  text-zinc-400">
              <img
                src={selectedAssets.source}
                width={selectedAssets.width}
                height={selectedAssets.height}
                alt=""
              />
              <ul>
                <li>
                  Dimenções:{" "}
                  {`${selectedAssets.width}x${selectedAssets.height}`}
                </li>
                <li></li>
              </ul>
            </div>
          )}
          <div className="justify-self-end w-full flex flex-row justify-between">
            <button
              onClick={handleClose}
              type="button"
              className="border max-w-[8rem] border-cyan-800 px-2 py-1 mr-4 text-neutral-100 text-md rounded-[.3rem] bg-cyan-800 hover:bg-cyan-700 inline-block shadow-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (selectedAssets) {
                  handleSelect(selectedAssets);
                  handleClose();
                }
              }}
              type="button"
              className="border border-cyan-700 px-2 py-1 ml-auto text-cyan-800 text-md rounded-[.3rem]  hover:bg-teal-50 inline-block shadow-sm"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
