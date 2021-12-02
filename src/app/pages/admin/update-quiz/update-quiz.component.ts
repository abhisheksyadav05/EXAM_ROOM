import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _cat:CategoryService,private _snack:MatSnackBar,private _router:Router) { }
   
  qid=0;
  quiz:any;
  categories:any;
  ngOnInit(): void {
    this.qid=this._route.snapshot.params.qid;
      
    this._quiz.getQuiz(this.qid).subscribe(
       (data:any)=>{
         this.quiz=data;
         console.log(this.quiz);




       },
       (error)=>{
         console.log(error)
       }


    );
    this._cat.categories().subscribe((data:any)=>{
       this.categories=data;
      },
      (error)=>
      {
        alert("Error in loading data");
      }
      
      
      );

  }

  //update form
  public updateData(){
     this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
       this._snack.open("Quiz Updated!!!!!","",{duration:3000})
       alert("quiz updated succesfully!")
       this._router.navigate(['/admin/quizzes'])
      },
     (error)=>{
       console.log(error)
      this._snack.open("SERVER ERROR!","",{duration:3000})
         
    }
    )
    

     }


  }



