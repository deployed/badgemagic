import {Button} from 'react-native-paper';

interface AppButton {
  title: string;
  disabled: boolean;
  onPress: () => Promise<void> | void;
}

export const AppButton = ({disabled, onPress, title}: AppButton): JSX.Element => {
  return (
    <Button mode="contained" disabled={disabled} onPress={onPress}>
      {title}
    </Button>
  );
};
