import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<any>{
    return this.http.get(this.apiUrl + 'tasks');
  }

  addTodoTask(body: any): Observable<any> {
    return this.http.post(this.apiUrl + 'tasks', body);
  }

  editTodoTask(body: any): Observable<any> {
    return this.http.put(this.apiUrl + 'tasks/' + body.id, body);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + 'tasks/' + id);
  }

  getCategories(): Observable<any>{
    return this.http.get(this.apiUrl + 'categories');
  }
}
