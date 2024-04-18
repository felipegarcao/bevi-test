import { Products } from "@/domain/usecases/remote/remote-products";

export type Props = {
  onHandleDelete: (id: number) => void;
}

export type Ref = {
  openModal: (product: Products.Model) => void;
}