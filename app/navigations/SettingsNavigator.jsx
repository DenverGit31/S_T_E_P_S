import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../screens/Setting/SettingsScreen";

const Stack = createStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="setting" component={SettingScreen} />
    </Stack.Navigator>
  );
}
