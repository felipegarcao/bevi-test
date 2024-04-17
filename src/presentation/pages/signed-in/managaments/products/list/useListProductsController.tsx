import { useEffect, useMemo, useState } from "react";
import { useListProductsControllerDI } from "./types";
import { Products } from "@/domain/usecases/remote/remote-products";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";
import { toast } from "react-toastify";
import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import { useNavigate } from "react-router-dom";
import { UnprocessableError } from "@/domain/errors/UnprocessableError";
import { Loading } from "@/presentation/components/Loading";
import { Edit, Trash } from "lucide-react";
import { Badge } from "@/presentation/components/Badge";

export function useListProductsController({
  service,
}: useListProductsControllerDI) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Products.Model[]>([]);
  const [search, setSearch] = useState("");
  const { logout } = userReducerAdapter();
  const navigate = useNavigate();

  function handleToGoRegisterProduct() {
    navigate("/cadastro");
  }

  function handleEditProduct(product: Products.Model) {
    navigate("/cadastro", {
      state: {
        product,
      },
    });
  }

  const searchProducts = useMemo(() => {
    if (Array.isArray(products)) {
      const productsFiltered = products?.filter((value) => {
        if (
          value.name
            ?.toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          value.price
            ?.toString()
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return value;
        }
      });

      return productsFiltered;
    } else {
      return products;
    }
  }, [search, products]);

  async function getProducts() {
    setLoading(true);

    try {
      const products = await service.list();

      setProducts(products);
    } catch (error: any) {
      setError(error.message);
      if (error instanceof UnauthorizedError) {
        toast(error.message, {
          type: "error",
        });
        logout();
      } else if (error instanceof UnprocessableError) {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function onHandleDelete(id: number) {
    setLoading(true);
    try {
      await service.delete({
        id,
      });

      toast.info("Produto deletado com sucesso.");

      getProducts();

      navigate("/");
    } catch (error: any) {
      if (error instanceof UnprocessableError) {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          <span className="font-size sm">{error}</span>
        </div>
      );
    }

    if (products.length !== 0 && !error) {
      return (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Preço</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
                  Estoque
                </th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {searchProducts.map((item, index) => (
                <tr className="align-middle font-size sm" key={index}>
                  <td className="w-25">{item.name}</td>
                  <td>
                    {item.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                    <Badge status={item.status} />
                  </td>
                  <td className="text-center">{item.stock_quantity}</td>
                  <td style={{ width: "10%" }}>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => onHandleDelete(item.id)}
                      >
                        <Trash size={16} />
                      </button>

                      <button
                        className="btn btn-light"
                        onClick={() => handleEditProduct(item)}
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }, [products, search, loading, error]);

  useEffect(() => {
    getProducts();
  }, []);

  return {
    searchProducts,
    loading,
    setSearch,
    handleToGoRegisterProduct,
    handleEditProduct,
    onHandleDelete,
    content,
  };
}
