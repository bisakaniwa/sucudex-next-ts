'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';

interface CardImageProps {
  src?: string | null;
  alt: string;
}

export const CardImage = ({ src, alt }: CardImageProps) => {
  // Fallback para imagem se não houver URL
  const imageSrc = src && src.length > 0 ? src : '/placeholder-succulent.png';

  return (
    <Box
      sx={{
        position: 'relative',
        width: 80,
        height: 80,
        borderRadius: 2, // Usa o shape do tema
        overflow: 'hidden',
        flexShrink: 0,
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="80px"
        style={{ objectFit: 'cover' }}
        unoptimized
      />
    </Box>
  );
};
