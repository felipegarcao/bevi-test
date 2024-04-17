import { PlusCircle, Search } from "lucide-react";
import { useListProductsControllerDI } from "./types";
import { useListProductsController } from "./useListProductsController";

import * as Input from "@/presentation/components/Input";
import { Button } from "@/presentation/components/Button";
import "./styles.scss";

export function ListProducts({ service }: useListProductsControllerDI) {
  const {
    setSearch,
    handleToGoRegisterProduct,

    content,
  } = useListProductsController({
    service,
  });

  return (
    <div className="container mx-auto flex flex-col pt-md-5 pt-3 pb-md-5 gap-6">
      <h1 className="text-3xl  text-info font-weight-bold">
        Produtos Cadastrados
      </h1>

      <div className="mt-4 ">
        <div className="container-search align-items-center">
          <Input.Root>
            <Input.Control
              type="text"
              placeholder="Buscar produtos..."
              onChange={(event) => setSearch(event.target.value)}
            />
            <Input.Prefix>
              <Search size={25} />
            </Input.Prefix>
          </Input.Root>

          <Button type="button" onClick={handleToGoRegisterProduct}>
            <PlusCircle size={18} />
            Novo
          </Button>
        </div>
      </div>

      <div className="shadow-light p-3 rounded mt-5">{content}</div>
    </div>
  );
}
