import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import icon from "../../assets/science-report.png";
import Feather from "@expo/vector-icons/Feather";
export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        <Image
          source={icon}
          style={{ height: 50, width: 50, marginBottom: 10 }}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#0066ff" }}>
          S.T.E.P.S
        </Text>
        <Text style={{ fontSize: 11, fontWeight: "bold", color: "#0066ff" }}>
          Science and Technology Platform for Students
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              elevation: 2,
              height: 90,
              width: 300,
              borderRadius: 20,

              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="notebook-edit-outline"
                size={30}
                color="gray"
              />
              <Text style={{ fontSize: 18 }}>Activities</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              elevation: 2,
              height: 90,
              width: 300,
              borderRadius: 20,

              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="book-open" size={30} color="gray" />
              <Text style={{ fontSize: 18 }}>Lessons</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
