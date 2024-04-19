import { useEffect, useMemo, useRef, useState } from "react";
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
import { useResponsive } from "@/presentation/hooks/useResponsive";
import { CardMobile } from "./local-components/card-mobile";
import { formattedBRL } from "@/presentation/helpers/formattedBRL";
import { Ref } from "@/presentation/components/Modal/types";
import { Button } from "@/presentation/components/Button";

export function useListProductsController({
  service,
}: useListProductsControllerDI) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Products.Model[]>([]);
  const [search, setSearch] = useState("");
  const { logout } = userReducerAdapter();
  const navigate = useNavigate();
  const screenType = useResponsive()
  const ref = useRef<Ref>(null)

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

  function openModalHandleDeleteProduct(product: Products.Model) {
    ref.current?.openModal(product)
  }

  const searchProducts = useMemo(() => {
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
  }, [search, products]);

  async function getProducts() {
    setLoading(true);

    try {
      const {data} = await service.list();

      setProducts(data);
    } catch (error) {
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
    } catch (error) {
      if (error instanceof UnprocessableError) {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="shadow-light p-3 rounded mt-5">
          <Loading />
        </div>);
    }

    if (error) {
      return (
        <div className="shadow-light p-3 rounded mt-5">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <span className="font-size sm">{error}</span>
          </div>
        </div>
      );
    }

    if (products.length !== 0 && !error) {
      if (screenType === 'Desktop') {
        return (
          <div className="shadow-light p-3 rounded mt-5">
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
                      <td className="w-25" data-testid={`name`}>{item.name}</td>
                      <td data-testid={`price`}>
                        {formattedBRL(item.price)}
                      </td>
                      <td data-testid={`status`}>
                        <Badge status={item.status} />
                      </td>
                      <td className="text-center" data-testid={`stock_quantity`}>{item.stock_quantity}</td>
                      <td style={{ width: "10%" }}>
                        <div className="d-flex align-items-center gap-2">
                          <Button
                          variant="danger"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            onClick={() => openModalHandleDeleteProduct(item)}

                          >
                            <Trash size={16} />
                          </Button>

                          <Button
                            variant="light"
                            onClick={() => handleEditProduct(item)}
                          >
                            <Edit size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            {
              searchProducts.map((product, index) => (
                <CardMobile
                  key={index}
                  product={product}
                  handleEditProduct={() => handleEditProduct(product)}
                  openModalHandleDeleteProduct={() => openModalHandleDeleteProduct(product)}
                />
              ))
            }
          </div>
        )
      }
    }


  }, [products, search, loading, error, screenType, searchProducts]);

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
    ref
  };
}
