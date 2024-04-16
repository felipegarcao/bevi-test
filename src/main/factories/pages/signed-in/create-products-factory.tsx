import { RemoteProducts } from "../../../../data/usecases/remote/remote-products";
import { RegisterProducts } from "../../../../presentation/pages/signed-in/managaments/products/register";
import { AxiosRequestWithToken } from "../../infra/make-axios-http";


export function MakeCreateProductScreen() {
  const remoteProducts = new RemoteProducts(AxiosRequestWithToken());

  return <RegisterProducts service={remoteProducts} />;



}