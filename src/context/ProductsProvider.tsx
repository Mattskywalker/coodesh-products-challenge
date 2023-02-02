import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import api, { ProductModel } from '../api';

interface ProductContextProps {
  children: ReactNode
}

interface ProductContextValues {
  AllProducts: ProductModel[];
  loading: boolean;
  searchProducts: (query: string) => void;
  fetchProducts(): Promise<void>,
  isSearching: boolean
}

export const ProductsContext = createContext({} as ProductContextValues);

export default function ProductsProvider({ children }: ProductContextProps) {

  const docsLimit = 8;

  const [AllProducts, setAllProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setSearching] = useState(false);

  const offset = AllProducts.length;

  const fetchFromFirebase = async () => {
    setLoading(true);
    await api.getProductList({ limit: docsLimit, offset })
      .then((data) => {
        setAllProducts([...AllProducts, ...data]);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchFromFirebase()
  }, [])

  const searchProducts = async (query: string) => {
    if(query === ''){
      setSearching(false);
      setAllProducts([]);
      fetchFromFirebase();
      return
    }

    setSearching(true);
    await api.search({ queryString: query, limit: docsLimit })
      .then((data) => {
        setAllProducts(data);
        // setLoading(false);
      })
  }

  return (
    <ProductsContext.Provider value={{ AllProducts, loading, searchProducts, fetchProducts: fetchFromFirebase, isSearching }}>
      {children}
    </ProductsContext.Provider>
  )
}