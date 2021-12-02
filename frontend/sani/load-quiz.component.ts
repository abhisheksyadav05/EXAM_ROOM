import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
catid:any;
quizzes:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
   
   this._route.params.subscribe((params)=>{
    this.catid= params.catid;

    if(this.catid==0){
      console.log("Load All Quiz")
      this._quiz.getActiveQuizzes().subscribe((data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error)=>{
        console.log(error)
        alert("Error in loading data from the server")
      })
  }
  else{
    console.log("load specific quiz")
    this._quiz.getActiveQuizzesOfCategory(this.catid).subscribe((data:any)=>{
      this.quizzes=data;
    },
    (error)=>{
      console.log(error)
      alert("error in loading quiz")
    })
  }
   })
  
  }

}
