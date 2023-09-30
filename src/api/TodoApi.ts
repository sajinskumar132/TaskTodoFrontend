import { ITodo } from "../models/TodoModels";
import { ApiRequest } from "./ApiRequest";

export class TodoApi extends ApiRequest{

    static GetTodos(userId:string){
        let url=`/${userId}/todos`
        return this.Request({url})
    }
    
    static CreateTodo(userId:string,item:ITodo){
        let url=`/${userId}/createNewTodo`
        return this.Post({url,data:item})
    }
    
    static UpdateTodo(userId:string,todoId:string,item:ITodo){
        let url=`/${userId}/${todoId}/updateTodo`
        return this.Put({url,data:item})
    }

    static DeleteTodo(userId:string,todoId:string){
        let url=`/${userId}/${todoId}/deleteTodo`
        return this.Delete({url})
    }
}