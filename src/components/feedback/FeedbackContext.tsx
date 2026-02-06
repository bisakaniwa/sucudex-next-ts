'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { FeedbackModal, FeedbackModalProps } from '@/components/feedback/FeedbackModal/FeedbackModal';
import { FeedbackSnackbar, FeedbackSnackbarProps } from '@/components/feedback/FeedbackSnackbar/FeedbackSnackbar';

interface ShowFeedbackOptions {
  message: string;
  title?: string;
  statusCode?: number;
  variant?: 'success' | 'error' | 'warning' | 'info';
  actionLabel?: string;
  onAction?: () => void;
}

interface FeedbackContextType {
  showModal: (options: ShowFeedbackOptions) => void;
  showSnackbar: (options: ShowFeedbackOptions) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado do Modal
  const [modalConfig, setModalConfig] = useState<Partial<FeedbackModalProps>>({ open: false });

  // Estado do Snackbar
  const [snackbarConfig, setSnackbarConfig] = useState<Partial<FeedbackSnackbarProps>>({ open: false });

  // Funções de disparo (estáveis com useCallback)
  const showModal = useCallback((options: ShowFeedbackOptions) => {
    setModalConfig({
      open: true,
      title: options.title || 'Atenção',
      message: options.message,
      statusCode: options.statusCode,
      variant: options.variant,
      actionLabel: options.actionLabel,
      onAction: options.onAction,
    });
  }, []);

  const showSnackbar = useCallback((options: ShowFeedbackOptions) => {
    setSnackbarConfig({
      open: true,
      message: options.message,
      title: options.title,
      statusCode: options.statusCode,
      variant: options.variant,
    });
  }, []);

  // Funções de fechamento
  const handleCloseModal = () => setModalConfig((prev) => ({ ...prev, open: false }));
  const handleCloseSnackbar = () => setSnackbarConfig((prev) => ({ ...prev, open: false }));

  return (
    <FeedbackContext.Provider value={{ showModal, showSnackbar }}>
      {children}

      {/* Renderização Global dos Componentes */}
      <FeedbackModal
        {...modalConfig as any} // Cast necessário pois o estado inicial é parcial
        open={!!modalConfig.open}
        onClose={handleCloseModal}
        // Garante valores default para evitar undefined
        title={modalConfig.title || ''}
        message={modalConfig.message || ''}
      />

      <FeedbackSnackbar
        {...snackbarConfig as any}
        open={!!snackbarConfig.open}
        onClose={handleCloseSnackbar}
        message={snackbarConfig.message || ''}
      />
    </FeedbackContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback deve ser usado dentro de um FeedbackProvider');
  }
  return context;
};
