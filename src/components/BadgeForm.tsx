import {useState} from 'react';
import {StyleSheet, View, useWindowDimensions, Text} from 'react-native';

import {useFormContext} from 'react-hook-form';
import {
  TabView,
  SceneMap,
  TabBar,
  type SceneRendererProps,
  type NavigationState,
} from 'react-native-tab-view';

import {AppInput} from '@/components/AppInput';

import {type FormData} from '../models/BadgeForm.model';
import {Effects} from './Effects';

const Animations = (): JSX.Element => <Text>Nothing implemented 00</Text>;

const Speed = (): JSX.Element => <Text>Nothing implemented 00</Text>;

const renderScene = SceneMap({
  effects: Effects,
  animations: Animations,
  speed: Speed,
});

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  },
): JSX.Element => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'red'}}
    style={{backgroundColor: 'white'}}
    renderLabel={({route, focused}) => (
      <Text style={{color: focused ? 'black' : 'gray', margin: 8}}>{route.title}</Text>
    )}
  />
);

export const BadgeForm = (): JSX.Element => {
  const {control} = useFormContext<FormData>();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'effects', title: 'Effects'},
    {key: 'animations', title: 'Animations'},
    {key: 'speed', title: 'Speed'},
  ]);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.spacer} />
      <AppInput control={control} placeholder={'Enter text'} name={'text'} />
      <View style={styles.spacer} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  spacer: {
    padding: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  selectionNavigation: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 16,
    padding: 16,
  },
});
