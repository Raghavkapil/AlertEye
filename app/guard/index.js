import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function GuardHome() {
  const [incidents, setIncidents] = useState([]);
  const API_URL = Constants.expoConfig.extra.API_URL; // From app.json

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch(`${API_URL}/api/incidents`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setIncidents(data);
      } catch (error) {
        console.log("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
    const interval = setInterval(fetchIncidents, 10000); // refresh every 10 sec
    return () => clearInterval(interval);
  }, []);

  const renderIncident = ({ item }) => (
    <View
      style={{
        backgroundColor: "#ffcccc",
        padding: 15,
        marginBottom: 12,
        borderRadius: 10,
        borderLeftWidth: 6,
        borderLeftColor: "red",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
        🚨 Panic Alert!
      </Text>
      <Text style={{ marginTop: 5 }}>👤 From: {item.userId}</Text>
      <Text>📍 Location: {item.latitude}, {item.longitude}</Text>
      <Text>🕒 Time: {new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 15,
          color: "#333",
        }}
      >
        🛡️ Security Dashboard
      </Text>

      {incidents.length === 0 ? (
        <Text style={{ color: "gray", textAlign: "center", marginTop: 50 }}>
          ✅ No active incidents reported.
        </Text>
      ) : (
        <FlatList
          data={incidents}
          keyExtractor={(item) => item._id}
          renderItem={renderIncident}
        />
      )}
    </View>
  );
}
