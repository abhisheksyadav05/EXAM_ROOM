import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}
     
  //current user which is log in 
      public getCurrentUser(){
        return this.http.get(`${baseUrl}/current-user`);
      }




     //generate token
     public generateToken(loginData:any){

      return this.http.post(`${baseUrl}/generate-token`,loginData);

     }
     //login user set token in localstorage
     public loginUser(token: string){
       localStorage.setItem("token",token);
       return true;
     }

     //user is login in or not
     public isLoggedin(){
       let tokenStr=localStorage.getItem("token")
       if(tokenStr==undefined||tokenStr==""||tokenStr==null)
       {
         return false;
       }
       else{
         return true;
       }

     }
     //logout"remove token from local storage
    public logout(){
      localStorage.removeItem('token');
      return true;
    }
    //get token
    public getToken(){
      return localStorage.getItem('token');
    }

    //set user detail
    public setUser(user: any)
{
  localStorage.setItem('user',JSON.stringify(user));

}
public getUser(){
  let userStr=localStorage.getItem("user");
  if(userStr!=null)
  {
    return JSON.parse(userStr);
  }
  else{
    this.logout();
    return null;
  }
}  

//get user role
public getUserRole(){
  let user=this.getUser();
  return user.authorities[0].authority
}

//get user Auth
public getUserAuth(){
  let user=this.getUser();
  return user.password;
}
public logclear(){
  localStorage.clear();
}


}
