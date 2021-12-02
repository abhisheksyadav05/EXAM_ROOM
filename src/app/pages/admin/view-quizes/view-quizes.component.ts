import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {


  quizzes=[
    {
           qid:23,
           title:'Basics Java Quiz',
           description:'skjdkjnskdjnsakjdnasdkjnadkn',
           maxMarks:'50',
           numberofQuestions:'20',
           active:'',
           category:{
             title:'programming'

           }
    },
    {
      qid:23,
      title:'Basics Java Quiz',
      description:'for testing purpose',
      maxMarks:'50',
      numberofQuestions:'20',
      active:'',
      category:{
        title:'programming'

      }
}
]

  constructor(private _quiz:QuizService,private snack:MatSnackBar ) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
    (error)=>{
      console.log(error);
      this.snack.open("Server Error in loading the data!! ","",{duration:3000});
    }



    )
  }

  deleteQuiz(qid:any){

  this._quiz.deleteQuizz(qid).subscribe(
    (data:any)=>{
      alert("Are you Sure?")
        
      this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
      this.snack.open("quiz deleted successfully!!!","",{duration:3000});
    },
    (error)=>
    {
      console.log(error);
      this.snack.open("Quiz cannot be delete Server error!!!","",{duration:3000});
    }


  )

  }

}
