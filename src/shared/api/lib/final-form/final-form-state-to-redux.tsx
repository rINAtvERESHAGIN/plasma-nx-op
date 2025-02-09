import React, { useCallback } from 'react';
import { FormSpy } from 'react-final-form';
import { useAppDispatch } from '@app/store';
import { updateFormState } from './final-form-spy';

interface IProps {
  form: string
}

function FinalFormStateToRedux ({ form }: IProps): React.ReactNode {
  const dispatch = useAppDispatch();

  const handleOnChangeForm = useCallback<(state: any) => void>((state) => {
    dispatch(updateFormState({ formName: form, formState: state }));
  }, []);

  return <FormSpy onChange={handleOnChangeForm} />;
}

export default FinalFormStateToRedux;
