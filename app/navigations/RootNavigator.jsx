import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeNavigator from "./HomeNavigator";
import SettingsNavigator from "./SettingsNavigator";
import StudentNavigation from "./StudentScreen";
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync();
export default function RootNavigator() {
  useEffect(() => {
    async function hideSplashScreen() {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
      await SplashScreen.hideAsync();
    }
    hideSplashScreen();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "white", height: 60 },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Settings: "settings",
            Students: "people-outline",
          };

          return (
            <Ionicons
              name={icons[route.name] || "help-circle"}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Students"
        component={StudentNavigation}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
