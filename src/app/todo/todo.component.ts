import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  userID:number;
  userToken = localStorage.getItem('userToken');

  tasks = [];
  newTaskName='';

  editMode=false;
  cetIndex:number;
  ceTask:string;
  
  newTaskDeadline:string;
  newStartTime:string;

  errorMessage;

  constructor(private dataService:DataService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.userID = this.route.snapshot.params['userid'];
    console.log(this.route.snapshot.params['userid']);
    this.getUserTasks(this.userID);
    console.log(this.userToken);
  }

  public delete(taskid)
  {
    this.dataService.deleteUsertask(this.userID,taskid,this.userToken).subscribe((response)=>{
      this.tasks = response;
      this.getUserTasks(this.userID);      
    });  }

  public editsubmit(cetask,index)
  {
    
    if(this.editMode==false){
    this.editMode=true;}
    else{this.editMode=false;}
    
    this.cetIndex=index;
    this.ceTask=cetask;
  }

  public updatetask(tasktitle,taskid)
  {
    if(this.editMode==false){
      this.editMode=true;}
      else{this.editMode=false;}

    this.dataService.updateUsertask(taskid,tasktitle,this.userID,this.userToken).subscribe((response)=>{
      console.log(response);
      this.getUserTasks(this.userID);      
    });  
  }

  public submit()
  {
    this.dataService.postUsertask(this.userID,this.newTaskName,
                                this.newTaskDeadline,this.newStartTime,this.userToken
      ).subscribe((response)=>{
      console.log(response);
      this.getUserTasks(this.userID);
    });
    
  }

  public getUserTasks(userId)
  {
    this.dataService.getUserTasks(userId,this.userToken).subscribe((response)=>{
      this.tasks = response;
    }, (err) => {
      console.log(err.status);
      if(err.status == 401){
        this.errorMessage = "You are not authorized to view tasks for this user.";}
    },);
  }

  public exitTodo(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }
 

}
