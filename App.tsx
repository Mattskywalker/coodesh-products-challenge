
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import UserProductsProvider from './src/context/UserProductsProvider';
import ProductsProvider from './src/context/ProductsProvider';

import Routes from './src/routes';

export default function App() {
  return (
    <ProductsProvider>
      <UserProductsProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </NativeBaseProvider>
      </UserProductsProvider>
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
