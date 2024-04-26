import {type SetStateAction, useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import * as Ble from 'dpld-ble';
import {Button} from 'react-native-paper';

import {type BadgeMagic} from '@/models/BadgeMagic.model';

const BADGE_MAGIC_ADVERTISING_NAME = 'LSLED';

interface BadgeScanning {
  setScanning: (scanning: boolean) => void;
  scanning: boolean;
  setDiscoveredBadges: (arg: SetStateAction<Record<string, BadgeMagic>>) => void;
  setConnectedBadge: (connectedBadge: BadgeMagic) => void;
}

export const BadgeScanning = ({
  setScanning,
  scanning,
  setDiscoveredBadges,
  setConnectedBadge,
}: BadgeScanning): JSX.Element => {
  const scanForBadges = useCallback(() => {
    setDiscoveredBadges({});
    Ble.startScan();
    setScanning(true);
    setTimeout(() => {
      Ble.stopScan();
      setScanning(false);
    }, 3000);
  }, [setScanning]);

  useEffect(() => {
    const discoverySub = Ble.addPeripheralDiscoveredListener((peripheral) => {
      if (peripheral.name !== BADGE_MAGIC_ADVERTISING_NAME) {
        return;
      }

      setDiscoveredBadges((prev: Record<string, BadgeMagic>) => {
        if (prev[peripheral.id]) {
          return prev;
        }

        console.log('Discovered badge', peripheral);

        return {
          ...prev,
          [peripheral.id]: {
            name: peripheral.name,
            id: peripheral.id,
          },
        };
      });
    });

    const connectionSub = Ble.addPeripheralConnectedListener((peripheral) => {
      console.log('Connected to badge', peripheral);
      setConnectedBadge(peripheral);
    });

    scanForBadges();

    return () => {
      discoverySub.remove();
      connectionSub.remove();
    };
  }, [scanForBadges]);

  return (
    <View style={styles.scanContainer}>
      {scanning ? (
        <View>
          <ActivityIndicator size="large" />
          <Text>Scanning...</Text>
        </View>
      ) : (
        <Button disabled={scanning} onPress={scanForBadges}>
          Scan for badges
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
