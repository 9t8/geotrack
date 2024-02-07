import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import Zone from "../utils/Zone";
import {
  useBackgroundPermissions,
  startGeofencingAsync,
  LocationAccuracy,
  getCurrentPositionAsync,
} from "expo-location";

export default function ZoneList({ taskName }: { taskName: string }) {
  const [status, requestPermission] = useBackgroundPermissions();

  const [zones, setZones] = useState<Zone[]>([
    {
      name: "Gunn",
      location: {
        latitude: 37.40252,
        longitude: -122.1334165,
        radius: 100,
      },
    },
  ]);

  const reloadZones = async () => {
    if (!status?.granted) {
      requestPermission();
    }
    if (!status?.granted) {
      alert("Error: did not receive permissions");
      return;
    }
    await startGeofencingAsync(
      taskName,
      zones.map(({ location }) => location)
    );
    alert("Success");
  };

  return (
    <View style={styles.buttonRow}>
      <View style={{ margin: 8 }}>
        <Button onPress={reloadZones} title="Reload zones" />
      </View>
      <View style={{ margin: 8 }}>
        <Button
          onPress={async () => {
            await getCurrentPositionAsync({
              accuracy: LocationAccuracy.Highest,
            });
            alert("Polled");
          }}
          title="Poll GPS"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
