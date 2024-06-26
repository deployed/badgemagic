import {DefaultTheme, type MD3Theme} from 'react-native-paper';

export const theme: MD3Theme = {
  ...DefaultTheme,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    primary: 'red',
    onPrimary: '#fff',
    background: '#f3f3f3',
    secondary: 'black',
    onSecondary: 'gray',
  },
};
