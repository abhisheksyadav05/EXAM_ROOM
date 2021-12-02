import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }
  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }

  ngOnInit(): void {
  }

  formSubmit()
  {
  
    if(this.user.username==''||this.user.username==null&&(this.user.password==''||this.user.password==null))
    {
      this.snack.open("user and password is required",'ok');
    return;
  }
  //addUser Service
  this.userService.addUser(this.user).subscribe((data:any)=>{
    //success
    console.log(data);

    this.snack.open('Successfully done !! '+ data.id);
  },
  (error)=>{
    //error
    console.log(error);
    alert('something went wrong');
  }
  
  
  )
      
  }
  

}
