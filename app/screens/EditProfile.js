import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RenderSideNav from "../Components/MainContainer";
import color from "../utils/color";
import url from "../utils/url";

const EditProfile = ({ navigation, route }) => {
  let [bio, setBio] = useState("");
  let email = route.params.email;
  console.log(email);

  const handleSave = () => {
    fetch(url + "editBio.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        bio: bio,
        email: email,
      }),
    })
      .then(() => navigation.navigate("My Profile", { email }))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <RenderSideNav
        home={() => navigation.navigate("Home", { email })}
        mymenu={() => navigation.navigate("My Menu", { email })}
        shoppinglist={() => navigation.navigate("Shopping List", { email })}
        cookbook={() => navigation.navigate("Cookbook", { email })}
        logout={() => {
          AsyncStorage.clear();
          navigation.navigate("Welcome");
        }}
        addRecipe={() => navigation.navigate("Recipes", { email })}
        addPhoto={() => navigation.navigate("Add Photo", { email })}
        editProfile={() => navigation.navigate("Edit Profile", { email })}
        myProfile={() => navigation.navigate("My Profile", { email })}
        following={() => navigation.navigate("Following", { email })}
      />
      <View style={styles.form}>
        <Text style={styles.text}>A little about me:</Text>
        <TextInput style={styles.input} onChangeText={(bio) => setBio(bio)} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home", { email })}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  form: {
    borderWidth: 0.26,
    width: 300,
    maxWidth: "80%",
    elevation: 3,
    padding: 20,
    marginBottom: 30,
    marginTop: 100,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: color.secondary,
    width: "80%",
    padding: 15,
    marginBottom: 40,
  },
  text: {
    fontSize: 18,
    color: color.primary,
    padding: 10,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  saveButton: {
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

export default EditProfile;
