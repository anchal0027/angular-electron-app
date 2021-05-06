import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) { }
  register(body): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}/Registration`, body);
  
}
login(email,password): Observable<any>{
  return this.httpClient.get(`${environment.apiBaseUrl}/GetLoginDetails/${email}/${password}`);
}
}
