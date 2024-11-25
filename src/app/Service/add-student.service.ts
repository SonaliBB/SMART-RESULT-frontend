import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/models/student';

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {
private baseUrl='http://localhost:8091/api/students'

  constructor(private http:HttpClient) { }

  addStudent(student: Student) {
    return this.http.post(`${this.baseUrl}/addsingle`, student);
  }
  
  
}
