export const SUCCULENT_TYPES = [
  'Carunculada',
  'Pendente',
  'Bilhante',
  'Pruinada',
  'Opaca',
  'Bordada',
  'Sempre Verde',
  'Ciliada',
  'Aveludada',
  'Colonymaker',
  'Trevosa',
  'Lilás',
  'Azul',
  'Rosada',
] as const; // "as const" trava o array como somente leitura para o TS

// Cria um tipo TypeScript baseado na lista acima
export type SucculentType = typeof SUCCULENT_TYPES[number];

// Mapeamento de cores
export const TYPE_COLORS: Record<SucculentType, string> = {
  'Carunculada': '#E53935', // Vermelho (Red 600)
  'Pendente': '#00897B',    // Verde Água (Teal 600)
  'Bilhante': '#F9A825',    // Dourado Escuro (Yellow 800) - Para contraste com branco
  'Pruinada': '#FAFAFA',    // 
  'Opaca': '#E5C0CC',       // Rosa Claro (Pink 100)
  'Bordada': '#8E24AA',     // Roxo (Purple 600)
  'Sempre Verde': '#43A047',// Verde Planta (Green 600)
  'Ciliada': '#546E7A',     // Cinza Azulado (Blue Grey 600)
  'Aveludada': '#D81B60',   // Rosa (Pink 600)
  'Colonymaker': '#6D4C41', // Marrom (Brown 600)
  'Trevosa': '#212121',     // Escuro Brilhante (Grey 900)
  'Lilás': '#CE93D8',       // Lilás Pruinado (Purple 200)
  'Azul': '#90CAF9',        // Azul Pruinado (Blue 200)
  'Rosada': '#F48FB1',      // Rosa Pruinado (Pink 200)
};
