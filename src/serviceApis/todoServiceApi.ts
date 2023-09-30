import { notification } from "antd"
import { LocalStorageService } from "../Services/LocalStorageService"
import { TodoApi } from "../api/TodoApi"
import { ITodo } from "../models/TodoModels"
import { DispatchType } from "../store/rootStore"
import { GetTodos, SetTodoLoading } from "../store/todoStore"

export const GetTodo=(dispatch:DispatchType)=>{
    dispatch(SetTodoLoading(true))
    TodoApi.GetTodos(LocalStorageService.LocalData?.id).then((response) => {
        dispatch(GetTodos(response.data))
    }).catch((error) => {
        dispatch(SetTodoLoading(false))
        console.log(error)
        notification.error({
            message:error? error.data.message:"Something went wrong",
          });
    })
}

export const CreateTodo=(dispatch:DispatchType,value:ITodo): Promise<boolean>=>{
    return new Promise((resolve) => {
        TodoApi.CreateTodo(LocalStorageService.LocalData?.id, value)
          .then((response: any) => {
            console.log(response)
            notification.success({
              message: response.message,
            });
            GetTodo(dispatch);
            resolve(true);
          })
          .catch((error) => {
            console.log(error)
            notification.error({
                message:error? error.data.message:"Something went wrong",
              });
            resolve(false);
          });
      });
}

export const UpdateTodos=(dispatch:DispatchType,userId:string,todoId:string,item:ITodo): Promise<boolean>=>{
    return new Promise((resolve)=>{
        TodoApi.UpdateTodo(userId,todoId,item).then((response:any)=>{
            notification.success({
                message: response.message,
              });
              GetTodo(dispatch);
              resolve(true);
        }).catch((error) => {
            notification.error({
                message:error? error.data.message:"Something went wrong",
              });
            resolve(false);
          });
    })

}

export const DeleteTodo=(dispatch:DispatchType,userId:string,todoId:string): Promise<boolean>=>{
    return new Promise((resolve)=>{
        TodoApi.DeleteTodo(userId,todoId).then((response:any)=>{
            notification.success({
                message: response.message,
              });
              GetTodo(dispatch);
               resolve(true);
        }).catch((error) => {
            notification.error({
                message:error? error.data.message:"Something went wrong",
              });
            resolve(false);
          });
    })

}