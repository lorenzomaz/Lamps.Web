import { Injectable } from '@angular/core';
import { Lamp } from './lamp';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LampService {

  constructor(
    private http: HttpClient
  ) { }

  getLamp():Observable<Lamp[]>{
    return this.http.get<Lamp[]>(`${environment.baseApiUrl}/Lamp`);
  }

  getAllLamp():Observable<Lamp[]>{
    return this.http.get<Lamp[]>(`${environment.baseApiUrl}/Lamp/list`);
  }
}
