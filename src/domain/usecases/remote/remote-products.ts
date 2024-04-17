import { DomainProduct } from "@/domain/models/product";

export interface Products {
  list(): Promise<Products.Model[]>;
  create(params: Products.Model): Promise<Products.Model>;
  updated(params: Products.Model): Promise<Products.Model>;
  delete(params: Products.ParamsId): Promise<Products.Model[]>
}

export namespace Products {
  export type Model = DomainProduct;

  export type ParamsId = {
    id: number;
  }
}
