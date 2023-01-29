import { ProductModel } from "../api";

export type Navigate = (destiny: string, params: RouteParamsProductModel) => void

export type RouteParamsProductModel = {product?: ProductModel}