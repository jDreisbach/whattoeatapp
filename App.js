import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import HomeScreen from "./app/screens/HomeScreen";
import CookbookScreen from "./app/screens/CookbookScreen";
import MyMenuScreen from "./app/screens/MyMenuScreen";
import ShoppingListScreen from "./app/screens/ShoppingListScreen";
import Recipes from "./app/screens/addRecipe";
import AddPhoto from "./app/screens/AddPhoto";
import EditProfile from "./app/screens/EditProfile";
import MyProfile from "./app/screens/MyProfile";
import Profile from "./app/screens/Profile";
import Following from "./app/screens/Following";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cookbook" component={CookbookScreen} />
        <Stack.Screen name="My Menu" component={MyMenuScreen} />
        <Stack.Screen name="Shopping List" component={ShoppingListScreen} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Add Photo" component={AddPhoto} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="My Profile" component={MyProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Following" component={Following} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
