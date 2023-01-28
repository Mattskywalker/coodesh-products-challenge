import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons'
import { NavigationContainer } from '@react-navigation/native';

import ListItens from './src/views/ListItens';
import UserItens from './src/views/UserItens';
import AppBar from './src/layouts/AppBar';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabFooter from './src/layouts/TabFooter';
import ProductsProvider from './src/context/ProductsProvider';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ProductsProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name='Itens' component={ListItens}
              options={{
                header: () => <AppBar />,
                tabBarIcon: (props) => <Icon color={props.color} style={props} size={30} name='list-unordered' />,
              }} />
            <Tab.Screen
              name='UserItens'
              component={UserItens}
              options={{
                header: () => <AppBar />,
                tabBarIcon: (props) => <Icon color={props.color} style={props} size={30} name='checklist' />
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ProductsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
