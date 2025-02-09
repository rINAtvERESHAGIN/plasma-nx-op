import React, { useCallback, useEffect } from 'react';
import { useAppSelector } from '@app/store';

const SubmitButton = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const traceForm = useAppSelector((state) => state.finalFormRedux.trace);

  const formEventHandler = useCallback(() => {
    const submitButton = document.getElementById('submit-button-trace-form');
    if (submitButton != null && traceForm?.submitFailed && traceForm.submitFailed) {
      const cssFailedSubmit = `
                background-color: '#d32f2f';
                animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
                transform: translate3d(0, 0, 0);
                perspective: 1000px;
                animation-iteration-count: infinite;
                `;
      submitButton.style.cssText += cssFailedSubmit;
      submitButton.style.backgroundColor = '#d32f2f';
    }

    setTimeout(() => {
      if (submitButton != null) {
        const cssSuccessSubmit = `
                    background-color: '#1976d2'';
                    animation-iteration-count: 0;
                `;
        submitButton.style.cssText = cssSuccessSubmit;
      }
    }, 820);
  }, [traceForm]);

  useEffect(() => {
    const form = document.getElementById('trace-form');

    if (form != null) {
      form.addEventListener('submit', formEventHandler);
    }

    return () => {
      window.removeEventListener('submit', formEventHandler);
    };
  }, [traceForm]);

  return <>{children}</>;
};

export default SubmitButton;
