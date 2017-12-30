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
  public userPassword;
  public userID:number;
  public userToken;
  public tasks=[];  
  
  public clickStatus='exis';
  public errorMessage;

  constructor(private dataService:DataService, private router:Router) { }
  
  ngOnInit() {
    
  }

  public create(){
    this.dataService.createUser(this.username,this.userPassword).subscribe((response)=>{
      this.submit();
    }, (err) => {
      console.log(err.status);
      if(err.status == 404){
        this.errorMessage = "Username already exists";
      }if(err.status == 400){
        this.errorMessage = "No username entered";
      }
    },);
  }

  public clicked(status:string)
  {
    this.clickStatus=status;
  }

  public submit(){
    this.dataService.login(this.username,this.userPassword).subscribe((response)=>{
      if(response['status']==true){
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
        },
      );}
    }, (err) => {
      console.log(err.status);
      if(err.status == 404){
        this.errorMessage = "Wrong username or password";
      }
    });

  }

  

}
