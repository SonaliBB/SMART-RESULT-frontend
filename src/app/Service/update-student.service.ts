import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/models/student';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateStudentService {
   private baseUrl='http://localhost:8091/api/students';
   private apiUrl='http://localhost:8091/api/students/getStudentById';
  constructor(private http:HttpClient) { }

//   updateStudent(student: Student): Observable<any> {
//     const url = `${this.baseUrl}?id=${student.id}`; 
//     return this.http.put(url, student).pipe(
//       catchError((error) => {
//         console.error('Update failed', error);
//         return throwError(error);
//   })
// );
// }

 // Fetch student by ID
 getStudentById(id: number): Observable<Student> {
  return this.http.get<Student>(`${this.apiUrl}/${id}`);
}

// Update student with marks
updateStudent(student: Student): Observable<Student> {
  return this.http.put<Student>(`${this.baseUrl}/${student.id}`, student);
}

}
