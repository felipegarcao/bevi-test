import { DomainProduct } from "@/domain/models/product";

export interface Props {
  product: DomainProduct;
  handleEditProduct: (product: DomainProduct) => void;
}