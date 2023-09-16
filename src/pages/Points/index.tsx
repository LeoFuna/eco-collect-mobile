import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import MapView from "react-native-maps";


export default function Points() {
  const navigation = useNavigation();

  const handleNavigateBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name='arrow-left' size={20} color='#34CB79' />
      </TouchableOpacity>

      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.text}>Encontre no mapa um ponto de coleta</Text>

      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },
  text: {
    fontFamily: 'Roboto_400Regular',
    color: '#6C6C80',
    marginTop: 8,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },
  map: {
    width: '100%',
    height: 150,
    marginTop: 16,
  }
})