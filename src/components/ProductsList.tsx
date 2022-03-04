import { useAuth } from "@/context/AuthContex/AuthProvider";
import { DELETE_PRODUCT_MUTATION } from "@/lib/graphql/mutation";
import { IProduct } from "@/types";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { ProductItem } from "./ProductItem";

interface IProps {
  items: IProduct[];
  refetch: () => Promise<ApolloQueryResult<any>>;
}

export const ProductsList: React.FC<IProps> = ({ items, refetch }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);
  const { session } = useAuth();
  const handleDelete = async (productId: string) => {
    const {
      data: {
        deleteProduct: { success },
      },
    } = await deleteProduct({
      variables: { input: { id: productId } },
      context: { headers: { Authorization: `Bearer ${session?.token}` } },
    });

    if (success) refetch();
  };

  return (
    <ul>
      {items.map((item, id) => (
        <ProductItem handleDelete={handleDelete} key={id} item={item} />
      ))}
    </ul>
  );
};
