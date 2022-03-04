import DefaultButton from "@/components/DefatultButton";
import { SpinnerLoading } from "@/components/icons";
import { ProductsList } from "@/components/ProductsList";
import { PRODUCTS_QUERY } from "@/lib/graphql/query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export const ProductsPage: React.FC = () => {
  const { data, loading, refetch } = useQuery(PRODUCTS_QUERY, {
    variables: { input: { take: 100 } },
  });
  return (
    <div className="w-full p-4 bg-zinc-100">
      <div className="mb-4 w-full flex items-center">
        <input
          type="text"
          placeholder="Pesquisar por produto"
          className="h-12 px-4 rounded-sm mx-4 flex-1"
        />
        <Link to={"/dashboard/products/create"}>
          <DefaultButton type="button">Novo Produto</DefaultButton>
        </Link>
      </div>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <ProductsList refetch={refetch} items={data?.products.items} />
      )}
    </div>
  );
};
