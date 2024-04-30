import {Text} from 'react-native';

import {useTheme} from 'react-native-paper';
import {TabBar, type SceneRendererProps, type NavigationState} from 'react-native-tab-view';

export const renderTabBar = (
  props: SceneRendererProps & {navigationState: NavigationState<{key: string; title: string}>},
): JSX.Element => {
  const {colors} = useTheme();

  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: 'transparent', shadowOpacity: 0}}
      renderLabel={({route, focused}) => (
        <Text style={{color: focused ? colors.secondary : colors.onSecondary, margin: 8}}>
          {route.title}
        </Text>
      )}
    />
  );
};
