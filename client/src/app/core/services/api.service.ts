import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  payouts(data:Record[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/payouts`, { expenses: data });
  }
}
