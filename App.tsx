import { StatusBar } from "expo-status-bar";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { TaskManagerError, defineTask } from "expo-task-manager";
import { GeofencingEventType, LocationRegion } from "expo-location";
import Constants from "expo-constants";
import ZoneList from "./components/ZoneList";
import { useState } from "react";

const GEOFENCE_TASK_NAME = "geofence";

defineTask(
  GEOFENCE_TASK_NAME,
  ({
    data: { eventType, region },
    error,
  }: {
    data: { eventType: GeofencingEventType; region: LocationRegion };
    error: TaskManagerError | null;
  }) => {
    if (error) {
      console.error(error);
      return;
    }

    if (eventType === GeofencingEventType.Enter) {
      console.log("You've entered region:", region);
    } else if (eventType === GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    } else {
      console.error("Unknown event type");
    }
  }
);

export default function App() {
  const [showZoneList, setShowZoneList] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ margin: 8, fontSize: 26 }}>Welcome to Geotrack</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, margin: 8 }}>
          <Button title="Manage zones" onPress={() => setShowZoneList(true)} />
        </View>
        <View style={{ flex: 1, margin: 8 }}>
          <Button title="New habit" onPress={() => alert("Not implemented")} />
        </View>
      </View>
      <Modal visible={showZoneList} animationType="slide">
        <View style={styles.modalHeader}>
          <Text style={{ margin: 8, fontSize: 20 }}>Manage zones</Text>
          <View style={{ margin: 8 }}>
            <Button title="Close" onPress={() => setShowZoneList(false)} />
          </View>
        </View>
        <ZoneList taskName={GEOFENCE_TASK_NAME} />
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: 8,
  },
  modalHeader: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
