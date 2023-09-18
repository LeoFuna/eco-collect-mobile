import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from 'react-native-svg';
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useRef, useState } from "react";

const DEFAULT_URI = 'https://media.istockphoto.com/id/1157106624/pt/foto/all-your-necessities-stored-in-one-place.jpg?s=612x612&w=0&k=20&c=QADz-fF7X_vN3fh4CabC8Xsw0zGVNQret6gZJozlw2o='
interface Residue {
  id: number;
  name: string;
  image_url: string;
}

type RouteParams = {
  Points: { uf: number };
}

export default function Points({ route }: { route: RouteProp<RouteParams>}) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { uf } = route.params;
  const [residues, setResidues] = useState<Residue[]>([]);
  const [collectPoints, setCollectPoints] = useState<any[]>([]);
  const [selectedResidueId, setSelectedResidueId] = useState<number>();
  const previoutsController = useRef<AbortController>();

  const handleNavigateBack = () => navigation.goBack();
  const navigateToDetail = (collectPointId: number) => navigation.navigate('Detail', { collectPointId });

  useEffect(() => {
    fetch('http://192.168.15.186:3000/api/residues')
    .then(response => response.json())
    .then(data => setResidues(data.residues))
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Manage the abort controller to fetch only latest request
    if (previoutsController.current) {
      previoutsController.current.abort();
    }
    const controller = new AbortController();
    previoutsController.current = controller;

    let params = ''
    if (selectedResidueId) {
      params = `residues=${[selectedResidueId]}`
    }
    if (uf) {
      params = `${params}&uf=${uf}`
    }
    fetch(`http://192.168.15.186:3000/api/collect-points?${params}`, {
      signal: controller.signal
    })
    .then(response => response.json())
    .then(data => setCollectPoints(data.collectPoints))
    .catch(err => console.log(err));
  }, [selectedResidueId]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={20} color='#34CB79' />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.text}>Encontre no mapa um ponto de coleta</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{ latitude: -23.5489, longitude: -46.6388, latitudeDelta: 0.10, longitudeDelta: 0.10 }}
          >
            {collectPoints.map(point => (
              <Marker
                key={point.id}
                onPress={() => navigateToDetail(point.id)}
                style={styles.mapsMarker}
                coordinate={{ latitude: point.latitude, longitude: point.longitude }}
              >
                <Image
                  style={styles.mapImageMarker}
                  //TO DO: remove this imagem condition, its just for tests
                  source={{ uri: (point?.image === 'imagem' || !point?.image?.length) ? DEFAULT_URI : point?.image }}
                />
                <Text style={styles.mapTitleMarker}>{ point.name }</Text>
              </Marker>
            ))}
          </MapView>
        </View>
      </View>
      <View style={styles.residuesContainer}>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {residues.map(residue => (
            <TouchableOpacity
              onPress={() => setSelectedResidueId(residue.id)}
              style={{ ...styles.residueCard, borderColor: selectedResidueId === residue.id ? '#34CB79' : 'transparent'}}
              key={residue.id}
            >
              <SvgUri
                uri='https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg'
                width={32}
                height={32}
              />
              <Text style={styles.cardTitle}>{ residue.name }</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
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
    height: 484,
    marginTop: 16,
  },
  scrollContainer: {
    gap: 8,
  },
  residuesContainer: {
    paddingHorizontal: 15,
  },
  residueCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 40,
    gap: 12,
    marginTop: 24,
    height: 104,
    width: 104,
  },
  mapsMarker: {
    width: 90,
    height: 80,
  },
  mapImageMarker: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  mapTitleMarker: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
    lineHeight: 23,
    height: 26,
    backgroundColor: '#34CB79',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 16,
    color: '#322153',
    paddingHorizontal: 22,
  }
})