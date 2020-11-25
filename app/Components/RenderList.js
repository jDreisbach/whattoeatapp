import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import color from "../utils/color";
import url from "../utils/url";

const RenderList = ({ ...props }) => {
  let [ingredients, setIngredients] = useState([]);
  [isClicked, setClicked] = useState(false);

  const handleToggle = () => setClicked(!isClicked);

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
        console.log(responseJson.ingredients);
        setIngredients(responseJson.ingredients);
      })
      .catch((error) => Alert.alert("Error", error.message))
      .finally(() => setLoading(false));
  }, []);

  const List = () => {
    let list = ingredients.map(({ ingredients }, index) => {
      let ingredient = ingredients.split(",");
      let items = ingredient.map((val) => {
        console.log(val);
        return (
          <TouchableOpacity onPress={handleToggle}>
            <Text
              key={index}
              style={isClicked ? styles.strikeList : styles.list}
            >
              {val}
            </Text>
          </TouchableOpacity>
        );
      });
      return items;
    });
    return list;
  };
  return <List />;
};
export default RenderList;
