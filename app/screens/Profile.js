import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RenderSideNav from "../Components/MainContainer";
import color from "../utils/color";
import url from "../utils/url";

const Profile = ({ navigation, route }) => {
  let origin_user = route.params.origin_user;
  let email = route.params.email;
  let [profile, setProfile] = useState([]);
  let [data, setData] = useState([]);
  let [isFollowing, setFollowing] = useState(true);

  const imageUri = url + "images/";

  console.log("origin user inside profile:  ", origin_user);
  useEffect(() => {
    fetch(url + "profile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: origin_user,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setProfile(responseJson.profile);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(url + "myShared.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: origin_user,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.recipe);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFollow = () => {
    fetch(url + "followUser.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: origin_user,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "Following") {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const UserProfile = () => {
    let pro = profile.map(
      ({ bio, email, firstName, lastName, image }, index) => {
        return (
          <View key={index}>
            <Image style={styles.image} source={{ uri: imageUri + image }} />
            {isFollowing ? (
              <TouchableOpacity
                style={styles.followButton}
                onPress={handleFollow}
              >
                <Text style={styles.buttonText}>Follow {firstName}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.followButton}>
                <Text style={styles.buttonText}>Following {firstName}!</Text>
              </View>
            )}

            <Text style={styles.nameText}>{firstName + " " + lastName}</Text>
            <Text style={styles.emailText}>{email}</Text>
            <Text style={styles.text}>A little about {firstName}</Text>
            <Text style={styles.bioText}>{bio}</Text>
          </View>
        );
      }
    );
    return pro;
  };

  const Recipes = () => {
    if (!data) {
      return (
        <View style={styles.itemText}>
          <Text style={styles.recipeType}>
            Sorry! It looks like nothing has been shared yet!
          </Text>
        </View>
      );
    }
    return data.map(
      ({ id, type, item, ingredients, instruction, origin_user, image }) => {
        const RenderIngredients = () => {
          let ingredient = ingredients.split(",");

          let items = ingredient.map(function iterate(val, index) {
            return (
              <Text key={index} style={styles.ingredients}>
                {val}
              </Text>
            );
          });
          return items;
        };

        const handleSave = () => {
          fetch(url + "saveRecipe.php", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              type: type,
              item: item,
              instruction: instruction,
              ingredients: ingredients,
              image: image,
            }),
          })
            .then((response) => {
              return response.json();
            })

            .then((responseJson) => {
              Alert.alert("Saving Recipe", responseJson, [
                {
                  text: "Ok",
                },
              ]);
            })
            .catch((error) => {
              Alert.alert("Error", error.message);
              console.log(error.message);
            });
        };
        return (
          <View key={id} style={styles.itemText}>
            <Text style={styles.recipeTitle}>{item}</Text>

            <Image
              source={{ uri: imageUri + image }}
              style={styles.recipeImage}
            />
            <Text style={styles.recipeType}>{type}</Text>
            <View style={styles.ingredientContainer}>
              <RenderIngredients />
            </View>

            <Text style={styles.instructions}>{instruction}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.shareButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save to My Cookbook</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    );
  };
  //   return (
  //     <View style={styles.itemContainer}>
  //       {isLoading ? (
  //         <ActivityIndicator
  //           size="large"
  //           color={color.secondary}
  //           style={{ marginTop: 200 }}
  //         />
  //       ) : (
  //         <Recipes />
  //       )}
  //     </View>
  //   );
  // };

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
        <UserProfile />
        <Recipes />
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
  recipeContainer: {
    flex: 1,
    height: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  itemText: {
    flex: 1,
    color: "white",
    borderWidth: 0.5,
    width: 300,
    borderColor: "white",
    borderStyle: "solid",
    elevation: 5,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "dimgray",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 20,
    zIndex: -1,
    left: 50,
  },
  recipeTitle: {
    fontSize: 32,
    color: color.primary,
  },
  recipeType: {
    fontSize: 18,
    color: color.secondary,
    marginBottom: 10,
  },
  ingredients: {
    color: "white",
  },
  instructions: {
    color: "white",
    fontSize: 18,
  },
  shareButton: {
    backgroundColor: color.primary,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
  },
  deleteButton: {
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
  buttonContainer: {
    marginTop: 20,
  },
  recipeImage: {
    width: 295,
    height: 160,
    borderRadius: 10,
  },
  ingredientContainer: {
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: color.primary,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    width: "98%",
    alignItems: "center",
  },
});

export default Profile;
