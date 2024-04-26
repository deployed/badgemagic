import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Button} from 'react-native-paper';

import {AppInput} from '@/components/AppInput';
import {type BadgeMagic} from '@/models/BadgeMagic.model';
import {sendPackets} from '@/utils/bluetooth';
import {getPackets} from '@/utils/payload';

interface BadgeConnectionStatus {
  connectedBadge: BadgeMagic | undefined;
  scanning: boolean;
  setConnectedBadge: (connectedBadge: undefined) => void;
}

export const BadgeConnectionStatus = ({
  connectedBadge,
  scanning,
  setConnectedBadge,
}: BadgeConnectionStatus): JSX.Element => {
  const [text, setText] = useState('');

  const handleSendToBadge = async (): Promise<void> => {
    if (!connectedBadge) {
      return;
    }

    const packets = getPackets(text);

    try {
      await sendPackets(connectedBadge.id, packets);
    } catch (e) {
      console.error(e);
    } finally {
      setConnectedBadge(undefined);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <AppInput placeholder={'Enter text'} text={text} setText={setText} />
      {connectedBadge ? (
        <Button disabled={scanning} onPress={handleSendToBadge}>
          Send to badge
        </Button>
      ) : (
        <Text>No badge connected...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 4,
    rowGap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
