import { DomainProduct } from "@/domain/models/product";
import { formattedBRL } from "@/presentation/helpers/formattedBRL";
import { Button } from "@/presentation/components/Button";
import { Edit, Trash } from "lucide-react";
import { Badge } from "@/presentation/components/Badge";
import { Products } from "@/domain/usecases/remote/remote-products";
import { useRef } from "react";
import { Ref } from "../Modal/types";
import { useNavigate } from "react-router-dom";

type Props = {
  searchProducts: DomainProduct[];
  product?: DomainProduct;
};

export function Table({ searchProducts }: Props) {
  const navigate = useNavigate();

  const ref = useRef<Ref>(null);

  function openModalHandleDeleteProduct(product: Products.Model) {
    ref.current?.openModal(product);
  }

  function handleEditProduct(product: Products.Model) {
    navigate("/cadastro", {
      state: {
        product,
      },
    });
  }

  return (

      <div className="shadow-light p-3 rounded mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produto</th>
                <th scope="col">Descrição</th>
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
                  <td style={{ width: "15%" }}>
                    <div className="d-flex flex-column">
                      <strong data-testid={`name`}>{item.name}</strong>
                      <span data-testid={`price`}>
                        {formattedBRL(item.price)}
                      </span>
                    </div>
                  </td>

                  <td data-testid="description" className="w-75  text-justify">
                    {item.description}
                  </td>

                  <td data-testid={`status`}>
                    <Badge status={item.status} />
                  </td>
                  <td className="text-center" data-testid={`stock_quantity`}>
                    {item.stock_quantity}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="danger"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
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
}
