import { StyleSheet, ScrollView} from 'react-native'
import React, { useContext } from 'react'
import Card from '../../components/Card';
import Page from '../../layouts/Page';
import { Button, FlatList, Spinner } from 'native-base';
import { ProductsContext } from '../../context/ProductsProvider';

export default function ListItens() {

  const {AllProducts, loading, fetchProducts, isSearching} = useContext(ProductsContext);
  const productListEmpty = AllProducts.length === 0;

  return (
    <Page title='Lista de produtos' >
      {/* <Button onPress={() => {fetchProducts()}} >More {AllProducts.length}</Button> */}
      {
        !productListEmpty &&
        <FlatList
          keyExtractor={item => item.id.toString()}
          removeClippedSubviews
          // initialNumToRender={4}
          paddingX={1} 
          ListFooterComponent={() => <>{loading && <Spinner margin={4} size={'lg'} colorScheme={'black'} />}</>}
          // scrollEventThrottle={30}
          onEndReachedThreshold={0.01}
          onEndReached={() => !isSearching && fetchProducts()}
          data={AllProducts}
          renderItem={(prop) => <Card addPermission product={prop.item} key={prop.index} />}
        />
      }
      {loading && productListEmpty &&
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
