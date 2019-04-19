import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){
    this.getPets();
  }
  getPets(){
    return this._http.get('/pets')
  }
  getOnePet(id){
    return this._http.get('/pets/' + id)
  }
  addPet(newPet) {
    return this._http.post('/pets', newPet)
  }
  delete(id) {
    return this._http.delete('/delete/' + id)
  }
  edit(id, editPet) {
    return this._http.put('/edit/' + id, editPet)
  }
  like(id, pet) {
    return this._http.put('/petlike/'+ id, pet)
  }
  unlike(id, pet) {
    return this._http.put('/petunlike/'+ id, pet)
  }
}
