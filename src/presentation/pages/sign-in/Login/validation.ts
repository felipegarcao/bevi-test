import { z } from "zod";

export const LoginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Informe pelo menos 8 caracteres."),
});
