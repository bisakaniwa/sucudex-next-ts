import { z } from 'zod';
import { SUCCULENT_TYPES } from '@/lib/constants';

// O Zod precisa de um array "mutável" para criar o enum,
// mas nossas constantes são "readonly". Fazemos um cast rápido aqui.
const values = SUCCULENT_TYPES as unknown as [string, ...string[]];

const baseSchema = z.object({
  dexNumber: z.coerce.number()
    .min(1, 'Mínimo #001')
    .max(151, 'Máximo #151'),

  name: z.string()
    .min(3, 'Nome muito curto')
    .nonempty('Nome é obrigatório'),

  description: z.string().optional(),

  // Aqui usamos o enum que fizemos casting 
  primaryType: z.enum(values),

  secondaryType: z.enum(SUCCULENT_TYPES)
    .optional()
    .or(z.literal('')), // Aceita string vazia para limpar o campo

  difficulty: z.string().optional(),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

// Refinamento (Tipo 1 != Tipo 2)
export const succulentFormSchema = baseSchema.refine(
  (data) => data.primaryType !== data.secondaryType,
  {
    message: "O tipo secundário não pode ser igual ao primário",
    path: ["secondaryType"],
  }
);

export type SucculentSchemaType = z.infer<typeof succulentFormSchema>;

export const succulentUpdateSchema = baseSchema.extend({
  id: z.string(), // UIDs do Prisma são sempre strings
}).refine((data) => data.primaryType !== data.secondaryType, {
  message: "O tipo secundário não pode ser igual ao primário",
  path: ["secondaryType"],
});

export type SucculentUpdateSchemaType = z.infer<typeof succulentUpdateSchema>;
