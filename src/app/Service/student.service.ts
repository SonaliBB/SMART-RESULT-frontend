
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/models/student';
import { Mark } from '../models/models/mark';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8091/api/students'; // Backend API URL
  private pdfUrl = 'http://localhost:8091/api/pdf';
  private deleteUrl = 'http://localhost:8091/api/students/delete';

  constructor(private http: HttpClient) { }

  // Method to get all students without pagination
  // getAllStudents(): Observable<Student[]> {
  //   return this.http.get<Student[]>(`${this.apiUrl}/all`);
  // }
  getAllStudents(page: number, size: number): Observable<Student[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Student[]>(`${this.apiUrl}/all`, { params });
  }

  getStudentBySeatNo(seatNo: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/seatNo/${seatNo}`);
  }

  // You could also add a method to get total count (for pagination)
  getStudentsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // getPaginatedStudents(pageIndex: number, pageSize: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/paginated?page=${pageIndex}&size=${pageSize}`);
  // }

  // Method to add students
  addStudents(students: Student[], page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.post(`${this.apiUrl}/add`, students, { params });        
  }
  
  downloadPdf(studentId: number): Observable<Blob> {
    const url = `${this.pdfUrl}/getpdf/${studentId}`;
    const headers = new HttpHeaders({ 'Accept': 'application/pdf' });
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }

  downloadExcel(): Observable<Blob> {
    const url = `http://localhost:8091/api/excel`; // Verify that this URL matches the backend endpoint
    return this.http.get(url, {
        responseType: 'blob', 
        headers: new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    });
}

}
