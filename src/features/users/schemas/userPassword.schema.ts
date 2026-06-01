import { z } from "zod";

const passwordRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  symbol: /[^A-Za-z0-9]/,
  spaces: /\s/,
};

export const userPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(1, "La nueva contraseña es obligatoria.")
      .min(12, "La contraseña debe tener al menos 12 caracteres.")
      .max(128, "La contraseña no debe superar 128 caracteres.")
      .refine((value) => passwordRegex.lowercase.test(value), {
        message: "La contraseña debe incluir una minúscula.",
      })
      .refine((value) => passwordRegex.uppercase.test(value), {
        message: "La contraseña debe incluir una mayúscula.",
      })
      .refine((value) => passwordRegex.number.test(value), {
        message: "La contraseña debe incluir un número.",
      })
      .refine((value) => passwordRegex.symbol.test(value), {
        message: "La contraseña debe incluir un símbolo.",
      })
      .refine((value) => !passwordRegex.spaces.test(value), {
        message: "La contraseña no debe contener espacios.",
      }),
    confirm_password: z.string().min(1, "Confirma la nueva contraseña."),
  })
  .refine((values) => values.new_password === values.confirm_password, {
    path: ["confirm_password"],
    message: "Las contraseñas no coinciden.",
  });

export type UserPasswordFormValues = z.infer<typeof userPasswordSchema>;