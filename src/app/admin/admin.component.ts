import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  CommentArray: any[] = []
  isResultLoaded = false;
  isUpdateFormActive = false;

  naslov: String = ""
  tekst: String = ""

  commentId = ""

  constructor(private http: HttpClient) {
    this.getAllCustomer();
  }

  getAllCustomer() {

    this.http.get("http://localhost:8080/getAllComments")

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CommentArray = resultData;
      });
  }


  register() {

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
  setUpdate(data: any) {
    this.naslov = data.naslov;
    this.tekst = data.tekst;
    this.commentId = data.commentId
  }
  UpdateRecords() {
    let bodyData = {
      "commentId": this.commentId,
      "naslov": this.naslov,
      "tekst": this.tekst,
    };

    this.http.put("http://localhost:8080/update", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Promenili ste sadrzaj komentara")
      this.getAllCustomer();
      this.naslov = '';
      this.tekst = '';
    });
  }
  save() {
    if (this.commentId == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }
  }
  setDelete(data: any) {
    this.http.delete("http://localhost:8080/delete" + "/" + data.commentId, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Izbrisali ste komentar")
      this.getAllCustomer();

      this.naslov = '';
      this.tekst = '';
    });
  }

}
