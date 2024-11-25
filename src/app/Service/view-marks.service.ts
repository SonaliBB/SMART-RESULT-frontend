import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from '../models/models/mark';
import { Student } from '../models/models/student';

@Injectable({
  providedIn: 'root'
})
export class ViewMarksService {

  private baseUrl = 'http://localhost:8091/api/students';

  constructor(private http: HttpClient) {}

  getStudentById(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getStudentById/${studentId}`);
  }

}
