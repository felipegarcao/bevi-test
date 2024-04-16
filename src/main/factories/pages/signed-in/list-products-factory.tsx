import { RemoteProducts } from "@/data/usecases/remote/remote-products";
import { ListProducts } from "@/presentation/pages/signed-in/managaments/products/list";
import { AxiosRequestWithToken } from "@/main/factories/infra/make-axios-http";

export function MakeListProductScreen() {
  const remoteProducts = new RemoteProducts(AxiosRequestWithToken());

  return <ListProducts service={remoteProducts} />;
}
