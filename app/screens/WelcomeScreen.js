import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import color from "../utils/color";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/food.jpg")}
      style={styles.container}
    >
      <View style={styles.title}>
        <Image source={require("../assets/image.png")} style={styles.logo} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.login}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.register}
      >
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  title: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    flexGrow: 20,
    color: "#fff",
    right: 90,
    bottom: -50,
    width: "100%",
    elevation: 5,
  },
  login: {
    backgroundColor: color.secondary,
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  register: {
    backgroundColor: color.primary,
    width: "100%",
    height: "10%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "powderblue",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  logo: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    left: 90,
  },
});

export default WelcomeScreen;
