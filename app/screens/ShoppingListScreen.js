import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import RenderSideNav from "../Components/MainContainer";
import color from "../utils/color";
import url from "../utils/url";

const ShoppingList = ({ navigation, route }) => {
  let email = route.params.email;
  let [isLoading, setLoading] = useState(true);
  let [ingredients, setIngredients] = useState([]);
  let [isClicked, setClicked] = useState(false);

  useEffect(() => {
    fetch(url + "shoppingList.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIngredients(responseJson.ingredients);
      })
      .catch((error) => Alert.alert("Error", error.message))
      .finally(() => setLoading(false));
  }, []);

  const List = () => {
    if (!ingredients) {
      return (
        <View style={styles.itemText}>
          <Text style={styles.recipeType}>
            Make sure you have recipes in your cookbook and a menu created
            before using this feature.
          </Text>
        </View>
      );
    }
    let list = ingredients.map(({ ingredients }) => {
      let ingredient = ingredients.split(",");
      //console.log("ingredients:  ", ingredient);

      let items = ingredient.map((val, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={(isClicked) => setClicked(!isClicked)}
          >
            <Text style={isClicked ? styles.strikeList : styles.list}>
              {val}
            </Text>
          </TouchableOpacity>
        );
      });
      return items;
    });
    return list;
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
        addPhoto={() => navigation.navigate("AddPhoto", { email })}
        editProfile={() => navigation.navigate("Edit Profile", { email })}
        myProfile={() => navigation.navigate("My Profile", { email })}
        following={() => navigation.navigate("Following", { email })}
      />
      <ScrollView>
        <List />
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
  list: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
  },
  strikeList: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    textDecorationLine: "line-through",
    textDecorationColor: color.primary,
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
  recipeType: {
    fontSize: 18,
    color: color.secondary,
    marginBottom: 10,
  },
});

export default ShoppingList;
