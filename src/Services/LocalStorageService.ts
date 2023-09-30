export class LocalStorageService{

  static LocalData:any

  static GetLocalStorageData(){
    var data=localStorage.getItem("UserDetails")
    if(data){
        this.LocalData=JSON.parse(data)
        return true
    }else{
        return false
    }
  }
  static ClearLocalStorageData(){
    this.LocalData=undefined
    localStorage.removeItem("UserDetails")
  }
}