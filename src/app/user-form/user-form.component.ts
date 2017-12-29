import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
 
  public username = '';
  public userID:number;
  public tasks=[];  
  public userToken;
  public clickStatus:string='exis';
  public errorMessage;

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
      this.userID = response['id'];
      this.userToken = response['token'];     
      localStorage.setItem('userToken', this.userToken);
      //this.userID =this.userID.id;
      this.router.navigate(['/todo',this.userID]);
    }, (err) => {
      console.log(err.status);
      if(err.status == 404){
        this.errorMessage = "Invalid username";
      }if(err.status == 400){
        this.errorMessage = "No username entered";
      }
    },);
    
  }

  

}
