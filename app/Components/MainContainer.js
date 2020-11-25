import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Modal,
} from "react-native";

import color from "../utils/color";
import url from "../utils/url";

const RenderSideNav = ({ ...props }) => {
  let [visible, setVisible] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [image, setImage] = useState("");

  const imageUri = url + "images/";

  const toggleNav = () => setVisible(!visible);

  useEffect(() => {
    fetch(url + "getProfilePhoto.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.image.map(({ image }) => {
          setImage(image);
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const opacity = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleNav}>
        <Image style={styles.logo} source={require("../assets/bg-logo.jpg")} />
      </TouchableOpacity>
      {visible && (
        <Animated.View style={{ opacity }}>
          <View style={styles.sideBar}>
            <TouchableOpacity
              style={styles.navLinks}
              onPress={() => setModalVisible(!modalVisible)}
            >
              {image ? (
                <Image
                  source={{ uri: imageUri + image }}
                  style={styles.avatar}
                />
              ) : (
                <Image
                  style={styles.avatar}
                  source={require("../assets/default.png")}
                />
              )}
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.modalClose}>X</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={props.addPhoto}>
                    <Text style={styles.modalText}>Edit Profile Picture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={props.editProfile}>
                    <Text style={styles.modalText}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={props.myProfile}>
                    <Text style={styles.modalText}>My Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity style={styles.navLinks} onPress={props.home}>
              <Text style={styles.navLinks}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navLinks} onPress={props.addRecipe}>
              <Text style={styles.navLinks}>Add Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navLinks} onPress={props.mymenu}>
              <Text style={styles.navLinks}>My Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navLinks}
              onPress={props.shoppinglist}
            >
              <Text style={styles.navLinks}>Shopping List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navLinks} onPress={props.cookbook}>
              <Text style={styles.navLinks}>Cookbook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.following}>
              <Text style={styles.navLinks}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navLinks} onPress={props.logout}>
              <Text style={styles.navLinks}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 280,
    height: 80,
    top: 10,
    alignSelf: "flex-start",
    zIndex: 2,
  },
  navLinks: {
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
  },
  sideBar: {
    backgroundColor: color.primary,
    width: 200,
    height: "100%",
    right: 80,
    top: 30,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 3,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "dimgray",
    borderRadius: 20,
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  modalClose: {
    color: color.secondary,
    textAlign: "right",
    fontSize: 30,
    marginBottom: 15,
  },
});
export default RenderSideNav;
