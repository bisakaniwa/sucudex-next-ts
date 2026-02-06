'use client';

import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export interface FeedbackSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  title?: string;
  /**
   * Código HTTP (ex: 200, 404, 500) ou severidade direta ('success', 'error', etc).
   * Se ambos forem omitidos, assume 'info'.
   */
  statusCode?: number;
  variant?: AlertColor;
}

const getSeverityFromCode = (code?: number): AlertColor => {
  if (!code) return 'error';
  if (code >= 200 && code < 300) return 'success';
  if (code >= 400 && code < 500) return 'warning'; // 4xx geralmente é erro de cliente/validação
  if (code >= 500) return 'error';
  return 'info';
};

export const FeedbackSnackbar = ({
  open,
  onClose,
  message,
  title,
  statusCode,
  variant,
}: FeedbackSnackbarProps) => {
  // Prioriza a prop 'variant' se passada, senão calcula pelo statusCode
  const finalVariant = variant || getSeverityFromCode(statusCode);
  const finalTitle = title || (!statusCode ? 'Verifique sua internet!' : undefined);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={finalVariant}
        variant="filled"
        sx={{ width: '100%', boxShadow: 3 }}
      >
        {finalTitle && <AlertTitle>{finalTitle}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};
