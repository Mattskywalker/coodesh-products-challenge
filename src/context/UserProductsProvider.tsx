import { createContext, useState, useEffect, ReactNode } from 'react'
import { View, Text } from 'react-native'
import React from 'react'

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductModel } from '../api';

export interface ProductDatabaseScheme {
  id: string,
  title: string,
  type: string,
  description: string,
  filename: string,
  height: number
  width: number
  price: number,
  rating: number,
  createdAt: string
}

interface ProductContextValues {
  saveProduct: (product: ProductModel) => Promise<ProductDatabaseScheme[] | undefined>,
  removeProduct: (product: ProductModel)=> Promise<void>,
  getProductList(): Promise<ProductDatabaseScheme[] | null>,
  products: ProductDatabaseScheme[]
}

interface Props {
  children: ReactNode
}

export const UserProductsContext = createContext({} as ProductContextValues);

const PRODUCTS_KEY = '@products_key'

export default function UserProductsProvider({children}: Props) {

  const [products, setProductList] = useState<ProductDatabaseScheme[]>([]);

  const fetch = () => {
    getProductList()
      .then(data => {
        setProductList(data || []);
      })
  }

  useEffect(() => {
    fetch();
  }, [])

  async function saveProduct(product: ProductModel) {

    const newDataBaseObject: ProductDatabaseScheme = { ...product, createdAt: new Date().toISOString() }

    const productList = await getProductList();
    const existThisProduct = (productList?.filter((data) => data.id === product.id) || []).length > 0;
    if(existThisProduct) {return}
    const finalData = !!productList ? [...productList, newDataBaseObject] : [newDataBaseObject];

    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(finalData));
    setProductList(finalData)
    return finalData;
  }

  async function removeProduct(product: ProductModel) {
    const itens = await getProductList();
    if(!itens) return;
    const result = itens.filter((data) => data.id !== product.id);
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(result));
    setProductList(result);
    return
  }

  async function getProductList() {
    const data = await AsyncStorage.getItem(PRODUCTS_KEY)
    const result = !!data ? JSON.parse(data) as ProductDatabaseScheme[] : null
    setProductList(result || [])
    return result;
  }

  return (
    <UserProductsContext.Provider value={{removeProduct, getProductList, saveProduct, products}}>
      {children}
    </UserProductsContext.Provider>
  )
}