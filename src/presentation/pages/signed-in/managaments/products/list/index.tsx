import { Edit, PlusCircle, Search, Trash } from "lucide-react";
import { useListProductsControllerDI } from "./types";
import { useListProductsController } from "./useListProductsController";
import { Loading } from "@/presentation/components/Loading";
import { Badge } from "@/presentation/components/Badge";
import * as Input from '@/presentation/components/Input'
import { Button } from "@/presentation/components/Button";

export function ListProducts({ service }: useListProductsControllerDI) {
  const { searchProducts, loading, setSearch, handleToGoRegisterProduct, handleEditProduct } = useListProductsController({
    service,
  });

  return (
    <div className="container mx-auto flex flex-col pt-5 pb-5 gap-6">
      <h1 className="text-3xl  text-info font-weight-bold">
        Produtos Cadastrados
      </h1>

      <div className="mt-4">
        <div className="row align-items-center">
          <div className="col-lg-10 col-md-6">
            <Input.Root >
              <Input.Control type="text"
                placeholder="Buscar produtos..."
                onChange={(event) => setSearch(event.target.value)} />
              <Input.Prefix>
                <Search size={25} />
              </Input.Prefix>
            </Input.Root>
          </div>

          <Button
            type="button"
            className="col-lg-2 col-md-6"
            onClick={handleToGoRegisterProduct}
          >
            <PlusCircle size={18} />
            Novo
          </Button>
        </div>
      </div>

      <div className="shadow-light p-3 rounded mt-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">Estoque</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {searchProducts.map((item, index) => (
                  <tr className="align-middle font-size sm" key={index}>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}</td>
                    <td>
                      <Badge status={item.status} />
                    </td>
                    <td className="text-center">{item.stock_quantity}</td>
                    <td style={{ width: "10%" }}>
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-danger" data-toggle="modal">

                          <Trash size={16} />
                        </button>
                        <button className="btn btn-light" onClick={() => handleEditProduct(item)}>
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>


  );
}
