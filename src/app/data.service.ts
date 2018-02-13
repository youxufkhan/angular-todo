import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';



@Injectable()
export class DataService {
 
  options:RequestOptions;
  headers: Headers;
  constructor(public http:Http) { 
    console.log('data service connected'); 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
  }

  login(userName,passWord)
  {
    let body = {
      username:userName,
      password:passWord
    };
    return this.http.post("http://localhost/ci-abc/api/login_user",body)
    .map(res => res.json());
  }
  createUser(userName,passWord)
  {
    let body = { username:userName,
                  password:passWord
    };
    return this.http.post("http://localhost/ci-abc/api/create_user",body,this.options)
    .map(res => res.json());

  }

  getUserid(username)
  {
    let myParams = new URLSearchParams(); 
    myParams.append('username', username);
    return this.http.get("http://localhost/ci-abc/api/get_userid?"+myParams.toString())
    .map(res => res.json());
  }

  updateUsertask(tasktitle,taskId,userID,Token)
  {
    let headers = new Headers;
    headers.append('Authorization', Token);
    let body = {
      taskid:taskId, taskname:tasktitle, userid:userID
    }
    console.log(body);
    return this.http.put("http://localhost/ci-abc/api/update_task",body,{headers:headers})
    .map(res => res.json());
  }

  postUsertask(Userid,TaskName,Deadline,StartTime,Token)
  {
    let headers = new Headers;
    headers.append('Authorization', Token);
    let body = {
      userid:Userid,
      taskname:TaskName,
      deadline:new Date(Deadline).toISOString(),
      start_time:new Date(StartTime).toISOString()
    };    
    console.log(body);
    return this.http.post("http://localhost/ci-abc/api/add_task",body,{headers:headers})
    .map(res => res.json());

  }

  deleteUsertask(userid,taskId,Token)
  {
    let headers = new Headers();
    headers.append('Authorization', Token);
    return this.http.delete("http://localhost/ci-abc/api/del_task?taskid="+taskId+"&userid="+userid, {
      headers: headers
      })
    .map(res => res.json());
  }

  getUserTasks(userID,Token)
  {
    let myParams = new URLSearchParams(); 
    myParams.append('userid', userID);
    let headers = new Headers();
    headers.append('Authorization', Token);
    return this.http.get("http://localhost/ci-abc/api/get_usertasks?"+myParams.toString(), {
      headers: headers
      })
    .map(res=>{
      var response = res.json();
      response.forEach((task)=>{
        task.deadline = new Date(task.deadline+'Z').toLocaleString();
        task.created_at = new Date(task.created_at+'Z').toLocaleString();
        task.start_time = new Date(task.start_time+'Z').toLocaleString();

        let currenttime = new Date().getTime();
        let deadline = new Date(task.deadline).getTime();

        let result = deadline - currenttime;
        console.log(result);
        if(result<0)
        {
          console.log('task expired');
          task.taskClass="red-task";
        }
        else if(result<18000000)
        {
          task.taskClass="yellow-task";
        }

      });
      return response;
    });
  }
}
