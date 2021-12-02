import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
qid:any;
questions:any;

marksGot=0;
correctAnswer=0;
attempted=0;

isSubmit=false;

timer:any;

  constructor(private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
    ) { }

  ngOnInit(): void {
    this.preventBackButton();
   this.qid= this._route.snapshot.params.qid
   this.loadQuestions();
  }
  loadQuestions(){
    this._question.getQuestionOfQuizForTest(this.qid).subscribe((data:any)=>{
      this.questions=data;
      this.timer=this.questions.length*2*60;
      this.questions.forEach((q:any)=>{
        q['givenAnswer']='';
      })
      alert("Quiz Started!!Best Of Luck")
      console.log(data)
      this.startTimer();
    },(error)=>{
      console.log(error)
      alert("Server Error Please wait!!!")

    })

  }
   preventBackButton(){
     history.pushState(null,"",location.href);
     this.locationSt.onPopState(()=>{history.pushState(null,"",location.href)})
   }
   submitQuiz(){
     alert("Submitquiz")
     //calculation
     this.isSubmit=true;
     this.questions.forEach((q:any)=>{
       if(q.givenAnswer==q.answer){
         this.correctAnswer++;
         let markssingle=this.questions[0].quiz.maxMarks/this.questions.length;
         this.marksGot+=markssingle;

       }
       if(q.givenAnswer.trim()!=""){
         this.attempted++;
       }

     })
    // alert("Correct Answer :"+this.correctAnswer +"Marks Got :"+this.marksGot+" Attempted "+this.attempted)
   }
   startTimer(){
    let t= window.setInterval(()=>{
       if(this.timer<=0){
         this.submitQuiz()
         clearInterval(t);
       }
       else{
         this.timer--;
       }
     },1000)
   }
   
   getFormattedTime(){
     let mm=Math.floor(this.timer/60)
     let ss=this.timer-mm*60;
     return `${mm} min : ${ss} Sec`;
   }
   print(){
     window.print();
   }
   
}
