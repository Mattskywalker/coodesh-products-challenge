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
}

export const ProductsContext = createContext({} as ProductContextValues);

export default function ProductsProvider({children}: ProductContextProps) {

  const [AllProducts, setAllProducts] = useState<ProductModel[]>([]);
  const [resultQueryProducts, setResult] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFromFirebase = async () => {
    setLoading(true);
    await api.getProductList()
      .then((data) => {
        setAllProducts(data);
        setResult(data);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchFromFirebase()
  }, [])

  const searchProducts = (query: string) => {
    if(query === '') setResult(AllProducts);
    setResult(AllProducts.filter((data) => data.title.toLowerCase().includes(query.toLowerCase())))
  }
  
  return (
    <ProductsContext.Provider value={{AllProducts: resultQueryProducts, loading, searchProducts}}>
      {children}
    </ProductsContext.Provider>
  )
}