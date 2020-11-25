import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";

import color from "../utils/color";
import url from "../utils/url";
import RenderSideNav from "../Components/MainContainer";

const Following = ({ navigation, route }) => {
  let email = route.params.email;
  let [users, setUsers] = useState([]);
  let [image, setImage] = useState("");

  let imageUri = url + "images/";

  useEffect(() => {
    fetch(url + "getFollowers.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => setUsers(responseJson.users))
      .catch((error) => console.log(error));
  }, []);

  const RenderUsers = () => {
    let getUsers = users.map(({ id, firstName, lastName, image, email }) => {
      let origin_user = email;
      setImage(image);
      console.log("origin_user:  ", origin_user);
      const viewProfile = (email) => {
        email = route.params.email;
        navigation.navigate("Profile", { email, origin_user });
      };

      return (
        <View style={styles.buttonContainer} key={id}>
          <TouchableOpacity style={styles.button} onPress={viewProfile}>
            {image ? (
              <Image source={{ uri: imageUri + image }} style={styles.image} />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/default.png")}
              />
            )}

            <Text style={styles.text}>
              {firstName} {lastName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
    return getUsers;
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
        <RenderUsers />
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
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    marginTop: 20,
    borderTopColor: color.primary,
    borderTopWidth: 0.5,
    borderBottomColor: color.primary,
    borderBottomWidth: 0.5,
    flexDirection: "row",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginTop: 10,
    flexDirection: "column",
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 30,
    flexDirection: "column",
    textAlignVertical: "center",
  },
});

export default Following;
