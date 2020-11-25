import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import color from "../utils/color";
import RenderSideNav from "../Components/MainContainer";
import url from "../utils/url";

const HomeScreen = ({ route, navigation }) => {
  let imageUri = url + "images/";
  let email = route.params.email;

  const RenderRecipes = () => {
    let [isLoading, setLoading] = useState(true);
    let [data, setData] = useState([]);
    useEffect(() => {
      fetch(url + "home.php", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          setData(responseJson.community);
        })

        .catch((error) => console.log("Error", error.message))
        .finally(() => setLoading(false));
    }, []);
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

          const viewProfile = () => {
            navigation.navigate("Profile", { email, origin_user });
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
              <TouchableOpacity onPress={viewProfile}>
                <Text style={styles.ingredients}>
                  Created by: {origin_user}
                </Text>
              </TouchableOpacity>

              <Image source={{ uri: imageUri + image }} style={styles.image} />
              <Text style={styles.recipeType}>{type}</Text>
              <View style={styles.ingredientContainer}>
                <RenderIngredients />
              </View>

              <Text style={styles.instructions}>{instruction}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>Save to My Cookbook</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      );
    };
    return (
      <View style={styles.itemContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={color.secondary}
            style={{ marginTop: 200 }}
          />
        ) : (
          <Recipes />
        )}
      </View>
    );
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
        <RenderRecipes />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "black",
  },

  logo: {
    width: 280,
    height: 80,
    top: 10,
    alignSelf: "flex-start",
    zIndex: 2,
  },

  sideBar: {
    backgroundColor: color.primary,
    width: 200,
    height: "100%",
    right: 120,
    top: 30,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 3,
  },
  navLinks: {
    color: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
  },
  recipeContainer: {
    flex: 1,
    height: "100%",
    padding: 20,
  },
  itemText: {
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
  image: {
    width: 295,
    height: 160,
    borderRadius: 10,
  },
  ingredientContainer: {
    marginBottom: 20,
  },
});
export default HomeScreen;
