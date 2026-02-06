'use client';

import { useState } from 'react';
import { Succulent } from '@prisma/client'; // <--- O tesouro escondido!
import { Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SucculentForm } from '../SucculentForm/SucculentForm';
import { SucculentType } from '../SucculentType/SucculentType';
import { CardImage } from './CardImage';

// Definimos a interface das props usando o tipo do Prisma
interface SucculentCardProps {
  data: Succulent;
};

export const SucculentCard = ({ data }: SucculentCardProps) => {
  const [editOpen, setEditOpen] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita disparar o onClick do Paper
    setEditOpen(true);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
      }}
      onClick={() => console.log(`Clicou na suculenta: ${data.name}`)}
      title={`#${String(data.dexNumber).padStart(3, '0')} - ${data.name}`}
    >
      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
        #{String(data.dexNumber).padStart(3, '0')}
      </Typography>

      <CardImage src={data.imageUrl} alt={data.name} />

      <Grid container sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Grid>
          <Typography variant="h6">{data.name}</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <SucculentType type={data.primaryType} />
            {data.secondaryType && (
              <SucculentType type={data.secondaryType} />
            )}
          </Stack>
        </Grid>

        <Grid container justifyContent="flex-end">
          <Grid>
            <IconButton onClick={handleEditClick} title="Editar">
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton onClick={() => console.log(`Clicou para deletar a suculenta: ${data.name}`)} title="Deletar">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <SucculentForm open={editOpen} onClose={() => setEditOpen(false)} initialData={data} />
    </Paper>
  );
};
