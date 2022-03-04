import { AssestsInput } from "@/components/Assets/AssetsInput";
import { SpinnerLoading } from "@/components/icons/index";
import DefaultButton from "@/components/DefatultButton";
import { useState } from "react";
import { IVariant } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT_MUTATION } from "@/lib/graphql/mutation";
import { useAuth } from "@/context/AuthContex/AuthProvider";
import { VariantInput } from "@/components/VariantInput";
import { IError } from "@/lib/graphql";
import { MultipleSelectChip } from "@/components/InputSelect";
import { Alert, TextField } from "@mui/material";
import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller,
} from "react-hook-form";
import usePrompt from "@/hooks/usePrompt";
import { COLLECTIONS_QUERY } from "@/lib/graphql/query";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "@/components/AlertModal";

interface IFormInputs {
  name: string;
  description: string;
  variants: IVariant[];
  collections: { id: string }[];
}

const Title: React.FC = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const CreateProductPage: React.FC = () => {
  const { data: collectionsData } = useQuery(COLLECTIONS_QUERY, {
    variables: {
      input: {
        take: 10,
      },
    },
  });
  const [
    createProduct,
    { loading, data: createProductPayload, reset: resetCreateProductPayload },
  ] = useMutation(CREATE_PRODUCT_MUTATION);

  // const createProductsPayload = { createProduct: { success: true } };
  const [error, setError] = useState<IError[]>([]);

  const { session } = useAuth();

  const navigator = useNavigate();

  const formMethods = useForm<IFormInputs>({
    defaultValues: { variants: [{}] },
  });
  const {
    control,
    register,
    handleSubmit,
    formState,
    clearErrors,
    reset: resetForm,
  } = formMethods;
  const {
    fields: variantsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const parseEventCollections = (event: any) => {
    let { target } = event;
    const value = target.value.map((e: string) => ({ id: e }));
    target = { ...target, value };

    return { ...event, target };
  };
  console.log(formState.isSubmitSuccessful);

  // confirma se deja sair quando newProduct é nã nulo
  usePrompt(
    "Dados não salvos serão perdidos!\nSair mesmo assim?",
    !formState.isSubmitSuccessful
  );

  const onSubmit = async (productForm: IFormInputs) => {
    // e.preventDefault();

    // Converte campos para tipo correto
    const variants = productForm.variants.map((variant) => {
      const assets = variant.assets.map((e) => ({ id: e.id }));
      const price = Number(variant.price);
      const quantity = Number(variant.quantity);

      return { ...variant, assets, price, quantity };
    });

    // console.log(variants);

    const {
      data: {
        createProduct: { success, errors },
      },
    } = await createProduct({
      variables: { input: { ...productForm, variants } },
      context: { headers: { Authorization: `Bearer ${session?.token}` } },
    });

    if (success) {
      resetForm();
    } else {
      setError(errors);
      console.log(errors);
      throw new Error("Failed to create product");
    }

    console.log(productForm);
  };

  // const options = [
  //   { value: "id0", name: "Oliver Hansen" },
  //   { value: "id1", name: "Van Henry" },
  //   { value: "id2", name: "April Tucker" },
  //   { value: "id3", name: "Ralph Hubbard" },
  //   { value: "id4", name: "Omar Alexander" },
  //   { value: "id5", name: "Carlos Abbott" },
  //   { value: "id6", name: "Miriam Wagner" },
  //   { value: "id7", name: "Bradley Wilkerson" },
  //   { value: "id8", name: "Virginia Andrews" },
  //   { value: "id9", name: "Kelly Snyder" },
  // ];

  const options =
    collectionsData?.collections.items.map((item: any) => ({
      name: item.name,
      value: item.id,
    })) || [];

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 mb-12">
        <AlertModal
          options={{
            message: "Produto criado com sucesso",
            buttomMessage: "Confirmar",
            buttomAction: () => navigator("/dashboard/products"),
          }}
          open={createProductPayload?.createProduct.success || false}
          handleClose={resetCreateProductPayload}
        />
        <div className="flex justify-between items-end mb-2">
          <Title>Detalhes do produto</Title>

          {loading ? (
            <SpinnerLoading />
          ) : (
            <DefaultButton type="submit">Criar</DefaultButton>
          )}
        </div>
        {error?.length > 0 && (
          <span className="text-red-500 font-semibold">
            Falha ao criar producto. Verifique os campos e tente novamente
          </span>
        )}
        <hr className="mb-4" />
        <section className="grid grid-cols-[1fr_300px] lg:grid-cols-1 lg:grid-rows-2 gap-4">
          <div className="flex flex-col">
            <TextField
              id="product-name"
              label="Nome"
              {...(formState.errors.name
                ? { error: true, helperText: formState.errors.name.message }
                : { helperText: "Nome do produto" })}
              {...register("name", { required: "* Campo obrigatório" })}
              onClick={() => clearErrors("name")}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              id="product-descriptio"
              label="Descrição"
              {...(formState.errors.description
                ? {
                    error: true,
                    helperText: formState.errors.description.message,
                  }
                : { helperText: "Descrição do produto" })}
              {...register("description", { required: "* Campo obrigatorio" })}
              onClick={() => clearErrors("description")}
              style={{ marginBottom: "1rem" }}
            />
            <Controller
              control={control}
              name="collections"
              defaultValue={[]}
              render={({ field: { onChange, value } }) => {
                return (
                  <MultipleSelectChip
                    selectedOption={value?.map((e) => e.id)}
                    options={options}
                    handleChange={(event: any) =>
                      onChange(parseEventCollections(event))
                    }
                    label="Coleções"
                  />
                );
              }}
            />
          </div>

          <AssestsInput />
        </section>

        <Title>Variantes do produto</Title>
        <hr className="mb-4" />
        <button
          onClick={() => append({})}
          type="button"
          className="border border-cyan-700 px-4 py-1 text-xl text-cyan-700 rounded-[.3rem] hover:bg-teal-50"
        >
          + Nova Variante
        </button>
        <section className="mt-4">
          <ul>
            {variantsFields.map((e, id) => (
              <VariantInput
                // handleChange={handleChangeVariant}
                key={id}
                id={id}
                handleRemove={remove}
                // item={e}
              />
            ))}
          </ul>
        </section>
      </form>
    </FormProvider>
  );
};
