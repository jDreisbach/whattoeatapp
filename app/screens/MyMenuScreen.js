import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RenderSideNav from "../Components/MainContainer";
import color from "../utils/color";
import url from "../utils/url";

const Menu = ({ navigation, route }) => {
  let email = route.params.email;
  let [data, setData] = useState([]);
  let [isLoading, setLoading] = useState(true);
  let [random, setRandom] = useState([]);

  useEffect(() => {
    fetch(url + "getMenu.php", {
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setData(responseJson.menu);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const Randomize = (array, len) => {
    let result = array[Math.floor(Math.random() * len)];

    return result;
  };

  const handleRandomize = () => {
    if (!data) {
      return null;
    }
    const seven = [1, 2, 3, 4, 5, 6, 7];
    let arr = seven.map(() => {
      let item = Randomize(data, data.length);
      let randomItems = item.item;

      return randomItems;
    });

    fetch(url + "randomize.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "applcation/json",
      },
      body: JSON.stringify({
        randomItems: arr,
      }),
    })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => setLoading(false));
  };

  const loadData = () => {
    fetch(url + "getRandom.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setRandom(responseJson.randomized);
      })
      .catch((error) => Alert.alert("Error", error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const Calender = () => {
    if (!data || !random) {
      return (
        <View style={styles.itemText}>
          <Text style={styles.recipeType}>
            Add Recipes to your cookbook to use this feature.
          </Text>
        </View>
      );
    }

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let rand = random.map(
      ({ sunday, monday, tuesday, wednesday, thursday, friday, saturday }) => {
        let names = [
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
        ];

        return names;
      }
    );

    const RenderedData = () => {
      let recipe = [];

      for (let i = 0; i < days.length; i++) {
        let recipeName = rand[0][i];
        const day = days[i];

        recipe.push(
          <View key={i} style={styles.dayContainer}>
            <Text style={styles.day}>{day}</Text>
            <Text style={styles.menuText}>{recipeName}</Text>
          </View>
        );
      }
      return recipe;
    };
    return (
      <View>
        <RenderedData />
      </View>
    );
  };

  const RenderMenu = () => {
    loadData();
    return (
      <View style={styles.itemContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={color.secondary}
            style={{ marginTop: 200 }}
          />
        ) : (
          <Calender />
        )}
      </View>
    );
  };

  //   const Calender = () => {
  //     const days = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];
  //     let day = days.map((val, index) => {
  //       let item = Randomize(data, data.length);
  //       let randomItem = item.item;
  //       useEffect(() => {
  //         setRandom(randomItem);
  //       }, []);
  //       console.log(random);
  //       return (
  //         <View key={index} style={styles.dayContainer}>
  //           <Text style={styles.day}>{val}</Text>
  //           <Text style={styles.menuText}>{randomItem}</Text>
  //         </View>
  //       );
  //     });
  //     return day;
  //   };

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
      <TouchableOpacity style={styles.button} onPress={handleRandomize}>
        <Text style={styles.buttonText}>Create Menu</Text>
      </TouchableOpacity>
      <ScrollView>
        <RenderMenu />
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
  menuText: {
    color: "white",
    fontSize: 20,
  },
  dayContainer: {
    borderWidth: 0.26,
    borderColor: "white",
    elevation: 5,
    backgroundColor: "dimgray",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 30,
  },
  day: {
    color: color.primary,
    fontSize: 30,
  },
  button: {
    backgroundColor: color.primary,
    padding: 10,
    marginTop: 50,
    elevation: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    padding: 10,
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

export default Menu;
