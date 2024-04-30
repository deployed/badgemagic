import {type ImageSourcePropType, Text} from 'react-native';
import {StyleSheet} from 'react-native';

import {type FieldValues, type UseControllerProps, useController} from 'react-hook-form';
import {useTheme, Card} from 'react-native-paper';

type ControlledCardProps<T extends FieldValues> = {
  imagePath: ImageSourcePropType;
  placeholder: string;
} & UseControllerProps<T>;

export const ControlledCard = <T extends FieldValues>({
  control,
  name,
  placeholder,
  imagePath,
}: ControlledCardProps<T>): JSX.Element => {
  const {colors} = useTheme();

  const {
    field: {value, onChange},
  } = useController({name, control});

  const handleOnPress = (): void => {
    onChange(!value);
  };

  return (
    <Card
      onPress={handleOnPress}
      style={[{backgroundColor: value ? colors.primary : colors.onPrimary}, styles.card]}>
      <Card.Cover source={imagePath} style={styles.image} />
      <Card.Content>
        <Text>{placeholder}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 2,
    margin: 5,
    width: 60,
    height: 60,
  },
});
