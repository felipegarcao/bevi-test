import { DomainProduct } from "../../models/product";

export interface Products {
  list(): Promise<Products.Model[]>;
}

export namespace Products {
  export type Model = DomainProduct;
}
