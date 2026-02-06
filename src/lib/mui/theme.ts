'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

import { breakpoints } from './breakpoints';
import { typographyOptions } from './typography';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Configuração de Formas (Organic Shapes)
const shapeOptions = {
  borderRadius: 8, // Define o 'medium' (8px) como o padrão base do sistema
};

const theme = createTheme({
  cssVariables: true,
  breakpoints: breakpoints,
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#BEA493',
        },
      },
    },
    light: {
      palette: {
        primary: {
          main: '#00100f',
        },
      },
    },
  },
  typography: {
    ...typographyOptions, // Herda as configurações de peso/tamanho
    fontFamily: roboto.style.fontFamily,
  },
  shape: shapeOptions,
});

export default theme;
