import Chip from '@mui/material/Chip';
import { TYPE_COLORS, SucculentType as ISucculentType } from '@/lib/constants';

interface SucculentTypeProps {
  type: string;
}

// Função auxiliar para calcular o brilho da cor (YIQ)
const isLightColor = (hex?: string) => {
  if (!hex || !hex.startsWith('#')) return false;
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128; // Se >= 128, a cor é considerada clara
};

export const SucculentType = ({ type }: SucculentTypeProps) => {
  const bgColor = TYPE_COLORS[type as ISucculentType];
  const textColor = isLightColor(bgColor) ? 'grey.800' : 'white';

  return (
    <Chip
      label={type}
      size="small"
      sx={{
        bgcolor: bgColor ?? 'grey.500',
        color: textColor,
        fontWeight: 'bold',
      }}
    />
  );
};
