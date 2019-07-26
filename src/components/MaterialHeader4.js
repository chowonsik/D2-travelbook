import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class MaterialHeader4 extends Component {

  writediary() {
    Actions.writediary();
}

  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TouchableOpacity style={styles.leftIconButton}>
          <Icon
            name={"menu"}
            style={styles.leftIcon}
          />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            여행일지
          </Text>
        </View>
        <View style={styles.rightIconsWrapper}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon
              name={"search"}
              style={styles.rightIcon3}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={this.writediary}>
            <Icon
              name={"md-create"}
              style={styles.rightIcon4}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    elevation: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  leftIconButton: {
    top: 5,
    left: 5,
    position: "absolute",
    padding: 11
  },
  leftIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "roboto-regular",
    fontSize: 24
  },
  textWrapper: {
    left: 72,
    position: "absolute",
    bottom: 19
  },
  title: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "600",
    lineHeight: 18
  },
  rightIconsWrapper: {
    top: 5,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    right: 5
  },
  iconButton: {
    padding: 11
  },
  rightIcon3: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "roboto-regular",
    fontSize: 24
  },
  rightIcon4: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "roboto-regular",
    fontSize: 24
  }
});
