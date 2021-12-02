import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=[
    {
      cid:23,
      title:"java",
      description:"this is for testing purpose",

    },
    {
      cid:24,
      title:"java",
      description:"this is for testing purpose",

    },


  ];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberofQuestions:'',
    active:true,
    category:{
      cid:'',



    },
  }

  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        alert("Error in loading from")
        

      }
 );
 
  }
  addQuiz(){
    if(this.quizData.title.trim()==''||this.quizData.title==null){
            this._snack.open("Title Required","",{duration:3000})
            return;
    }
      //call server
      this._quiz.addQuiz(this.quizData).subscribe(
          (data:any)=>{
            this._snack.open("Quiz is Added Successfully!!","",{duration:3000})

          },
          (error)=>{
            alert('Server error!!');
            console.log(error);
          }


      )

  }

}
