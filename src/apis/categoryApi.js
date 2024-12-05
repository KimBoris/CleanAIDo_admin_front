import axios from "axios";
import{useAuthStore} from "../stores/useAuthStore.js";

const host = "http://localhost:8080/api/v1/category";

export const getParentList = async () =>{
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    const res = await axios.get(`${host}/list`,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    })
    console.log(res)
    return res.data
}

export const getChildList = async (cno) =>{
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    const res = await axios.get(`${host}/children/${cno}`,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    })
    console.log(res)
    return res.data
}

export const addChild = async (formData) =>{
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    const res = await axios.post(`${host}/children`, formData,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return res.data
}

export const addParent = async (formData) =>{
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    const res = await axios.post(`${host}/parent`, formData,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return res.data
}

export const removeCategory = async (cno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    const res = await axios.delete(`${host}/${cno}`,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return res.data
}