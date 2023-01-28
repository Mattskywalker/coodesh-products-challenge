import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card';
import api, { ProductModel } from '../../api';
import Page from '../../layouts/Page';
import { FlatList, Spinner } from 'native-base';

export default function ListItens() {

  const [AllProducts, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [productLimit, setProductLimit] = useState(7)
  const products = AllProducts.slice(0, productLimit);

  const fetchProducts = async () => {
    await api.getProductList()
      .then((data) => {
        setProducts([...data]);
        setLoading(false);
      });

  }

  useEffect(() => {
    (async () => {
      await fetchProducts();
    })()
  }, [])

  return (
    <Page title='Lista de produtos' >
      {
        !loading &&
        <FlatList
          paddingX={1}
          ListFooterComponent={() => <>{!(productLimit >= AllProducts.length) && <Spinner size={'lg'} colorScheme={'black'} />}</>}
          scrollEventThrottle={30}
          onEndReachedThreshold={0.01}
          onEndReached={() => { setProductLimit(value => value + 7) }}
          data={products}
          renderItem={(prop) => <Card addPermission product={prop.item} key={prop.index} />}
        />
      }
      {loading &&
        <ScrollView style={{paddingHorizontal: 2}} >

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
