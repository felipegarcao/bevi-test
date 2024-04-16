import { z } from "zod";
import { STATUS } from "@/domain/models/product";


export const CreateProductBodySchema = z.object({
  name: z.string().min(2, "Informe um nome do produto válido."),
  price: z.number().min(0.000001, { message: "Informe um valor válido." }),
  status: z.nativeEnum(STATUS),
  stock_quantity: z.number().min(1, 'Informe a quantidade em estoque'),
  description: z.string().optional()
});
