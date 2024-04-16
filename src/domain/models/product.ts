export type DomainProduct = {
  id?: number;
  name: string;
  price: number;
  status: STATUS;
  stock_quantity: number
  description: string;
}

export enum STATUS  {
  Estoque = 1,
  Reposicao = 2,
  Falta = 3
}