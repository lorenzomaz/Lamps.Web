import { Injectable } from '@angular/core';
import { Lamp } from './lamp';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableParameters } from './table-parameters';
import { PagedResponse } from './PagedResponse';

@Injectable({
  providedIn: 'root'
})
export class LampService {

  constructor(
    private http: HttpClient
  ) { }

  // getLamp():Observable<Lamp[]>{
  //   return this.http.get<Lamp[]>(`${environment.baseApiUrl}/Lamp`);
  // }

  getAllLamp(params: TableParameters): Observable<PagedResponse<Lamp>> {
    let parameters = new HttpParams({
      fromObject: {
        'index': params.index,
        'size': params.size
      }
    });

    if (params.search) {
      parameters = parameters.set('search', params.search);
    }

    if (params.sorDir && params.sortBy) {
      parameters = parameters.set('sortBy', params.sortBy);
      parameters = parameters.set('sortDir', params.sorDir);
    }

    return this.http.get<PagedResponse<Lamp>>(`${environment.baseApiUrl}/Lamp/list`, { params: parameters });
  }

  addLamp(lamp: Lamp): Observable<Lamp[]> {
    return this.http.post<Lamp[]>(`${environment.baseApiUrl}/Lamp`, lamp);
  }

  addLamps(lamps: Lamp[]): Observable<Lamp[]> {
    return this.http.post<Lamp[]>(`${environment.baseApiUrl}/Lamp/list`, lamps);
  }

  removeLamp(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.baseApiUrl}/Lamp/${id}`)
  }

  removeAll(lamps: Lamp[]): Observable<number> {
    return this.http.request<number>('delete', `${environment.baseApiUrl}/Lamp/list`, { body: lamps })
  }

}
