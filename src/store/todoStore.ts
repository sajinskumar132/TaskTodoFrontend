import { createSlice } from "@reduxjs/toolkit";
import { IUTodo } from "../models/TodoModels";

const todo=createSlice({
    name:"todo",
    initialState:{
        todoLoading:false,
        BackUpTodo:[],
        todos:[]
    },
    reducers:{
        GetTodos(state,action){
            state.todos=action.payload
            state.BackUpTodo=action.payload
            state.todoLoading=false
        },
        FilterTodos(state,action){
            if(action.payload){
                const Filtered=state.BackUpTodo.filter((item:IUTodo)=> item.title.includes(action.payload))
                state.todos=Filtered
            }else{
                state.todos=state.BackUpTodo
            }
        },
        SetTodoLoading(state,action){
            state.todoLoading=action.payload
        },
        clearTodoStore(state){
            state.todoLoading=false
            state.BackUpTodo=[]
            state.todos=[]
        }
    }
})
export const{ GetTodos,FilterTodos,SetTodoLoading,clearTodoStore}=todo.actions
export default todo.reducer