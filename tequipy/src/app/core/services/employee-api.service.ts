import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environment/environment';
import {EmployeeData, OffboardForm} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: string): Observable<EmployeeData> {
    return this.http.get<EmployeeData>(`${this.apiUrl}/employees/${id}`);
  }

  offboardEmployee(id: string, data: OffboardForm): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/employees/${id}/offboard`, data);
  }
}
