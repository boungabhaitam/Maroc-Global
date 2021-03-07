import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NewsList } from './components/NewsList/NewsList';
import { NewsRead } from './components/NewsRead/NewsRead';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Router, Stack, Scene } from 'react-native-router-flux'
import { Provider } from "react-redux";
import { store } from './components/Redux/store';


export default function App() {
  console.log('App')
  return (
    <Provider store={store} >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Router>
            <Stack key="root">
              <Scene navTransparent key="newsList" component={NewsList} />
              <Scene key="newsRead" component={NewsRead} />

            </Stack>
          </Router>

          <StatusBar backgroundColor='white' />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}


