import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;
  message: any;
  constructor(private _httpService: HttpService,
    private router: Router) {

  }

  ngOnInit() {
    this.newPet = { name: "", type: "", description: ""  }
    this.message = null;
  }

  onSubmit() {
    this.message = null;
    let Observable = this._httpService.addPet(this.newPet);
    Observable.subscribe(data => {
      console.log("Got data from Post", data)
      if (data['error'] != null) {
        this.message = data['error']['errors']
      }
      else {
        this.newPet = { name: "", type: "", description: "" }
        this.goHome()
      }
    })
  }
  goHome() {
    this.router.navigate(['']);
  }
}
