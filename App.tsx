import { GestureHandlerRootView } from  'react-native-gesture-handler';
import { StatusBar, StyleSheet } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import Routes from './src/routes';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Ubuntu_700Bold, Roboto_700Bold });

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
        <Routes />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});