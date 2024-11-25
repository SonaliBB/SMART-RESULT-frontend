import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStudentService {

  private apiUrl = 'http://localhost:8091/api/students';  // Your backend URL

  constructor(private http: HttpClient) {}

  getStudentById(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getStudentById/${studentId}`);
  }
}
