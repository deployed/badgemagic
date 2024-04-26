import {StyleSheet} from 'react-native';

import {TextInput} from 'react-native-paper';

interface AppInputType {
  placeholder: string;
  text: string;
  setText: (text: string) => void;
}

export const AppInput = ({placeholder, text, setText}: AppInputType): JSX.Element => {
  return (
    <TextInput
      placeholder={placeholder}
      mode="outlined"
      outlineColor="transparent"
      style={styles.container}
      value={text}
      onChangeText={(text) => {
        setText(text);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f3f3f3',
    padding: 10,
  },
});
