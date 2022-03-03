import { AssestsInput } from "@/components/Assets/AssetsInput";
import styled from "styled-components";
import {
  LandscapeIcon,
  SpinnerLoading,
  TrashIcon,
} from "@/components/icons/index";
import DefaultButton from "@/components/DefatultButton";
import { ReactEventHandler, useEffect, useState } from "react";
import { IAssets, IProduct, IVariant } from "@/types";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT_MUTATION } from "@/lib/graphql/mutation";
import { useAuth } from "@/context/AuthContex/AuthProvider";
import NewProductContext from "@/context/NewProductContext/Context";
import {
  NewProductProvider,
  useNewProductContext,
} from "@/context/NewProductContext/NewProductProvider";
import InputText from "@/components/InputText";
import { VariantInput } from "@/components/VariantInput";
import usePrompt from "@/hooks/usePrompt";
import { IError } from "@/lib/graphql";
import { MultipleSelectChip } from "@/components/InputSelect";
import { TextField } from "@mui/material";

const InputLabel = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0.4rem;
  justify-content: space-start;
  input {
    height: 2rem;
    min-width: 13rem;
    /* width: 100%; */
    /* flex: 1; */
    /* background-color: #e4e4e7; */
    padding: 0 0.3rem 0;
    border: #e4e4e7 solid 1px;
    border-radius: 4px;
    /* justify-self: flex-end; */
  }
  label {
    /* align-self: flex-start; */
    font-weight: 500;
    min-width: 9rem;
  }
`;

const Input = styled.input`
  height: 2rem;
  padding: 0 0.3rem 0;
  border: #e4e4e7 solid 1px;
  border-radius: 4px;
  text-align: left;
  /* width: 100%; */
  margin: 0rem 0.3rem 0.5rem;
`;

const Title: React.FC = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const CreateProductPage: React.FC = () => {
  const { newProduct, setNewProduct } = useNewProductContext();
  const [collections, setCollections] = useState<string[]>([]);
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION);

  const [error, setError] = useState<IError[]>([]);
  const { session } = useAuth();

  // confirma se deja sair quando newProduct é nã nulo
  usePrompt("Dados não salvos serão perdidos!\nSair mesmo assim?");

  const handleChangeProduct: ReactEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    console.log("handleChange");
    setNewProduct({
      ...newProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleAddVariant = () => {
    const variant = {
      assets: [] as IAssets[],
    };
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, variant as IVariant],
    });
  };

  const handleSubmit: ReactEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const variants = newProduct.variants.map((variant) => {
      const assets = variant.assets.map((e) => ({ id: e.id }));

      return { ...variant, assets };
    });

    console.log(variants);

    const {
      data: {
        createProduct: { success, errors },
      },
    } = await createProduct({
      variables: { input: { ...newProduct, variants } },
      context: { headers: { Authorization: `Bearer ${session?.token}` } },
    });

    if (!success) setError(errors);
    console.log(errors);

    // console.log(newProduct);
  };

  const options = [
    { value: "id0", name: "Oliver Hansen" },
    { value: "id1", name: "Van Henry" },
    { value: "id2", name: "April Tucker" },
    { value: "id3", name: "Ralph Hubbard" },
    { value: "id4", name: "Omar Alexander" },
    { value: "id5", name: "Carlos Abbott" },
    { value: "id6", name: "Miriam Wagner" },
    { value: "id7", name: "Bradley Wilkerson" },
    { value: "id8", name: "Virginia Andrews" },
    { value: "id9", name: "Kelly Snyder" },
  ];

  console.log(collections);
  return (
    <form onSubmit={handleSubmit} className="p-3 mb-12">
      <div className="flex justify-between items-end mb-2">
        <Title>Detalhes do produto</Title>

        {loading ? (
          <SpinnerLoading />
        ) : (
          <DefaultButton type="submit">Criar</DefaultButton>
        )}
      </div>
      {error.length > 0 && (
        <span className="text-red-500 font-semibold">
          Falha ao criar producto. Verifique os campos e tente novamente
        </span>
      )}
      <hr className="mb-4" />
      <section className="grid grid-cols-[1fr_300px] lg:grid-cols-1 lg:grid-rows-2 gap-4">
        <div className="flex flex-col">
          <InputLabel>
            <label htmlFor="name">Nome do produto</label>
            <input
              type="text"
              name="name"
              onChange={handleChangeProduct}
              value={newProduct.name}
              className="inline-block rounded-sm"
              required
            />
          </InputLabel>
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Name"
          />

          <label className="font-semibold" htmlFor="description">
            Descrição
          </label>
          <textarea
            className="p-4 rounded-md border-zinc-400 border shadow-sm outline-zinc-800"
            name="description"
            onChange={handleChangeProduct}
            id=""
            rows={7}
            required
          ></textarea>
        </div>

        <AssestsInput />
      </section>
      <MultipleSelectChip
        selectedOption={collections}
        options={options}
        setSelectedOption={setCollections}
        label="Coleções"
      />
      <Title>Variantes do produto</Title>
      <hr className="mb-4" />
      <button
        onClick={handleAddVariant}
        type="button"
        className="border border-cyan-700 px-4 py-1 text-xl text-cyan-700 rounded-[.3rem] hover:bg-teal-50"
      >
        + Nova Variante
      </button>
      <section className="mt-4">
        <ul>
          {newProduct.variants.length > 0 &&
            newProduct.variants.map((e, id) => (
              <VariantInput
                // handleChange={handleChangeVariant}
                key={id}
                id={id}
                item={e}
              />
            ))}
        </ul>
      </section>
    </form>
  );
};
