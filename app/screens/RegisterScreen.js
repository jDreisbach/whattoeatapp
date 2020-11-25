import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";

import color from "../utils/color";
import url from "../utils/url";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    fetch(url + "register.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })

      .then((responseJson) => {
        Alert.alert(responseJson);
        if (responseJson === "Success.  You may now login!") {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/bg-logo.jpg")}
        resizeMode={"contain"}
      />
      <View style={styles.form}>
        <Text style={styles.text}>Please Register your account</Text>
        <TextInput
          style={styles.input}
          onChangeText={(firstName) => setFirstName(firstName)}
        />
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(lastName) => setLastName(lastName)}
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={styles.text}>E-Mail Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Text style={styles.text}>Password</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("Welcome");
          }}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleRegistration}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
  },
  image: {
    flex: 1,
    bottom: 50,
    right: 10,
  },
  form: {
    borderWidth: 0.26,
    width: 300,
    maxWidth: "80%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "white",
  },
  input: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: color.secondary,
    width: "80%",
    padding: 15,
  },
  text: {
    fontSize: 18,
    color: color.primary,
    padding: 10,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  loginButton: {
    backgroundColor: color.primary,
    padding: 10,
    left: 30,
    elevation: 5,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: color.secondary,
    padding: 10,
    right: 30,
    elevation: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    padding: 10,
  },
});

export default RegisterScreen;
