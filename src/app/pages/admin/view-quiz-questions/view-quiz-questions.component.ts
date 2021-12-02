import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
 qid:any;
 title:any;
 questions=[
 { "quesId": '', "content": "", "image": "", "option1": "", "option2": "", "option3": "", "option4": "", "answer": "", "givenAnswer": null, "quiz": { "qid": '', "title": " ", "description": "", "maxMarks": "", "numberofQuestions": null, "active": false, "category": { "cid": 27, "title": "Java", "description": "This is quize related to programming lang" } } }
 ];
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
  this.qid=this._route.snapshot.params.qid;
  this.title=this._route.snapshot.params.title;
  this._question.getQuestionOfQuiz(this.qid).subscribe((data:any)=>{
    console.log(data)
    console.log(this.questions)
    this.questions=data;
  },(error)=>
  {
    console.log(error)
  })
  console.log(this.qid)
  console.log(this.title)
  }

  public deleteQuestion(qid:any){
    this._question.deleteQuestion(qid).subscribe(
       (data:any)=>{

          this._snack.open("Question Deleted","",{duration:3000});
          this.questions=this.questions.filter((q)=>{
            q.quesId!=qid
          })
       },
       (error)=>{
         this._snack.open("Server error in deleting quiz","",{duration:3000})

       }

    )
  }

}
