import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import * as Ble from 'dpld-ble';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {BadgeConnectionStatus} from '@/components/BadgeConnectionStatus';
import {BadgeScanning} from '@/components/BadgeScanning';
import {type BadgeMagic} from '@/models/BadgeMagic.model';

export default function Home(): JSX.Element {
  const [scanning, setScanning] = useState(false);
  const [discoveredBadges, setDiscoveredBadges] = useState<Record<string, BadgeMagic>>({});
  const [connectedBadge, setConnectedBadge] = useState<BadgeMagic>();

  useEffect(() => {
    if (connectedBadge) return;

    const discoveredBadgesList = Object.values(discoveredBadges);
    const badge = discoveredBadgesList[0];

    if (badge) {
      Ble.connect(badge.id);
    }
  }, [discoveredBadges, connectedBadge]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <BadgeConnectionStatus
          connectedBadge={connectedBadge}
          scanning={scanning}
          setConnectedBadge={setConnectedBadge}
        />
        <View style={styles.divider} />
        <BadgeScanning
          setScanning={setScanning}
          scanning={scanning}
          setDiscoveredBadges={setDiscoveredBadges}
          setConnectedBadge={setConnectedBadge}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});
