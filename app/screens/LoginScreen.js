import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import color from "../utils/color";
import url from "../utils/url";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("email").then((data) => {
      if (data) {
        let email = data;
        navigation.navigate("Home", { email });
        console.log("loginEmail:  ", email);
      }
    });
  }, []);

  const handleLogin = (e, response) => {
    e.preventDefault();
    fetch(url + "login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson === "Logged in successfully") {
          AsyncStorage.setItem("email", email);
          navigation.navigate("Home", { email });
        } else {
          Alert.alert("Error", responseJson);
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
        <Text style={styles.text}>Please Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={styles.text}>E-Mail</Text>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    bottom: 90,
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
    bottom: 90,
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

export default LoginScreen;
