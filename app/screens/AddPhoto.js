import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RenderSideNav from "../Components/MainContainer";
import url from "../utils/url";
import color from "../utils/color";

const AddPhoto = ({ navigation, route }) => {
  let email = route.params.email;
  let [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Camera roll access must be granted.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let localUri = result.uri;
      let fileName = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : `image`;
      setImage(fileName);

      let formData = new FormData();
      formData.append("photo", { uri: localUri, name: fileName, type });

      console.log(formData);
      return fetch(url + "uploadPhoto.php", {
        method: "POST",
        header: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
    }
  };
  const savePhoto = () => {
    fetch(url + "addProfilePhoto.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        image: image,
      }),
    })
      .then(() => navigation.navigate("Home"))
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
      <View>
        <TouchableOpacity style={styles.upload} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload A Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
  upload: {
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  saveButton: {
    backgroundColor: color.primary,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    padding: 10,
  },
});
export default AddPhoto;
