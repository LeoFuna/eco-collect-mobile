import { RectButton, TextInput } from 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import logo from '../../assets/logo.png';
import bg from '../../assets/home-bg.png';
import { StackNavigationProp } from '@react-navigation/stack';

type StackNavigation = StackNavigationProp<any>;

type BrazilState = {
  id: number,
  sigla: string,
  nome: string,
  regiao: {
    id: number,
    sigla: string,
    nome: string,
  }
}

const serializeStatesFromApi = (statesFromApi: BrazilState[]) => {
  return statesFromApi.map(({ sigla, nome }) => ({
    label: nome,
    value: sigla,
  }))
}

export default function Home() {
  const navigation = useNavigation<StackNavigation>();
  const [brazilStates, setBrazilStates] = React.useState<{ label: string, value: string }[]>([]);
  const [selectedState, setSelectedState] = React.useState<string>();

  const handleNavigateToPoints = () => {
    navigation.navigate('Points', { uf: selectedState });
  }

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => response.json())
    .then(data => setBrazilStates(serializeStatesFromApi(data)))
  }, [])

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
      
      <View style={styles.selectContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedState(value)}
          items={brazilStates}
          placeholder={{ label: 'Selecione o estado' }}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        >
          <TextInput
            style={{
              backgroundColor: '#FFF',
              borderRadius: 8,
              height: 60,
              marginBottom: 8,
              paddingHorizontal: 24,
              fontSize: 16,
            }}
            value={brazilStates?.find(({ value }) => value === selectedState)?.label || ''}
            placeholder='Selecione o estado'
          />
          <Icon name='chevron-down' size={20} color='#A0A0B2' style={{ position: 'absolute', right: 15, top: 20 }} />
        </RNPickerSelect>
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
  },
  selectContainer: {
    marginBottom: 24,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#A0A0B2',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: '#A0A0B2',
    backgroundColor: '#FFF',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});