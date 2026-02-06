'use server';

import { prisma } from '@/lib/prisma';
import { succulentFormSchema, succulentUpdateSchema, SucculentSchemaType, SucculentUpdateSchemaType } from '@/lib/schemas';
import { Succulent } from '@prisma/client'; // O tipo gerado automaticamente pelo Prisma
import { revalidatePath } from 'next/cache';

// T pode ser qualquer coisa: uma Succulent, uma lista de Succulents, ou null.
type ActionResponse<T> =
  | { success: true; data: T, statusCode: number }
  | { success: false; error: string, statusCode: number };

// Server Action
export const createSucculent = async (
  input: SucculentSchemaType
): Promise<ActionResponse<Succulent>> => {
  try {
    if (input.dexNumber < 1 || input.dexNumber > 151) {
      return { success: false, error: 'O número deve estar entre 1 e 151!', statusCode: 400 };
    }

    const validatedData = succulentFormSchema.parse(input);

    const newSucculent = await prisma.succulent.create({
      data: { ...validatedData },
    });

    // O Segredo do Next.js: Avisa a rota que os dados mudaram para atualizar o cache
    revalidatePath('/');

    return { success: true, data: newSucculent, statusCode: 201 };
  } catch (error: any) {
    console.error('Erro ao criar suculenta:', error);

    if (error.code === 'P2002') {
      return { success: false, error: `A Suculenta #${input.dexNumber} já existe na Sucudex!`, statusCode: 409 };
    }

    // Tratamento de erros do Zod
    if (error.errors) {
      return { success: false, error: error.errors[0].message, statusCode: 400 };
    }

    return { success: false, error: 'Falha ao salvar no banco de dados.', statusCode: 500 };
  }
};

export const getSucculents = async () => {
  try {
    const succulents = await prisma.succulent.findMany({
      orderBy: {
        dexNumber: 'asc',
      },
    });
    return { success: true, data: succulents, statusCode: 200 };
  } catch (error) {
    console.error('Erro ao buscar suculentas:', error);
    return { success: false, error: 'Falha ao carregar a lista.', statusCode: 500 };
  }
};

export const updateSucculent = async (
  input: SucculentUpdateSchemaType,
): Promise<ActionResponse<Succulent>> => {
  try {
    if (input.dexNumber < 1 || input.dexNumber > 151) {
      return { success: false, error: 'O número deve estar entre 1 e 151!', statusCode: 400 };
    }

    // O Zod garante que temos o ID e os dados válidos
    const { id, ...dataToUpdate } = succulentUpdateSchema.parse(input);

    const updatedSucculent = await prisma.succulent.update({
      where: { id },
      data: { ...dataToUpdate },
    });

    revalidatePath('/');

    return { success: true, data: updatedSucculent, statusCode: 200 };
  } catch (error: any) {
    console.error('Erro ao atualizar suculenta:', error);

    if (error.code === 'P2002') {
      return { success: false, error: `A Suculenta #${input.dexNumber} já existe na Sucudex!`, statusCode: 409 };
    }

    // Tratamento de erros do Zod
    if (error.errors) {
      return { success: false, error: error.errors[0].message, statusCode: 400 };
    }

    if (error.code === 'P2025') {
      return { success: false, error: 'Suculenta não encontrada.', statusCode: 404 };
    }

    return { success: false, error: 'Falha ao salvar no banco de dados.', statusCode: 500 };
  }
}
