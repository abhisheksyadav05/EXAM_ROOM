import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
   loginData={
     username:'',
     password:'',

   };


  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  formSubmit(){
    
    if(this.loginData.username.trim()==''||this.loginData.username==null)
    {
      this.snack.open("Username is required",'',{duration:3000})
      return;
    }

    if(this.loginData.password.trim()==''||this.loginData.password==null)
    {
      this.snack.open("password is required",'',{duration:3000})
      return;
    }
    console.log('login clicked');
    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe((data:any)=>{
      console.log("Success");
      console.log(data);

      //login 
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe(
           (user:any)=>{
             this.login.setUser(user);
      
             console.log(user);
             //redirct ..Admin:admin dashbord
             //redirect ..normal :normal-dashboard
              if(this.login.getUserRole()=='Admin'&&this.login.getUserAuth()==this.loginData.password)
              {
               
                //admin dashboard
                window.location.href='/admin'
                //this.router.navigate(['admin'])

              }
              else if(this.login.getUserRole()=='Normal'&&this.login.getUserAuth()==this.loginData.password){
               
                //normal user dashboard
                window.location.href='/user-dashboard/0'
                //this.router.navigate(['user-dashboard'])
              }
              else{
                
                this.snack.open("Invalid details!! Try again",'',{duration:3000})
                this.login.logout();
              }

           }


      );

    },
    (error)=>{
      console.log("error")
    console.log(error);
    this.snack.open("Invalid details!! Try again",'',{duration:3000})
    }
    
    );
    
     
  }

  ngOnInit(): void {
  }

}
