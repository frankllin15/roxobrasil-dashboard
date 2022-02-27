import { AssestsInput } from "@/components/Assets/AssetsInput";
import styled from "styled-components";
import { TrashIcon } from "@/components/icons/index";
import DefaultButton from "@/components/DefatultButton";
import { ReactEventHandler, useEffect, useState } from "react";
import { IProduct, IVariant } from "@/types";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT_MUTATION } from "@/lib/graphql/mutation";
import { useAuth } from "@/context/AuthContex/AuthProvider";

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
  text-align: center;
  width: 100%;
`;

const Title: React.FC = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

interface IVariantInput {
  id: string;
  handleRemove: (id: string) => void;
  handleChange: (e: any) => void;
  item: IVariant;
}

const VariantInput: React.FC<IVariantInput> = ({
  id,
  handleRemove,
  handleChange,
  item,
}) => {
  return (
    <li className="border p-2 my-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_.5fr] gap-2 ">
      <Input
        value={item.name}
        id={id}
        onChange={handleChange}
        name="name"
        type="text"
        className="border"
        required
      />

      <Input
        value={item.color}
        name="color"
        id={id}
        onChange={(e) => handleChange(e)}
        type="text"
        className="border"
        placeholder="Ex.: Azul"
        required
      />
      <Input
        value={item.size}
        name="size"
        id={id}
        onChange={(e) => handleChange(e)}
        type="text"
        className="border"
        required
      />
      <Input
        id={id}
        value={item.price}
        name="price"
        onChange={(e) => handleChange(e)}
        type="number"
        // defaultValue={}
        min={0}
        placeholder="R$"
        step="0.01"
        className="border text-center"
        required
      />
      <Input
        id={id}
        value={item.quantity}
        name="quantity"
        type="number"
        min={0}
        className="border"
        onChange={(e) => handleChange(e)}
        required
      />

      <button onClick={() => handleRemove(id)}>
        <TrashIcon className="w-6 h-6 text-red-400" />
      </button>
    </li>
  );
};

export const NewProduct: React.FC = () => {
  const [newProduct, setNewProduct] = useState<IProduct>({
    name: "",
    description: "",
    variants: [],
  });
  const [createProduct, { loading, data }] = useMutation(
    CREATE_PRODUCT_MUTATION
  );
  const { session } = useAuth();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChangeProduct: ReactEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setNewProduct({
      ...newProduct,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleChangeVariant: ReactEventHandler<HTMLInputElement> = (e) => {
    e.target;
    const { name, value, id } = e.currentTarget;
    console.log(id);
    const variants = newProduct.variants;
    const typeNumber = ["price", "quantity"];

    variants[Number(id)] = {
      ...variants[Number(id)],
      [name]: typeNumber.includes(name) ? Number(value) : value,
    };

    setNewProduct({ ...newProduct, variants });
  };

  const handleAddVariant = () => {
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, {} as IVariant],
    });
  };

  const handleRemoveVariant = (id: string) => {
    const variants = newProduct.variants.filter((_, _id) => _id !== Number(id));
    console.log(variants);
    setNewProduct({ ...newProduct, variants: variants });
  };

  const handleSubmit: ReactEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const variants = newProduct.variants.map((variant) => {
      variant.assets = [
        {
          height: 621,
          width: 517,
          source:
            "https://cea.vtexassets.com/arquivos/ids/53005161-1600-auto?v=637790016779070000&width=1600&height=auto&aspect=true",
        },
        {
          height: 621,
          width: 517,
          source:
            "https://cea.vtexassets.com/arquivos/ids/53005166-1600-auto?v=637790016814400000&width=1600&height=auto&aspect=true",
        },
      ];

      return variant;
    });
    setNewProduct({ ...newProduct, variants });

    createProduct({
      variables: { input: newProduct },
      context: { headers: { Authorization: `Bearer ${session?.token}` } },
    });

    console.log(newProduct);
  };

  // useEffect(() => {}, [newProduct.variants]);

  return (
    <form onSubmit={handleSubmit} className="p-3 mb-12">
      <div className="flex justify-between items-end mb-2">
        <Title>Detalhes do produto</Title>
        <DefaultButton type="submit">Criar</DefaultButton>
      </div>
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
          {/* <InputLabel>
            <label htmlFor="description" className="">
              Slug
            </label>
            <input
              type="text"
              className="inline-block"
              value={newProduct.slug}
            />
          </InputLabel> */}
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
          {newProduct.variants.length > 0 && (
            <>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_.5fr] place-items-center">
                <h4>Nome</h4>
                <h4>Cor</h4>
                <h4>Tamanho</h4>
                <h4>Preço</h4>
                <h4>Quantidade</h4>
              </div>
              {newProduct.variants.map((e, id) => (
                <VariantInput
                  handleChange={handleChangeVariant}
                  handleRemove={handleRemoveVariant}
                  key={id}
                  id={id.toString()}
                  item={e}
                />
              ))}
            </>
          )}
        </ul>
      </section>
    </form>
  );
};
