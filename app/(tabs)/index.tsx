import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const goToSearch = () => {
    router.push("/(tabs)/searchscreen");
  };

  return (
    <View>
      <Text onPress={goToSearch}>
        Go to Search
      </Text>
    </View>
  );
}