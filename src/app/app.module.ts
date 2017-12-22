import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { TodoComponent } from './todo/todo.component';

import { DataService } from './data.service';


const appRoutes: Routes = [
  { path: '', component: UserFormComponent },
  { path: 'todo/:userid',      component: TodoComponent  }
];


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,),
    DateTimePickerModule,
    BrowserAnimationsModule
      
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
