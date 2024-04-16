import { Edit, PlusCircle, Search, Trash } from "lucide-react";
import { useListProductsControllerDI } from "./types";
import { useListProductsController } from "./useListProductsController";
import { Loading } from "../../../../../components/Loading";

export function ListProducts({ service }: useListProductsControllerDI) {
  const { searchProducts, loading, setSearch } = useListProductsController({
    service,
  });

  return (
    <div className="container mx-auto flex flex-col pt-5 pb-5 gap-6">
      <h1 className="text-3xl  text-[#24ccDB] font-weight-bold">
        Produtos Cadastrados
      </h1>

      <div className="mt-5">
        <div className="row align-items-center">
          <div className="col-lg-10">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar produtos..."
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  <Search />
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="col-lg-2 btn btn-info d-flex align-items-center justify-content-center text-white font-weight-bold gap-3"
          >
            <PlusCircle size={18} />
            Novo
          </button>
        </div>
      </div>

      <div className="shadow p-3 rounded mt-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Status</th>
                  <th scope="col">Estoque</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {searchProducts.map((item, index) => (
                  <tr className="align-middle" key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    <td>{item.stock_quantity}</td>
                    <td style={{ width: "10%" }}>
                      <button className="btn btn-danger">
                        <Trash />
                      </button>
                      <button className="btn btn-warning">
                        <Edit className="text-white" />
                      </button>
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
