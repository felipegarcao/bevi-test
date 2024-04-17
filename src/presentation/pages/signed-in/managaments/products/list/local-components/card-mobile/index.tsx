import { formattedBRL } from "@/helpers/formattedBRL";
import { Badge } from "@/presentation/components/Badge";
import { Props } from "./types";
import { Edit, Trash } from "lucide-react";

export function CardMobile({
  product,
  handleEditProduct,
  onHandleDelete
}: Props) {
  return (
    <div className="shadow-light p-3 my-2 rounded">
      <div className="d-flex flex-column my-2">
        <strong className="font-size xs">Nome</strong>
        <span className="font-size sm">{product.name}</span>
      </div>

      <div className="d-flex flex-column my-4">
        <strong className="font-size xs">Preço</strong>
        <span className="font-size sm"> {formattedBRL(product.price)}</span>
      </div>

      <div className="d-flex flex-column my-4">
        <strong className="font-size xs">Estoque</strong>
        <span className="font-size sm"> {product.stock_quantity}</span>
      </div>

      <Badge status={product.status} />

      <div className="gap-2 mt-3 row px-0 mx-0">
        <button
          className="btn btn-danger col"
          onClick={() => onHandleDelete(product.id)}
        >
          <Trash size={16} />
        </button>

        <button
          className="btn btn-light col"
          onClick={() => handleEditProduct(product)}
        >
          <Edit size={16} />
        </button>
      </div>
    </div>
  )
}