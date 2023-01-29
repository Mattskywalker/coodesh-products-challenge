import React, { useContext } from 'react'
import ListItens from '../views/ListItens';
import AppBar from '../layouts/AppBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Octicons'
import StackRoutes from './StackRoutes';
import { ProductsContext } from '../context/ProductsProvider';

const Tab = createBottomTabNavigator();

export default function Routes() {

  const {searchProducts} = useContext(ProductsContext);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Itens' component={ListItens}
        options={{
          header: () => <AppBar searchLabel='Pesquisar em produtos...' searchMethod={searchProducts} />,
          tabBarIcon: (props) => <Icon color={props.color} style={props} size={30} name='list-unordered' />,
        }} />
      <Tab.Screen
        name='Meus Itens' component={StackRoutes}
        options={{
          headerShown: false,
          tabBarIcon: (props) => <Icon color={props.color} style={props} size={30} name='checklist' />
        }} />
    </Tab.Navigator>
  )
}