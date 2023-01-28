// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ProductModel } from "..";

// export interface ProductDatabaseScheme {
//   id: string,
//   title: string,
//   type: string,
//   description: string,
//   filename: string,
//   height: number
//   width: number
//   price: number,
//   rating: number,
//   createdAt: string
// }

// const PRODUCTS_KEY = '@products_key'

// async function saveProduct(product: ProductModel){

//   const newDataBaseObject: ProductDatabaseScheme = {...product, createdAt: new Date().toISOString()}

//   const productList = await getProductList();
//   const finalData = !!productList ? [...productList, newDataBaseObject] : [newDataBaseObject];
  
//   await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(finalData));
//   return finalData;
// }

// async function removeProduct(product: ProductModel){
//   AsyncStorage.clear();
//   // const itens = await getProductList();
//   // if(!itens) return;
  
//   // // itens.filter((data) => data.)

// }

// async function getProductList(){
//   const data = await AsyncStorage.getItem(PRODUCTS_KEY)
//   return !!data ? JSON.parse(data) as ProductDatabaseScheme[] : null;
// }

// export default {removeProduct, getProductList, saveProduct}