import { ILogin, ISignUp } from "../models/AccessModels";
import { ApiRequest } from "./ApiRequest";

export class AccessApi extends ApiRequest{

    static UserLogin(userlogin:ILogin){
        const url='/login'
        return this.Post({url,data:userlogin})
    }

    static UserSignUp(userSignUp:ISignUp){
        const url='/signup'
        return this.Post({url,data:userSignUp})
    }

}