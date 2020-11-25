import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";

import color from "../utils/color";
import url from "../utils/url";

const RenderRecipes = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url + "community.json", {
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

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.itemText}>{item.item}</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    itemText: {
      color: "white",
      left: 70,
    },
  });

export default RenderRecipes;
