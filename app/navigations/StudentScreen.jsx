import { createStackNavigator } from "@react-navigation/stack";
import StudentScreen from "../screens/Student/StudentScreen";
import StudentDetailsComponent from "../screens/Student/components/StudentDetailsComponent";
const Stack = createStackNavigator();

export default function StudentNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="student" component={StudentScreen} />
      <Stack.Screen
        options={{ headerShown: true, title: "Student Profile" }}
        name="student-details"
        component={StudentDetailsComponent}
      />
    </Stack.Navigator>
  );
}
