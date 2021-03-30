import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router) { }

  //verify login
  public loginVerify(user:Login){
    console.log(user);
    //calling webservices and passing username and password
    return this.httpClient.get<Login>(environment.apiUrl+"/api/user-login/"+user.username+"&"+user.password)
  }
  //Logout Method
  public logout(){
    sessionStorage.removeItem('fullname');
    localStorage.removeItem('fullname');
    localStorage.removeItem('ACCESS_ROLE');
  }

}
