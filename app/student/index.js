import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function StudentHome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🎓 Student Dashboard</Text>
      {/* <Button title="🚨 Panic Button" onPress={() => router.push("/(tabs)/PanicScreen")} />
      <Button title="🗺️ Open Map" onPress={() => router.push("/(tabs)/MapScreen")} />
      <Button title="👥 Friends" onPress={() => router.push("/(tabs)/FriendScreen")} /> */}
      <Button title="🔐 LogIn" onPress={()=>router.push("/(tabs)/PanicScreen")}></Button>
    </View>
  );
}
