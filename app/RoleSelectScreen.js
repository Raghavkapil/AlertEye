import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 30 }}>🔐 Log in as:</Text>

      <TouchableOpacity
        style={{ padding: 15, backgroundColor: "#4CAF50", borderRadius: 10, marginBottom: 15, width: 220 }}
        onPress={() => router.replace("/student")}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>🎓 Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 15, backgroundColor: "#f44336", borderRadius: 10, width: 220 }}
        onPress={() => router.replace("/guard")}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>🛡️ Security Personnel</Text>
      </TouchableOpacity>
    </View>
  );
}
