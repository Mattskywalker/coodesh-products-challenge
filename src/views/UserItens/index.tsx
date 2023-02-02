import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Page from '../../layouts/Page';
import Card from '../../components/Card';
import { FlatList, Image, Stack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Navigate } from '../../types';

import { UserProductsContext } from '../../context/UserProductsProvider';

export default function UserItens() {

  const navigation = useNavigation();
  const goTo = navigation.navigate as Navigate;
  
  const {products} = useContext(UserProductsContext)
  const [loading, setLoading] = useState(false);

  return (
    <Page title='Meus Produtos' >
      {
        !loading && products.length === 0 &&
          <Stack p={18} style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }} >
            <Text variant={'h5'} style={{ textAlign: 'center' }} >Você ainda não possui produtos na lista.</Text>
            <TouchableOpacity onPress={() => { goTo('Itens', {}) }} style={{ padding: 18, backgroundColor: '#FEFEFE', borderRadius: 30, marginTop: 18 }} >
              <Text variant='subtitle1' >Ir para lista de produtos</Text>
            </TouchableOpacity>
            <Image mt={28} w={180} h={180} source={require('../../assets/apple.png')} alt={'no products'} />
          </Stack>
      }
      {
        !loading &&
        <FlatList
          paddingX={1}
          data={products}
          renderItem={(prop) => <Card deletePermission editPermission product={prop.item} 
          key={prop.item.id} />}
        />
      }
      {
        loading &&
        Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} loading={true} />
        ))
      }
    </Page>
  )
}

const styles = StyleSheet.create({

});
