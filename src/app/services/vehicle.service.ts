import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.dev';
import { catchError, map } from 'rxjs/operators';
import { ErroHandler } from '../classes/error-handler';
import { Observable } from 'rxjs';
import { NewVehicleModelDTO } from '../classes/newVehicleModelDTO';
import { VehicleModelDTO } from '../classes/vehicleModelDTO';


const urlVehicle = environment.apiVehicle;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
}


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }


  public getAllVehicle() {
    return this.http.get<any>(urlVehicle).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(ErroHandler.handleError)
    );
  }

  public getVehiclePaginator(pageNumber = 0, pageSize = 10, sortOrder = 'asc', filter = ''): Observable<any> {

    const parameters = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString())
    .set('sortOrder', sortOrder)
    .set('filter', filter);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      params: parameters,
    }

    return this.http.get<any>(urlVehicle, options);
  }

  public getVehicleByStatus(status: string): Observable<any> {

    const parameters = new HttpParams().set('status', status);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      params: parameters,
    }

    return this.http.get<any>(urlVehicle, options);
  }

  public getVehicleByPlate(plate: string): Observable<any> {

    const parameters = new HttpParams().append('plate', plate);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      params: parameters,
    }

    return this.http.get<any>(urlVehicle, options);
  }


  public saveVehicle(data: NewVehicleModelDTO): Observable<any>{
    return this.http.post<any>(urlVehicle, data, httpOptions);
  }
  
  public deleteVehicle(data: VehicleModelDTO): Observable<any>{
    const httpOptionsWithBody = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    
      }),
      body: { data }
    };
        return this.http.delete<any>(urlVehicle, httpOptionsWithBody);
  }

  public updateVehicle(data: NewVehicleModelDTO): Observable<any>{
    return this.http.put<any>(urlVehicle, data, httpOptions);
  }



}
