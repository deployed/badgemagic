import {StyleSheet} from 'react-native';

import {type FieldValues, useController, type UseControllerProps} from 'react-hook-form';
import {TextInput} from 'react-native-paper';

import {Colors} from '@/utils/colors';

export type TextAreaProps<T extends FieldValues> = {placeholder: string} & UseControllerProps<T>;

export const AppInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
}: TextAreaProps<T>): JSX.Element => {
  const {
    field: {onChange, value},
  } = useController({name, control});

  return (
    <TextInput
      placeholder={placeholder}
      mode="outlined"
      outlineColor="transparent"
      style={styles.input}
      value={value}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: Colors.white,
    padding: 8,
  },
});
