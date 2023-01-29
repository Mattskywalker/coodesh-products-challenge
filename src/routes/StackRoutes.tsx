import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EditPage from '../views/EditPage'
import AppBar from '../layouts/AppBar'
import UserItens from '../views/UserItens'
import { UserProductsContext } from '../context/UserProductsProvider'

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  
  const {searchProducts} = useContext(UserProductsContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
          name='Meus itens'
          component={UserItens}
          options={{
            header: () => <AppBar searchLabel={'em meus produtos...'} searchMethod={searchProducts} />,
          }}
        />
      <Stack.Screen name='Editar' component={EditPage} />
      
    </Stack.Navigator>
  )
}