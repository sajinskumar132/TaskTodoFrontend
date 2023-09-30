import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL="https://tasktodobackend.onrender.com"

axios.interceptors.request.use((config)=>{
    let UserDetails=window.localStorage.getItem("UserDetails")
    if (UserDetails) config.headers.Authorization = `Bearer ${JSON.parse(UserDetails).token}`;
    console.log(config)
    return config;
},(error)=>{
    console.log(error)
    return Promise.reject(error);
})

axios.interceptors.response.use((response)=>{
    return {...response.data,status:response.status}
},(error)=>{
    throw error.response
    // console.log(error)
})

export class ApiRequest{
    static Request(options:AxiosRequestConfig){
       return axios.request({...options})
    }
    
    static Post(options:AxiosRequestConfig){
       return this.Request({...options,method:"post"})
    }

    static Put(options:AxiosRequestConfig){
        return this.Request({...options,method:"put"})
    } 

    static Delete(options:AxiosRequestConfig){
        return this.Request({...options,method:"delete"})
    } 
}