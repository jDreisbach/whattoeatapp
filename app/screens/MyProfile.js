import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import MyRecipes from "../Components/MyRecipes";
import RenderSideNav from "../Components/MainContainer";
import color from "../utils/color";
import url from "../utils/url";

const MyProfile = ({ navigation, route }) => {
  let email = route.params.email;
  console.log("email:  ", email);
  let [profile, setProfile] = useState([]);

  const imageUri = url + "images/";

  useEffect(() => {
    MyRecipes;
  });

  useEffect(() => {
    fetch(url + "myProfile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        setProfile(responseJson.profile);
      })
      .catch((error) => console.log(error));
  }, []);

  const Profile = () => {
    let pro = profile.map(
      ({ bio, email, firstName, lastName, image }, index) => {
        return (
          <View key={index}>
            <Image style={styles.image} source={{ uri: imageUri + image }} />
            <Text style={styles.nameText}>{firstName + " " + lastName}</Text>
            <Text style={styles.emailText}>{email}</Text>
            <Text style={styles.text}>A little about {firstName}</Text>
            <Text style={styles.bioText}>{bio}</Text>
            <Text style={styles.recipeText}>My Shared Recipes</Text>
          </View>
        );
      }
    );
    return pro;
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
      <ScrollView>
        <Profile />
        <MyRecipes />
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
  image: {
    height: 250,
    width: 400,
    marginTop: 40,
  },
  nameText: {
    color: "white",
    fontSize: 40,
  },
  emailText: {
    color: "white",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
    width: "80%",
    fontSize: 20,
  },
  bioText: {
    color: "white",
    fontSize: 20,
  },
  text: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
    width: "80%",
  },
  recipeText: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
    width: "80%",
    marginTop: 20,
  },
});

export default MyProfile;
