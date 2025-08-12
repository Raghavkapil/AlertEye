import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

export default function PanicScreen() {
  const [loading, setLoading] = useState(false);

  const handlePanicPress = async () => {
    try {
      setLoading(true);

      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to send alert.");
        setLoading(false);
        return;
      }

      // Get current location
      let loc = await Location.getCurrentPositionAsync({});
      console.log("📍 Location:", loc.coords);

      // Replace with actual logged-in user ID
      const payload = {
        userId: "USER_123",
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      };

      // Send to backend
      const response = await fetch("http://<YOUR_LOCAL_IP>:5000/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("🚨 Panic Alert Sent!", `Time: ${new Date().toLocaleString()}`);
      } else {
        Alert.alert("Error", result.message || "Failed to send alert");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while sending alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panic Button</Text>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <Button title="🚨 Send Panic Alert" color="red" onPress={handlePanicPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 }
});
