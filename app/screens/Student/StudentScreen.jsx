import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  SafeAreaView,
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  Easing,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import icon from "../../assets/science-report.png";
import { useNavigation } from "expo-router";
import { Button, RadioButton } from "react-native-paper";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const { height } = Dimensions.get("window");

export default function StudentScreen() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const schema = yup.object().shape({
    studentFName: yup.string().required("First name is required"),
    studentMName: yup.string(),
    studentLName: yup.string().required("Last name is required"),
    contactNumber: yup
      .string()
      .matches(/^\d+$/, "Contact number must be numbers only")
      .required("Contact number is required"),
    studentEmail: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),
    studentId: yup.string().required("Student ID is required"),
    gender: yup
      .string()
      .oneOf(["Male", "Female"])
      .required("Gender is required"),
  });

  let defaultValues = {
    studentFName: "",
    studentMName: "",
    studentLName: "",
    studentEmail: "",
    contactNumber: "",
    studentId: "",
    gender: "Male",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const data = [
    { id: "1", name: "Denver", studentNumber: "12345678987", gender: "male" },
    { id: "2", name: "Juan", studentNumber: "12345678987", gender: "male" },
    { id: "3", name: "John", studentNumber: "12345678987", gender: "male" },
  ];

  // Animate modal in
  const openModal = () => {
    setShowModal(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animate modal out
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowModal(false);
      reset();
    });
  };

  const onSubmit = (data) => {
    reset();
    console.log("Form Data:", data);
    closeModal();
  };

  // FlatList render function
  const renderItems = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => navigation.navigate("student-details", { data: item })}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="user-circle" size={30} color="gray" />
            <View style={styles.listItemText}>
              <Text>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>
      </View>
    );
  };

  // Student Form with Animated Modal

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={icon} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>S.T.E.P.S</Text>
        <Text style={styles.headerSubtitle}>
          Science and Technology Platform for Students
        </Text>
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={openModal} style={styles.addButton}>
          <View style={styles.addButtonContent}>
            <AntDesign name="adduser" size={25} color="white" />
            <Text style={styles.addButtonText}>Add Student</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="none"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
            onTouchEnd={closeModal}
          />

          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* Header with close button */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
              <Image source={icon} style={styles.formIcon} />
              <Text style={styles.modalTitle}>ADD STUDENT</Text>
            </View>

            <Animated.ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.formScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formGroup}>
                <Text style={styles.label}>First Name</Text>
                <Controller
                  control={control}
                  name="studentFName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Enter first name"
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      error={!!errors.studentFName}
                    />
                  )}
                />
                {errors.studentFName && (
                  <Text style={styles.error}>
                    {errors.studentFName.message}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Middle Name {`(Optional)`}</Text>
                <Controller
                  control={control}
                  name="studentMName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Enter middle name"
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                    />
                  )}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name</Text>
                <Controller
                  control={control}
                  name="studentLName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Enter last name"
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      error={!!errors.studentLName}
                    />
                  )}
                />
                {errors.studentLName && (
                  <Text style={styles.error}>
                    {errors.studentLName.message}
                  </Text>
                )}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Contact Number</Text>
                <Controller
                  control={control}
                  name="contactNumber"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Enter contact number"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  )}
                />
                {errors.contactNumber && (
                  <Text style={styles.error}>
                    {errors.contactNumber.message}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <Controller
                  control={control}
                  name="studentEmail"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Enter email"
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      error={!!errors.studentEmail}
                    />
                  )}
                />
                {errors.studentEmail && (
                  <Text style={styles.error}>
                    {errors.studentEmail.message}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Student ID</Text>
                <Controller
                  control={control}
                  name="studentId"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Enter student ID"
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      error={!!errors.studentId}
                    />
                  )}
                />
                {errors.studentId && (
                  <Text style={styles.error}>{errors.studentId.message}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Gender</Text>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, value } }) => (
                    <RadioButton.Group onValueChange={onChange} value={value}>
                      <View style={styles.radioContainer}>
                        <View style={styles.radioOption}>
                          <RadioButton value="Male" color="#0066ff" />
                          <Text>Male</Text>
                        </View>
                        <View style={styles.radioOption}>
                          <RadioButton value="Female" color="#0066ff" />
                          <Text>Female</Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  )}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  buttonColor="#5c85d6"
                  textColor="white"
                  onPress={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </View>
            </Animated.ScrollView>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  headerIcon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0066ff",
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0066ff",
  },
  addButtonContainer: {
    alignItems: "center",
  },
  addButton: {
    paddingVertical: 15,
    backgroundColor: "#5c85d6",
    width: "50%",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  addButtonText: {
    fontSize: 17,
    color: "white",
  },
  listContainer: {
    height: "67%",
  },
  listItem: {
    padding: 5,
  },
  listItemText: {
    padding: 10,
    borderBottomColor: "#ccc",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginTop: 10,
    marginBottom: 10,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066ff",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  formIcon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  formScrollContent: {
    paddingBottom: 30,
  },
  formGroup: {
    flexDirection: "column",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    marginLeft: 5,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10,
    height: 40,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 35,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  submitButton: {
    borderRadius: 10,
  },
  error: { color: "red", fontSize: 12 },
});
