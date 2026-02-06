// Overrides de Componentes para aplicar o "Espaçamento Aéreo" e "Shapes"
export const componentsOptions = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8, // Medium shape
        padding: '8px 24px', // Mais espaçamento horizontal (Respiro)
        boxShadow: 'none', // Estética mais flat/orgânica
        '&:hover': {
          boxShadow: 'none',
        },
      },
      sizeLarge: {
        borderRadius: 12, // Large shape para botões grandes
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12, // Large shape (12px) para Cards
        backgroundImage: 'none', // Remove overlay padrão do dark mode para manter a cor da paleta exata
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: 12, // Consistência em superfícies flutuantes
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8, // Medium shape para Inputs
        },
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingTop: 24,
        paddingBottom: 24,
      },
    },
  },
};
