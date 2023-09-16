import { RectButton, TextInput } from 'react-native-gesture-handler';
import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import bg from '../../assets/home-bg.png';
import { StackNavigationProp } from '@react-navigation/stack';

type StackNavigation = StackNavigationProp<any>;

export default function Home() {
  const navigation = useNavigation<StackNavigation>();

  const handleNavigateToPoints = () => {
    navigation.navigate('Points');
  }

  return (
    <ImageBackground
      source={bg}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.main}>
        <Image source={logo} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name='arrow-right' color='#FFF' size={24} />
          </View>
          <View style={styles.buttonText}>
            <Text style={styles.text}>Entrar</Text>
          </View>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#f0f0f5",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },
  description: {
    color: "#6c6c80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },
  footer: {
    justifyContent: "flex-end",
    marginBottom: 32,
  },
  button: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#34cb79",
    borderRadius: 10,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "#2fb86e",
    color: "#fff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  }
});