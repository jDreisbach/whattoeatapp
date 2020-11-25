import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import color from "../utils/color";
import url from "../utils/url";

const MyRecipes = () => {
  const RenderCookbook = () => {
    let [isLoading, setLoading] = useState([]);
    let [data, setData] = useState([]);

    const imageUri = url + "images/";

    useEffect(() => {
      fetch(url + "getSharedRecipes.php", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          setData(responseJson.recipes);
        })

        .catch((error) => console.log("Error", error.message))
        .finally(() => setLoading(false));
    }, []);

    const Recipes = () => {
      if (!data) {
        return (
          <View style={styles.itemText}>
            <Text style={styles.recipeType}>
              When you Share Recipes they will appear here.
            </Text>
          </View>
        );
      }

      return data.map(
        ({
          id,
          type,
          item,
          instruction,
          ingredients,
          recipe_id,
          origin_user,
          image,
        }) => {
          const RenderIngredients = () => {
            let ingredient = ingredients.split(",");

            let items = ingredient.map((val, index) => {
              return (
                <Text key={index} style={styles.ingredients}>
                  {val}
                </Text>
              );
            });
            return items;
          };

          const handleUnshare = () => {
            fetch(url + "unshareRecipe.php", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: recipe_id,
              }),
            })
              .then((response) => {
                return response.json();
              })

              .then((responseJson) => {
                Alert.alert("Notice", responseJson, [
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
              <Image source={{ uri: imageUri + image }} style={styles.image} />

              <Text style={styles.recipeType}>{type}</Text>
              <View style={styles.ingredientContainer}>
                <RenderIngredients />
              </View>

              <Text style={styles.instructions}>{instruction}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.unshareButton}
                  onPress={handleUnshare}
                >
                  <Text style={styles.buttonText}>Unshare</Text>
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
      <ScrollView>
        <RenderCookbook />
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
  unshareButton: {
    backgroundColor: color.secondary,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
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

export default MyRecipes;
