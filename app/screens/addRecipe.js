import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RenderSideNav from "../Components/MainContainer";
import color from "../utils/color";
import url from "../utils/url";

const Recipes = ({ navigation, route }) => {
  let [type, setType] = useState("");
  let [recipe, setRecipe] = useState("");
  let [ingredients, setIngredients] = useState("");
  let [instructions, setInstructions] = useState("");
  let [image, setImage] = useState("");

  let email = route.params.email;

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

  const handleSave = () => {
    fetch(url + "addRecipe.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe: recipe,
        type: type,
        ingredients: ingredients,
        instructions: instructions,
        image: image,
      }),
    })
      .then((response) => {
        return response.json();
      })

      .then((responseJson) => {
        Alert.alert("Adding Recipe", responseJson, [
          {
            text: "Ok",
            onPress: () => {
              navigation.navigate("Home", { email }),
                navigation.navigate("Cookbook", { email });
            },
          },
        ]);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
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
      <ScrollView contentContainerStyle={styles.form}>
        <Button title="Upload a Picture" onPress={pickImage} />
        <TextInput
          style={styles.input}
          onChangeText={(recipe) => {
            setRecipe(recipe);
          }}
        />
        <Text style={styles.text}>Recipe Name</Text>

        <Picker
          selectedValue={type}
          style={styles.picker}
          onValueChange={(type) => setType(type)}
        >
          <Picker.Item label="Select an option" />
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Appetizer" value="Appetizer" />
          <Picker.Item label="Dessert" value="Dessert" />
          <Picker.Item label="Misc" value="Misc" />
        </Picker>
        <Text style={styles.text}>Recipe Type</Text>
        <TextInput
          style={styles.input}
          onChangeText={(ingredients) => {
            setIngredients(ingredients);
          }}
        />
        <Text style={styles.ingText}>Ingredients</Text>
        <Text style={styles.subText}>(Seperate ingredients with a comma)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(instructions) => {
            setInstructions(instructions);
          }}
        />
        <Text style={styles.text}>Instructions</Text>

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
      </ScrollView>
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
    marginTop: 15,
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
  },
  text: {
    fontSize: 18,
    color: color.primary,
    padding: 10,
    paddingBottom: 10,
  },
  ingText: {
    fontSize: 18,
    color: color.primary,
  },
  subText: {
    color: color.secondary,
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
  picker: {
    height: 50,
    width: 200,
    color: color.secondary,
  },
});

export default Recipes;
