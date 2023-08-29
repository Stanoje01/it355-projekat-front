import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userName: String = ""
  userFirstName: String = ""
  userLastName: String = ""
  userPassword: String = ""
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }



  register() {

    let bodyData = {
      "userName": this.userName,
      "userFirstName": this.userFirstName,
      "userLastName": this.userLastName,
      "userPassword": this.userPassword
    };
    console.log(bodyData)
    this.userService.register(bodyData).subscribe(
      response => {
        alert("Uspesno ste se registrovali!")
      },
      (error) => {
        console.log("Nije ti dobro majmune")

      })
  }

}
