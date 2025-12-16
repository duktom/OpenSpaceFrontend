import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { Props } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { TextError } from './text-error';

type TextFormInputProps<T extends FieldValues> = Omit<Props, 'theme' | 'label'> & {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export const TextFormInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: TextFormInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...restForm }, fieldState: { error, invalid } }) => (
        <>
          <TextInput
            error={invalid}
            label={label}
            mode="outlined"
            onChangeText={onChange}
            {...restForm}
            {...props}
          />
          {error?.message ? <TextError>{error.message}</TextError> : null}
        </>
      )}
    />
  );
};
