import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postEmployee(data:any){
    return this.http.post("http://localhost:3000/employee",data).pipe(map(res=>{
      return res;
    }));
  }

  getEmployee(){
    return this.http.get("http://localhost:3000/employee").pipe(map(res=>{
      return res;
    }));
  }

  updateEmployee(data:any,id:number){
    return this.http.put("http://localhost:3000/employee/"+id,data).pipe(map(res=>{
      return res;
    }));
  }

  deleteEmployee(id:any){
    return this.http.delete("http://localhost:3000/employee/"+id).pipe(map(res=>{
      return res;
    }));
  }
}
