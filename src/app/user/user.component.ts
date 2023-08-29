import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {


  naslov: String = ""
  tekst: String = ""

  constructor(private http: HttpClient) { }


  save() {

    let bodyData = {
      "naslov": this.naslov,
      "tekst": this.tekst
    };


    this.http.post("http://localhost:8080/add", bodyData, { responseType: 'text' }).subscribe((resultData) => {
      console.log('success')
      alert("Uspesno ste poslali komentar");
      this.naslov = '';
      this.tekst = '';
    }
    )
  }

}
