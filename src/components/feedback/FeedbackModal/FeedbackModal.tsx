'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { AlertColor } from '@mui/material/Alert';

export interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  statusCode?: number;
  variant?: AlertColor;
  actionLabel?: string;
  onAction?: () => void;
}

const getSeverityFromCode = (code?: number): AlertColor => {
  if (!code) return 'error';
  if (code >= 200 && code < 300) return 'success';
  if (code >= 400 && code < 500) return 'warning';
  if (code >= 500) return 'error';
  return 'info';
};

const getTitleFromCode = (code?: number) => {
  if (!code) return 'Verifique sua internet!';
  if (code >= 200 && code < 300) return 'Sucesso!';
  if (code >= 400 && code < 500) return 'Algo de errado não está certo!';
  if (code >= 500) return 'Algo deu errado :(';
  return undefined;
};

const getMessageFromCode = (code: number | undefined, defaultMessage: string) => {
  if (code === 404) return 'Essa suculenta não foi encontrada!';
  if (code && code >= 500) return 'Tivemos um problema interno!';
  return defaultMessage;
};

export const FeedbackModal = ({
  open,
  onClose,
  title,
  message,
  statusCode,
  variant,
  actionLabel = 'Fechar',
  onAction,
}: FeedbackModalProps) => {
  const theme = useTheme();
  const finalVariant = variant || getSeverityFromCode(statusCode);
  const finalTitle = title || getTitleFromCode(statusCode);
  const finalMessage = getMessageFromCode(statusCode, message);

  // Mapeia a severidade para a cor real do tema
  const getColor = () => {
    switch (finalVariant) {
      case 'success': return 'success.main';
      case 'error': return 'error.main';
      case 'warning': return 'warning.main';
      case 'info': return 'info.main';
      default: return 'primary.main';
    }
  };

  const color = getColor();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3, // Shape mais orgânico
            borderTop: `6px solid ${color}`,
          }
        }
      }}
    >
      {finalTitle && (
        <DialogTitle sx={{ color: color, fontWeight: 'bold' }}>
          {finalTitle}
        </DialogTitle>
      )}
      <DialogContent>
        <Typography variant="body1" color="text.primary">
          {finalMessage}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => {
            if (onAction) onAction();
            onClose();
          }}
          variant="contained"
          sx={{
            bgcolor: color,
            '&:hover': {
              bgcolor: color,
              filter: 'brightness(0.9)', // Escurece levemente no hover
            },
          }}
        >
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
