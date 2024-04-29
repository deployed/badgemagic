import {StyleSheet, View} from 'react-native';

import {useFormContext} from 'react-hook-form';

import {AppInput} from '@/components/AppInput';
import {effects} from '@/utils/effects';

import {type FormData} from '../models/BadgeForm.model';
import {AppCard} from './AppCard';

export const BadgeForm = (): JSX.Element => {
  const {control} = useFormContext<FormData>();

  return (
    <View style={styles.inputContainer}>
      <View style={styles.spacer} />
      <AppInput control={control} placeholder={'Enter text'} name={'text'} />
      <View style={styles.spacer} />
      <View style={styles.cardsContainer}>
        {effects.map((effect) => (
          <View key={effect.name}>
            <AppCard
              imagePath={effect.imagePath}
              control={control}
              placeholder={effect.placeholder}
              name={effect.name}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  spacer: {
    padding: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});
