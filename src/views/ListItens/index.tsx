import { StyleSheet, ScrollView} from 'react-native'
import React, { useContext, useState } from 'react'
import Card from '../../components/Card';
import Page from '../../layouts/Page';
import { FlatList, Spinner } from 'native-base';
import { ProductsContext } from '../../context/ProductsProvider';

export default function ListItens() {

  const {AllProducts, loading} = useContext(ProductsContext)
  const [productLimit, setProductLimit] = useState(7)
  const products = AllProducts.slice(0, productLimit);


  return (
    <Page title='Lista de produtos' >
      {
        !loading &&
        <FlatList
          removeClippedSubviews
          initialNumToRender={4}
          paddingX={1}
          ListFooterComponent={() => <>{!(productLimit >= AllProducts.length) && <Spinner size={'lg'} colorScheme={'black'} />}</>}
          scrollEventThrottle={30}
          onEndReachedThreshold={0.01}
          onEndReached={() => {( productLimit <= products.length) && setProductLimit(value => value + 7) }}
          data={products}
          renderItem={(prop) => <Card addPermission product={prop.item} key={prop.index} />}
        />
      }
      {loading &&
        <ScrollView style={{ paddingHorizontal: 2 }} >

          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} loading />
          ))}
        </ScrollView>
      }
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // paddingTop: 16,

  },
  mainLabel: {
    zIndex: 1,
    backgroundColor: '#EFEFEF',
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2

  },
  textInput: {
    flex: 1,
  }
});
