import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageService } from "../Services/LocalStorageService";

const access=createSlice({
    name:"access",
    initialState:{
        isLogin:true
    },
    reducers:{
        updateAccessSwitch: (state, action) => {
            state.isLogin=action.payload
        },
        SetDataLocalStorage:(_,action)=>{
            localStorage.setItem('UserDetails',JSON.stringify(action.payload))
            LocalStorageService.GetLocalStorageData()
        }
    }
})

export const { updateAccessSwitch,SetDataLocalStorage } =  access.actions
export default access.reducer