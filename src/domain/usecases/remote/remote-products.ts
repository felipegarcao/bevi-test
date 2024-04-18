import { DomainProduct, STATUS } from "@/domain/models/product";

export interface Products {
  list(): Promise<Products.ModelListWithData>;
  create(params: Products.Model): Promise<Products.Model>;
  updated(params: Products.Model): Promise<Products.Model>;
  delete(params: Products.ParamsId): Promise<Products.Model>;
}

export namespace Products {
  export type Model = DomainProduct;

  export type ParamsId = {
    id: number;
  };

  export type ModelListWithData = {
    data: {
      id?: number;
      name: string;
      price: number;
      status: STATUS;
      stock_quantity: number;
      description: string;
    }[];
  };
}
