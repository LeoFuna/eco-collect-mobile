import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import * as MailComposer from 'expo-mail-composer';
import Constants from "expo-constants";
import { useEffect, useState } from "react";

type RouteParams = {
  Detail: { collectPointId: number };
}

const buildSubtitle = (residues: { name: string }[] = []) => {
  const residueCount = residues.length;
  return residues.reduce((acc: any, { name }: { name: string }, index) => {
    if (index === residueCount - 1) {
      return acc += `${name}`
    }
    return acc += `${name}, `;
  }, '')
}

const getImageUri = (image_url?: string) => {
  if (!image_url || image_url === 'imagem') return 'https://media.istockphoto.com/id/1157106624/pt/foto/all-your-necessities-stored-in-one-place.jpg?s=612x612&w=0&k=20&c=QADz-fF7X_vN3fh4CabC8Xsw0zGVNQret6gZJozlw2o=';
  return image_url
}

export default function Detail({ route }: { route: RouteProp<RouteParams> }) {
  const navigation = useNavigation();
  const [collectPointDetails, setCollectPointDetails] = useState<any>();
  const { collectPointId } = route.params;

  const handleBackNavigation = () => navigation.goBack();

  const handleEmailSend = () => {
    MailComposer.composeAsync({
      subject: 'Quero deixar meu resíduo',
      recipients: [collectPointDetails?.email]
    })
  }

  const handleWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${collectPointDetails?.whatsapp}&text=Tenho interesse em deixar meu resíduo`)
  }

  useEffect(() => {
    fetch(`http://192.168.15.186:3000/api/collect-points/${collectPointId}/`)
    .then(response => response.json())
    .then(data => setCollectPointDetails(data?.collectPoint))
  }, [])

  return (
    <>
      <View style={{ flex: 1, paddingTop: 20 + Constants.statusBarHeight, paddingHorizontal: 24 }}>
        <TouchableOpacity onPress={handleBackNavigation}>
          <Icon name='arrow-left' size={20} color='#34CB79' />
        </TouchableOpacity>
        <Image
          style={styles.heroImage}
          source={{ uri: getImageUri(collectPointDetails?.image) }}
        />
        <Text style={styles.title}>{collectPointDetails?.name}</Text>
        <Text style={styles.subtitle}>
          { buildSubtitle(collectPointDetails?.residues) }
        </Text>
        <Text style={styles.addressTitle}>Endereço</Text>
        <Text style={styles.address}>
          {collectPointDetails?.city}, {collectPointDetails?.uf}{"\n"}Guilherme Gemballa, Jardim América{"\n"}Nº 260
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 24, paddingBottom: 40 }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleWhatsapp}>
          <FontAwesome name='whatsapp' size={20} color='#FFF' />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleEmailSend}>
          <FontAwesome name='envelope-o' size={20} color='#FFF' />
          <Text style={styles.buttonText}>E-mail</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  heroImage: {
    width: 329,
    height: 215,
    marginTop: 26,
    borderRadius: 10,
  },
  title: {
    color: '#3D3D4D', fontFamily: 'Ubuntu_700Bold', fontSize: 30, marginTop: 18
  },
  subtitle: {
    color: '#34CB79', fontFamily: 'Roboto_500Medium', fontSize: 20, lineHeight: 30, marginTop: 16, marginRight: 30
  },
  addressTitle: {
    color: '#322153', fontFamily: 'Ubuntu_700Bold', fontSize: 12, marginTop: 40
  },
  address: {
    color: '#6C6C80', fontFamily: 'Roboto_400Regular', fontSize: 15, lineHeight: 25, marginTop: 8, marginRight: 30
  },
  buttonContainer: {
    backgroundColor: '#34CB79', flex: 1, borderRadius: 6, flexDirection: 'row',
    height: 51, alignItems: 'center', justifyContent: 'center', gap: 12
  },
  buttonText: {
    color: '#FFF', fontFamily: 'Roboto_700Bold', fontSize: 15
  }
});