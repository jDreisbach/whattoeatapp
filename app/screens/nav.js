import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

import color from "../utils/color";

const MainContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/bg-logo.jpg")} />
      <View style={styles.sideBar}>
        <TouchableOpacity
          style={styles.navLinks}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.navLinks}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navLinks}
          onPress={() => {
            navigation.navigate("MyMenu");
          }}
        >
          <Text style={styles.navLinks}>My Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navLinks}
          onPress={() => {
            navigation.navigate("ShoppingList");
          }}
        >
          <Text style={styles.navLinks}>Shopping List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navLinks}
          onPress={() => {
            navigation.navigate("Cookbook");
          }}
        >
          <Text style={styles.navLinks}>Cookbook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navLinks}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.navLinks}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  logo: {
    width: "100%",
    height: 90,
    top: 0,
    zIndex: 1,
  },
  sideBar: {
    backgroundColor: color.primary,
    width: "30%",
    height: "80%",
    right: 150,
    borderRadius: 10,
    alignItems: "center",
  },
  navLinks: {
    color: "white",
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default MainContainer;
