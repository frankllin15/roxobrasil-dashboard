import { useNewProductContext } from "@/context/NewProductContext/NewProductProvider";
import usePrompt from "@/hooks/usePrompt";
import { IAssets, IVariant } from "@/types";
import { Modal, Popper } from "@mui/material";
import { ReactEventHandler, useState } from "react";
import { AssetsModal } from "./Assets/AssetsModal";
import { AssetsOption } from "./Assets/AssetsOption";
import { LandscapeIcon, TrashIcon } from "./icons";
import InputText from "./InputText";
import { WithPopover } from "./Popover";

interface IVariantInput {
  id: number;
  // handleRemove: (id: number) => void;
  // handleChange: (e: any) => void;
  item: IVariant;
}

export const VariantInput: React.FC<IVariantInput> = ({ id, item }) => {
  const [openModal, setOpenModal] = useState(false);
  const { newProduct, setNewProduct } = useNewProductContext();

  const handleChange: ReactEventHandler<HTMLInputElement> = (e) => {
    e.target;
    const { name, value } = e.currentTarget;
    console.log(id);
    const variants = newProduct.variants;
    const typeNumber = ["price", "quantity"];

    variants[Number(id)] = {
      ...variants[Number(id)],
      [name]: typeNumber.includes(name) ? Number(value) : value,
    };

    setNewProduct({ ...newProduct, variants });
  };

  const handleRemove = () => {
    const variants = newProduct.variants.filter((_, _id) => _id !== Number(id));
    console.log(variants);
    setNewProduct({ ...newProduct, variants: variants });
  };
  const handleSelectAssets = (selectedAssets: IAssets) => {
    // Se variants não contiver selectedAssets
    if (
      !newProduct.variants[Number(id)].assets?.some(
        (e) => e.id == selectedAssets.id
      )
    ) {
      const variants = newProduct.variants;

      variants[Number(id)].assets.push(selectedAssets);
      setNewProduct({ ...newProduct, variants });
      console.log(selectedAssets);
    }
  };
  const toggleOpen = () => {
    setOpenModal(!openModal);
  };

  return (
    <li className="border bg-zinc-50 p-2 my-2 grid grid-cols-[200px_1fr] grid-rows-[60px_1fr] gap-2 ">
      <InputText
        // value={item}
        onChange={handleChange}
        title="SKU"
        name="SKU"
        type="text"
        // required
      />
      <div className="flex flex-row justify-between items-start">
        <InputText
          style={{ width: "100%" }}
          value={item.name}
          title="Nome"
          onChange={handleChange}
          name="name"
          type="text"
          required
        />
        <button onClick={handleRemove}>
          <TrashIcon className="w-6 h-6 text-red-400 inline-block" />
        </button>
      </div>
      <div className="text-zinc-400">
        {item.assets.some((e) => e.id) ? (
          <div className="">
            <img
              src={item.assets[0]?.source}
              width={item.assets[0]?.width}
              height={item.assets[0]?.height}
              alt=""
              className="w- border border-zinc-300"
            />
            <div className="my-2 bg-zinc-100">
              {item.assets.map((e, key) => (
                <WithPopover
                  key={key}
                  content={<AssetsOption variantId={id} assetsId={e.id} />}
                >
                  <img
                    className="w-14 border border-zinc-300 inline mr-1"
                    src={e.source}
                    width={e.width}
                    height={e.height}
                    alt=""
                  />
                </WithPopover>
              ))}
            </div>
          </div>
        ) : (
          <>
            <LandscapeIcon className=" max-w-[110px] mx-auto stroke-zinc-400" />
            <p className="text-center">Nenhuma Imagem</p>
          </>
        )}
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 rounded-[4px] w-full shadow-sm text-cyan-700 border font-semibold text-xl border-cyan-700"
        >
          Adicionar
        </button>
      </div>
      <div>
        <InputText
          value={item.color}
          name="color"
          onChange={(e) => handleChange(e)}
          type="text"
          title="Cor"
          required
          style={{ display: "inline-flex", margin: ".3rem .5rem .3rem" }}
        />
        <InputText
          title="Tamanho"
          value={item.size}
          name="size"
          onChange={(e) => handleChange(e)}
          type="text"
          required
          style={{ display: "inline-flex", margin: ".3rem .5rem .3rem" }}
        />
        <InputText
          value={item.price}
          name="price"
          onChange={(e) => handleChange(e)}
          type="number"
          min={0}
          title="Preço"
          step="0.01"
          required
          style={{ display: "inline-flex", margin: ".3rem .5rem .3rem" }}
        />
        <InputText
          title="Quantidade"
          value={item.quantity}
          name="quantity"
          type="number"
          min={0}
          onChange={(e) => handleChange(e)}
          required
          style={{ display: "inline-flex", margin: ".3rem .5rem .3rem" }}
        />
      </div>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AssetsModal handleAdd={handleSelectAssets} handleClose={toggleOpen} />
      </Modal>
    </li>
  );
};
