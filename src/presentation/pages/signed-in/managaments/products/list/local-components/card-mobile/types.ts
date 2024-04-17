import { DomainProduct } from "@/domain/models/product";

export interface Props {
  product: DomainProduct;
  onHandleDelete: (id: number) => Promise<void>;
  handleEditProduct: (product: DomainProduct) => void;
}