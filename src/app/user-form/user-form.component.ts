import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  data = {};
  public username = '';
  public userID:number;
  public tasks=[];  
  public clickStatus:string='exis';
  constructor(private dataService:DataService, private router:Router) { }
  
  ngOnInit() {
 
    
  }

  public create(){
    this.dataService.createUser(this.username).subscribe((response)=>{
      this.submit();
    });
  }

  public clicked(status:string)
  {
    this.clickStatus=status;
  }

  public submit(){
    this.dataService.getUserid(this.username).subscribe((response)=>{
      this.userID = response;
      this.userID =this.userID[0].id;
      this.router.navigate(['/todo',this.userID]);
    });
    
  }

  

}
