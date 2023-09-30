export interface ITodo {
    title: string;
    content: string;
}
export interface IUTodo {
    _id: string
    userId: string
    title: string
    content: string
    updatedAt: string
}

export interface IUpdate{
    userId:string,
    todoId:string,
    title:string,
    Content:string

}