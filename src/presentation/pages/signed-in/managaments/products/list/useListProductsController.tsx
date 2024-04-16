import { useEffect, useMemo, useState } from "react";
import { useListProductsControllerDI } from "./types";
import { Products } from "../../../../../../domain/usecases/remote/remote-products";
import { UnauthorizedError } from "../../../../../../domain/errors/unathorizedError";
import { toast } from "react-toastify";
import { userReducerAdapter } from "../../../../../../main/adapters/user-reducer-adapter";

export function useListProductsController({
  service,
}: useListProductsControllerDI) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Products.Model[]>([]);
  const [search, setSearch] = useState("");

  const { logout } = userReducerAdapter();

  const searchProducts = useMemo(() => {
    const productsFiltered = products.filter((value) => {
      if (
        value.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        value.price
          ?.toString()
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return value;
      }
    });

    return productsFiltered;
  }, [search, products]);

  async function getProducts() {
    setLoading(true);

    try {
      const products = await service.list();

      setProducts(products);
    } catch (error: any) {
      toast.error(error.message);

      if (error instanceof UnauthorizedError) {
        toast(error.message, {
          type: "error",
        });
        logout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return {
    searchProducts,
    loading,
    setSearch,
  };
}
