import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms'
import { Employee } from '../employee';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
    formValue!:FormGroup
    employeeData!:any;
    employeeModel:Employee=new Employee();
    showAdd!:boolean;
    showUpdate!:boolean;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getAllEmployee();
  }
clickAddEmployee(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate=false;

}

  postEmployeeDetails(){
    this.employeeModel.firstName=this.formValue.value.firstName;
    this.employeeModel.lastName=this.formValue.value.lastName;
    this.employeeModel.email=this.formValue.value.email;
    this.employeeModel.mobile=this.formValue.value.mobile;
    this.employeeModel.salary=this.formValue.value.salary;


    this.api.postEmployee(this.employeeModel).subscribe(res=>{
      console.log(res);
      alert("Employee Added SuccessFully")
      let ref=document.getElementById("cancle");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();

    },err=>{
      alert("Not Added")
    })
  }


  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData=res;
    })
  }

  deleteEmployeeData(data:any){
    this.api.deleteEmployee(data.id).subscribe(res=>{
      alert("Employee Deleted Successfully");
      this.getAllEmployee();
    })
  }


  onEdit(data:any){
    this.showAdd=false;
  this.showUpdate=true;
    this.employeeModel.id=data.id;
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['salary'].setValue(data.salary);
  }

  updateEmployeeDetails(){
    this.employeeModel.firstName=this.formValue.value.firstName;
    this.employeeModel.lastName=this.formValue.value.lastName;
    this.employeeModel.email=this.formValue.value.email;
    this.employeeModel.mobile=this.formValue.value.mobile;
    this.employeeModel.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModel,this.employeeModel.id).subscribe(res=>{
      alert("Updated Successfully");
      let ref=document.getElementById("cancle");
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
