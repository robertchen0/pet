import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  Pet: any;
  name: any;
  type: any;
  description: any;
  skill1: any;
  skill2: any;
  skill3: any;
  id: any;
  petid: any;
  like: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id'];
    });
    this.getPetFromService();
  }
  getPetFromService() {
    let Observable = this._httpService.getOnePet(this.id);
    Observable.subscribe(data => {
      console.log("Got our one pet", data);
      this.Pet = data['pet']
      this.petid = data['pet'][0]["_id"]
      this.name = data['pet'][0]['name']
      this.type = data['pet'][0]['type']
      this.description = data['pet'][0]['description']
      this.skill1 = data['pet'][0]['skill1']
      this.skill2 = data['pet'][0]['skill2']
      this.skill3= data['pet'][0]['skill3']
      this.like = data['pet'][0]['like']
    })
  }
  deletePet(id){
    let Observable = this._httpService.delete(id);
    Observable.subscribe(data => {
      console.log("Got our data", data);
    })
    this.goHome();

}

Like(id, pet) {
  let Observable = this._httpService.like(id, pet);
  console.log(id)
  Observable.subscribe(data => {
    console.log("Got our data", data);
    this.getPetFromService();
  })
}

UnLike(id, pet) {
  let Observable = this._httpService.unlike(id, pet);
  console.log(id)
  Observable.subscribe(data => {
    console.log("Got our data", data);
    this.getPetFromService();
  })
}
  goHome() {
    this.router.navigate(['']);
  }
}
