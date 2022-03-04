import { IAssets } from "@/types";
import { Modal } from "@mui/material";
import { useState } from "react";
import { AssetsModal } from "./AssetsModal";
import { LandscapeIcon } from "../icons";

export const AssestsInput: React.FC = () => {
  const [assets, setAssets] = useState<IAssets[]>([]);

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSelectAssets = (selectedAssets: IAssets) => {
    if (!assets.some((item) => item.id == selectedAssets.id))
      setAssets([...assets, selectedAssets]);
  };

  return (
    <div className="w-full h-full border border-zinc-400 border- bg-zinc-100 shadow-sm rounded-md">
      {assets.length > 0 ? (
        <div className="w-full mb-2">
          <img src={assets[0].source} alt="" />
        </div>
      ) : (
        <div className="w-full  mb-2 p-4 px-3 bg-zinc-200 text-center text-zinc-400 text-xl ">
          <LandscapeIcon className="w-full max-w-[200px] mx-auto stroke-zinc-400" />
          <p>Nenhuma Imagem</p>
        </div>
      )}
      <div className="px-2 pb-2 flex flex-row">
        {assets.length > 0 &&
          assets.map((item) => (
            <div className="w-16 bg-red-400 m-1">
              <img
                src={item.source}
                width={item.width}
                height={item.height}
                alt=""
              />
            </div>
          ))}
      </div>
      <hr className="w-full pt-8 border-zinc-400" />
      <div className="w-full p-3">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="border border-cyan-700 px-4 py-1 text-cyan-700 text-xl rounded-[.3rem] hover:bg-teal-50"
        >
          Adicionar
        </button>
      </div>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AssetsModal handleAdd={handleSelectAssets} handleClose={toggleOpen} />
      </Modal>
    </div>
  );
};
