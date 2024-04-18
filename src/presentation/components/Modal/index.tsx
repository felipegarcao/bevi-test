import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "../Button";
import { Products } from "@/domain/usecases/remote/remote-products";
import { Props, Ref } from "./types";

export const Modal = forwardRef<Ref, Props>((props, ref) => {

  const [product, setProduct] = useState<Products.Model>({} as Products.Model);

  useImperativeHandle(ref, () => {
    return {
      openModal: (product: Products.Model) => setProduct(product)
    }
  }, [])

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Confirmar Exclusão</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Deseja realmente excluir o produto {product.name} ?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <Button onClick={() => props.onHandleDelete(product.id)} data-bs-dismiss="modal">Excluir</Button>
          </div>
        </div>
      </div>
    </div>
  )
}) 