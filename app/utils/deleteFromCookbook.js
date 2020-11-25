import React, { useEffect } from "react";
import { Alert } from "react-native";

import url from "../utils/url";

export default deleteFromCookbook = (id) => {
  useEffect(() => {
    fetch(url + "deleteFromCookbook.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        return response.json();
      })

      .then((responseJson) => {
        Alert.alert(responseJson);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        console.log(error.message);
      });
  });
};
