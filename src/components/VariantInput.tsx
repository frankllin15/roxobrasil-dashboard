import { useNewProductContext } from "@/context/NewProductContext/NewProductProvider";
import usePrompt from "@/hooks/usePrompt";
import { IAssets, IVariant } from "@/types";
import { InputAdornment, Modal, Popper, TextField } from "@mui/material";
import { ReactEventHandler, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AssetsModal } from "./Assets/AssetsModal";
import { AssetsOption } from "./Assets/AssetsOption";
import { LandscapeIcon, TrashIcon } from "./icons";
import InputText from "./InputText";
import { WithPopover } from "./Popover";

interface IVariantInput {
  id: number;
  handleRemove: (id: number) => void;
  // handleChange: (e: any) => void;
  // item: IVariant;
}

export const VariantInput: React.FC<IVariantInput> = ({ id, handleRemove }) => {
  const [openModal, setOpenModal] = useState(false);
  const { newProduct, setNewProduct } = useNewProductContext();
  const { register, control, formState, watch, clearErrors } = useFormContext();
  const { fields, append, replace } = useFieldArray({
    control,
    name: `variants.${id}.assets`,
  });

  const watchedAssets = watch(`variants.${id}.assets`);

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

  const handleSelectAssets = (selectedAssets: IAssets) => {
    // Se variants não contiver selectedAssets
    if (
      !watchedAssets?.some((e: { id: string }) => e?.id == selectedAssets.id)
    ) {
      append(selectedAssets);
      // setNewProduct({ ...newProduct, variants });
      console.log(selectedAssets);
    }
  };
  const toggleOpen = () => {
    setOpenModal(!openModal);
  };

  return (
    <li className="border bg-zinc-50 p-2 my-2 grid grid-cols-[200px_1fr] grid-rows-[60px_1fr] gap-2 ">
      <TextField
        style={{ margin: ".4rem" }}
        id={`product-variant-${id}-SKU`}
        label="SKU"
        // {...register(`variants.${id}.SKU`, { required: false })}
      />
      <div className="flex flex-row justify-between items-center">
        <TextField
          style={{ margin: ".4rem", width: "100%" }}
          id={`product-variant-${id}-name`}
          label="Nome"
          {...register(`variants.${id}.name`, {
            required: "* Campo obrigatorio",
          })}
        />
        <button onClick={() => handleRemove(id)}>
          <TrashIcon className="w-8 h-8 text-red-500 inline-block" />
        </button>
      </div>
      <div className="text-zinc-400">
        {watchedAssets?.some((e: IAssets) => e) ? (
          <div className="">
            <img
              src={watchedAssets[0].source}
              width={watchedAssets[0].width}
              height={watchedAssets[0].height}
              alt=""
              className="w- border border-zinc-300"
            />
            <div className="my-2 bg-zinc-100">
              {watchedAssets?.map((e: IAssets, key: string) => (
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
        <TextField
          style={{ margin: ".4rem" }}
          id="{`product-variant-${id}-color`}"
          label="Cor"
          {...register(`variants.${id}.color`, { required: true })}
        />
        <TextField
          style={{ margin: ".4rem" }}
          id={`product-variant-${id}-size`}
          label="Tamanho"
          {...register(`variants.${id}.size`, { required: true })}
        />
        <TextField
          style={{ margin: ".4rem" }}
          id={`product-variant-${id}-price`}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{
            inputMode: "numeric",
          }}
          label="Preço"
          {...register(`variants.${id}.price`, { required: true })}
        />
        <TextField
          style={{ margin: ".4rem" }}
          id={`product-variant-${id}-quantity`}
          label="Quantidade"
          {...register(`variants.${id}.quantity`, { required: true })}
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
