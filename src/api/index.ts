import { dataBase } from './firebase'
import { collection, getDocs, addDoc, getDoc, doc} from "firebase/firestore"

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
    localId: string
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

export const getProductList = async () => {
    const resultList: ProductModel[] = [];
    await getDocs(collection(dataBase, COLLECTION_KEY))
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                resultList.push({...doc.data(), id: doc.id, price: doc.data().price * 100} as ProductModel)
            })
        }).catch((reason) => {
            console.error(reason)
        })
    return resultList;
}

export default { getProduct, getProductList, saveProduct }