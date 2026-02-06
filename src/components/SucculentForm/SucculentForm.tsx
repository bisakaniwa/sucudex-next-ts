'use client';

import { useState, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { succulentFormSchema, SucculentSchemaType } from '@/lib/schemas';
import { createSucculent, updateSucculent } from '@/actions/succulent-actions';
import { SUCCULENT_TYPES, SucculentType } from '@/lib/constants';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useFeedback } from '../feedback/FeedbackContext';
import { Succulent } from '@prisma/client';

interface SucculentFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Succulent;
};

export const SucculentForm = ({ open, onClose, initialData }: SucculentFormProps) => {
  const { showSnackbar, showModal } = useFeedback();
  const [serverError, setServerError] = useState<string | null>(null);
  const isEditMode = !!initialData;

  // Hook do RHF + Validação Zod
  const {
    register,
    handleSubmit,
    reset,
    control, // <--- Necessário para usar o Controller
    formState: { errors, isSubmitting }
  } = useForm<SucculentSchemaType>({
    resolver: zodResolver(succulentFormSchema as any),
    defaultValues: {
      dexNumber: 0,
      name: '',
      // IMPORTANTE: undefined para obrigatórios, string vazia para opcionais
      primaryType: undefined,
      secondaryType: '',
      description: '',
      imageUrl: '',
      difficulty: ''
    }
  });

  // Reseta o form sempre que o modal fechar ou quando os dados iniciais mudarem
  useEffect(() => {
    if (!open) {
      reset({
        dexNumber: 0,
        name: '',
        primaryType: undefined,
        secondaryType: '',
        description: '',
        imageUrl: '',
        difficulty: ''
      });
      setServerError(null);
    }

    if (open && initialData) {
      // O reset do RHF serve para "popular" o formulário também
      reset({
        dexNumber: initialData.dexNumber,
        name: initialData.name,
        description: initialData.description || '',
        imageUrl: initialData.imageUrl || '',
        difficulty: initialData.difficulty || '',
        primaryType: initialData.primaryType as any, // Cast necessário se o Zod for estrito
        secondaryType: initialData.secondaryType || '' as any,
      });
    }
    if (open && !initialData) {
      // Se abriu em modo criação, limpa tudo
      reset({
        dexNumber: 0,
        name: '',
        primaryType: undefined,
        secondaryType: '',
        description: '',
        imageUrl: '',
        difficulty: ''
      });
    }
  }, [open, initialData, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<SucculentSchemaType> = async (data) => {
    setServerError(null);

    // Decide se cria ou atualiza
    let result;
    if (isEditMode && initialData) {
      result = await updateSucculent({ ...data, id: initialData.id });
    } else {
      result = await createSucculent(data);
    }

    if (result.success) {
      showSnackbar({
        message: `A suculenta ${result.data.name} foi registrada com sucesso!`,
        statusCode: result.statusCode,
      });
      handleClose();
      return;
    }

    if (result.statusCode === 409) {
      showModal({
        title: 'Ops!',
        message: result.error,
        statusCode: result.statusCode,
        variant: 'error',
      });
      return;
    }

    // Tratamento de Erro Genérico
    showSnackbar({
      message: result.error,
      statusCode: result.statusCode
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Registrar na Dex</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={2}>

              {serverError && <Alert severity="error">{serverError}</Alert>}

              <Stack direction="row" spacing={2}>
                <TextField
                  label="# Dex"
                  size="small"
                  type="number"
                  {...register('dexNumber')}
                  error={!!errors.dexNumber}
                  helperText={errors.dexNumber?.message}
                  sx={{ width: '100px' }}
                />
                <TextField
                  label="Nome"
                  size="small"
                  fullWidth
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                {/* Usamos Controller para garantir que o Select atualize visualmente ao editar */}
                <Controller
                  name="primaryType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={field.value || ''} // Garante que nunca seja undefined
                      select
                      label="Tipo Primário"
                      size="small"
                      fullWidth
                      error={!!errors.primaryType}
                      helperText={errors.primaryType?.message}
                    >
                      {SUCCULENT_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="secondaryType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={field.value || ''}
                      select
                      label="Tipo Secundário (Opcional)"
                      size="small"
                      fullWidth
                      error={!!errors.secondaryType}
                      helperText={errors.secondaryType?.message}
                    >
                      <MenuItem value=""><em>Nenhum</em></MenuItem>
                      {SUCCULENT_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Stack>

              <TextField
                label="Descrição"
                size="small"
                multiline
                rows={3}
                {...register('description')}
              />

              <TextField
                label="URL da Imagem"
                size="small"
                placeholder="https://..."
                {...register('imageUrl')}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
              />

            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Registrar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
