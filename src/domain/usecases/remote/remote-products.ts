import { DomainProduct } from "@/domain/models/product";

export interface Products {
  list(): Promise<Products.Model[]>;
  create(params: Products.Model): Promise<void>;
  updated(params: Products.Model): Promise<void>;
}

export namespace Products {
  export type Model = DomainProduct;
}
