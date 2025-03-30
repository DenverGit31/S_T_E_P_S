import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const StudentDetailsComponent = () => {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();
  const Activities = [
    { id: "1", name: "Activity 1", score: "15" },
    { id: "2", name: "Activity 2", score: "22" },
    { id: "3", name: "Activity 3", score: "34" },
  ];

  const renderItems = ({ item }) => {
    return (
      <View style={{ padding: 5 }}>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              {" "}
              <Ionicons name="book-outline" size={24} color="black" />
            </View>
            <View
              style={{
                padding: 10,

                borderBottomColor: "#ccc",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Score : {item.score}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "gray",
            marginTop: 10,
            marginBottom: 10,
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <View
          style={{
            borderRadius: 20,
            paddingVertical: 20,
            width: "92%",
            backgroundColor: "#5c85d6",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginLeft: 15,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderWidth: 2,
                borderColor: "white",
                height: 70,
                width: 70,
                borderRadius: 100,
              }}
            >
              <FontAwesome6 name="user" size={45} color="white" />
            </View>
            <View>
              <Text style={{ color: "white" }}> Name : {data.name}</Text>
              <Text style={{ color: "white" }}>
                {" "}
                ID Number : {data.studentNumber}
              </Text>
              <Text style={{ color: "white" }}>
                {" "}
                Gender : {data.gender.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <FlatList
          data={Activities}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default StudentDetailsComponent;
