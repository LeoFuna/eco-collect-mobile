import { GestureHandlerRootView } from  'react-native-gesture-handler';
import { StatusBar, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { useCallback } from 'react';
import Routes from './src/routes';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Ubuntu_700Bold });

  // // https://docs.expo.dev/versions/latest/sdk/splash-screen/
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      {/* <View onLayout={onLayoutRootView}> */}
          <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
            <Routes />
          </GestureHandlerRootView>
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});