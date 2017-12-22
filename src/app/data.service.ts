import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  options:RequestOptions;
  headers: Headers;
  constructor(public http:Http) { 
    console.log('data service connected'); 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
  }

  createUser(userName)
  {
    let body = { username:userName};
    return this.http.post("http://localhost/ci-abc/api/create_user",body,this.options)
    .map(res => res.json());

  }

  getUserid(username)
  {
    let myParams = new URLSearchParams(); 
    myParams.append('username', username);
    return this.http.get("http://localhost/ci-abc/api/get_userid?"+myParams.toString())
    .map(res=>res.json());
  }

  updateUsertask(tasktitle,taskId)
  {
    let body = {
      taskid:taskId, taskname:tasktitle
    }
    console.log(body);
    return this.http.put("http://localhost/ci-abc/api/update_task",body)
    .map(res => res.json());
  }

  postUsertask(Userid,TaskName,Deadline)
  {
   
    let body = {userid:Userid,taskname:TaskName,deadline:Deadline};    
    console.log(body);
    return this.http.post("http://localhost/ci-abc/api/add_task",body,this.options)
    .map(res => res.json());

  }

  deleteUsertask(taskId)
  {
    return this.http.delete("http://localhost/ci-abc/api/del_task?taskid="+taskId)
    .map(res => res.json());
  }

  getUserTasks(userID)
  {
    let myParams = new URLSearchParams(); 
    myParams.append('userid', userID);
    return this.http.get("http://localhost/ci-abc/api/get_usertasks?"+myParams.toString())
    .map(res=>res.json());
  }
}
