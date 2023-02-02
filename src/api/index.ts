import { dataBase } from './firebase'
import { collection, getDocs, addDoc, getDoc, doc, query, orderBy, limit as docsLimit, startAt, where,  } from "firebase/firestore"

export interface ProductModel {
    id: string;
    title: string,
    type: string,
    description: string,
    filename: string,
    height: number
    width: number
    price: number,
    rating: number,
    createdAt: string,
    page: number
}

const COLLECTION_KEY = "products"

export const saveProduct = async (product: ProductModel) => {
    let result;
    await addDoc(collection(dataBase, COLLECTION_KEY), product)
        .then(snapshot => {
            result = snapshot;
            // getDoc(collection(dataBase, COLLECTION_KEY))
        })

    return result;
}

export const getProduct = async (id: string) => {

    const productRef = doc(dataBase, COLLECTION_KEY, id);
    const result = await getDoc(productRef);
    return result.data();

}

export interface queryProps {
    limit: number,
    offset: number
}

export const getProductList = async ({ limit, offset }: queryProps) => {
    const resultList: ProductModel[] = [];
    const docsRef = collection(dataBase, COLLECTION_KEY);

    const dbQuery = query(docsRef,
        orderBy('page'),
        startAt(offset),
        docsLimit(limit)
    )

    await getDocs(dbQuery)
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                resultList.push({ ...doc.data(), id: doc.id, price: doc.data().price * 100 } as ProductModel)
            })
        }).catch((reason) => {
            console.error(reason)
        })
    return resultList;
}

interface searchProps {
    queryString: string,
    limit: number,
    offset?: number
}

export const search = async ({ limit, offset, queryString }: searchProps) => {
    const resultList: ProductModel[] = [];
    const docsRef = collection(dataBase, COLLECTION_KEY);

    const dbQuery = query(docsRef,
        docsLimit(limit),
        where('title', '>=', queryString.toLowerCase()),
        where('title', '<=', queryString.toLowerCase() + '~')
    )

    await getDocs(dbQuery)
        .then(async (snapshot) => {
            snapshot.forEach((doc) => {             
                resultList.push({ ...doc.data(), id: doc.id, price: doc.data().price * 100 } as ProductModel)
            })
        }).catch((reason) => {
            console.error(reason)
        })
    return resultList;
}

export default { getProduct, getProductList, saveProduct, search }