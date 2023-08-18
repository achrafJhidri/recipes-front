import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  errorMsg : string ; 

  constructor(private http : HttpClient,private authService : AuthService){

  }


  onSubmit(form : NgForm){
    const role = form.value.role;
    this.http.post("http://localhost:8080/addrole/"+form.value.email,[role])
    .subscribe((response)=> {
       console.log(response)
    });
    
}
  isValidForm(form : NgForm){
    const isHimSelf = this.authService.authenticatedUser.value.email === form.value.email
    return form.valid && !isHimSelf
  }
}
