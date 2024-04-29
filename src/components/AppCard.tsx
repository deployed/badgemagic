import {type ImageSourcePropType, Text, Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

import {type FieldValues, type UseControllerProps, useController} from 'react-hook-form';

import {Colors} from '../utils/colors';

type AppCardProps<T extends FieldValues> = {
  imagePath: ImageSourcePropType;
  placeholder: string;
} & UseControllerProps<T>;

export const AppCard = <T extends FieldValues>({
  control,
  name,
  placeholder,
  imagePath,
}: AppCardProps<T>): JSX.Element => {
  const {
    field: {value, onChange},
  } = useController({name, control});

  const handleOnPress = (): void => {
    onChange(!value);
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[{backgroundColor: value ? Colors.red : Colors.white}, styles.card]}>
      <Image source={imagePath} style={styles.image} />
      <Text>{placeholder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
  },
});
