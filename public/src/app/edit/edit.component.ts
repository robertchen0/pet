import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editPet: any;
  Pet: any;
  name: any;
  type: any;
  description: any;
  skill1: any;
  skill2: any;
  skill3: any;
  id: any;
  message: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id'];
    });
    this.editPet = { name: "", type: "", description: ""}
    this.message = null;
    this.getPetFromService();
  }
  getPetFromService() {
    let Observable = this._httpService.getOnePet(this.id);
    Observable.subscribe(data => {
      console.log("Got our one pet", data);
      this.Pet = data['pet']
      this.name = data['pet'][0]['name']
      this.type = data['pet'][0]['type']
      this.description = data['pet'][0]['description']
      this.skill1 = data['pet'][0]['skill1']
      this.skill2 = data['pet'][0]['skill2']
      this.skill3= data['pet'][0]['skill3']
      this.editPet.name = data['pet'][0]['name']
      this.editPet.type = data['pet'][0]['type']
      this.editPet.description = data['pet'][0]['description']
      this.editPet.skill1 = data['pet'][0]['skill1']
      this.editPet.skill2 = data['pet'][0]['skill2']
      this.editPet.skill3 = data['pet'][0]['skill3']
    })
  }
  EditPet() {
    let Observable = this._httpService.edit(this.id, this.editPet);
    Observable.subscribe(data => {
      console.log("Edited pet", data)
      if (data['error'] != null) {
        this.message = data['error']['errors'];
      }
      else {
        this.goHome()
      }
    })

  }
  goHome() {
    this.router.navigate(['details',this.id]);
  }
}
