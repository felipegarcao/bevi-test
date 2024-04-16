export type DomainProduct = {
  id: number;
  name: string;
  price: number;
  status: 'in-stock' | 'in-replacement' | 'lacking';
  stock_quantity: number
}