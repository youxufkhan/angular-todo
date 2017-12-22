import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  userID:number;
  tasks = [];
  newTaskName='';
  editMode=false;
  cetIndex:number;
  ceTask:string;
  newTaskDeadline:string;
  


  constructor(private dataService:DataService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.userID = this.route.snapshot.params['userid'];
    this.getUserTasks(this.userID);
  }

  public delete(taskid)
  {
    this.dataService.deleteUsertask(taskid).subscribe((response)=>{
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

    this.dataService.updateUsertask(taskid,tasktitle).subscribe((response)=>{
      console.log(response);
      this.getUserTasks(this.userID);      
    });  
  }

  public submit()
  {
    this.dataService.postUsertask(this.userID,this.newTaskName,this.newTaskDeadline).subscribe((response)=>{
      console.log(response);
      this.getUserTasks(this.userID);
    });
    
  }

  public getUserTasks(userId)
  {
    this.dataService.getUserTasks(userId).subscribe((response)=>{
      this.tasks = response;
    });
  }




}
