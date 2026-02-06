'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import { SucculentForm } from './SucculentForm';

export const SucculentCreateButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ my: 4 }}>
        Nova Suculenta +
      </Button>

      <SucculentForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};
