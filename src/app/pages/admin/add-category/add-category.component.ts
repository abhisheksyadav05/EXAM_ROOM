import { Component, OnInit } from '@angular/core';
import { AnimationDurations } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  category={
    title:'',
    description:''
  }
  constructor(private _category:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.category.title.trim()==''||this.category.title==null){
     this._snack.open("Title is required","",{duration:3000})
      return ;
    }

    this._category.addCategory(this.category).subscribe((data:any)=>{
      this._snack.open("Success!! Category is Added Successfully","",{duration:3000})
    },
    (error)=>{
      console.log(error);
      this._snack.open("server error!! ");
    }
    
    
    )

  }

}
