import useAxios from "../hooks/useAxios";
import {create} from 'zustand'
const url=`${import.meta.env.VITE_BACKEND_URL}/api/product`
const {data,loading}=useAxios({url})
const useProductStore=create((set)=>({
 product:[],
 loading:loading,
 
 getProduct:(state)=>(set)=>({
    loading:false,
    product:data,
 })
 

}))
export default useProductStore