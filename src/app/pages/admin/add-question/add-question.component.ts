import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qid:any;
  title:any;
  question={
    quiz:{
      qid: '',
      title: " ",

    },
    content:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:""
  };
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qid=this._route.snapshot.params.qid;
    this.title=this._route.snapshot.params.title;
    this.question.quiz.qid=this.qid;
    this.question.quiz.title=this.title;
    
  }
  public formSubmit(){
    if(this.question.content.trim()==''||this.question.content==null)
    {
      alert("Question Content is required")
    }
    if(this.question.option1.trim()==''||this.question.option1==null)
    {
      alert("options cannot be null")
    }
    if(this.question.option2.trim()==''||this.question.option2==null)
    {
      alert("options cannot be null")
    }
   
  
   
    //form submit
    this._question.addQuestion(this.question).subscribe((data:any)=>{
      this._snack.open("Quiz Added Successfully","",{duration:3000})
      this.question.content="";
      this.question.option1="";
      this.question.option2="";
      this.question.option3="";
      this.question.option4="";
      this.question.answer="";
      
    },
    (error)=>{
      this._snack.open("Server Error!!","",{duration:3000})

    }    );
    

  }

}
