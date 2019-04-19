import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets = [];
  constructor(private _httpService: HttpService){
  }

  ngOnInit() {
    this.getPetsFromService();
    }
    getPetsFromService(){
      let Observable = this._httpService.getPets();
      Observable.subscribe(data => {
        console.log("Got our data", data);
        this.pets = data['pet']
      })
    }
    deletePet(id){
      let Observable = this._httpService.delete(id);
      Observable.subscribe(data => {
        console.log("Got our data", data);
      })
      this.getPetsFromService();
  }
}
