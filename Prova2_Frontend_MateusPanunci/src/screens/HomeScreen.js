import  React from "react";
import { View, Text } from "react-native";
import styles from "../styles";


const HomeScreen = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.homeTitle}>Bem vindo ao Gerenciador de Apps Mobile!</Text>
    </View>
  );
};

export default HomeScreen
