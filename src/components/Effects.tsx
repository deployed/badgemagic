import {StyleSheet, View} from 'react-native';

import {useFormContext} from 'react-hook-form';

import {effects} from '@/utils/effects';

import {ControlledCard} from './AppCard';

export const Effects = (): JSX.Element => {
  const {control} = useFormContext<FormData>();

  return (
    <View style={styles.cardsContainer}>
      {effects.map((effect) => (
        <View key={effect.name}>
          <ControlledCard
            imagePath={effect.imagePath}
            control={control}
            placeholder={effect.placeholder}
            name={effect.name}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});
