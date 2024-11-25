import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfdownloadserviceService {
 
  private baseUrl = 'http://localhost:8091/api/pdf/getpdf/';

  constructor(private http: HttpClient) {}
  downloadPdf(studentId: number): Observable<Blob> {
    const apiUrl = `${this.baseUrl}${studentId}`;
    return this.http.get(apiUrl, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Accept', 'application/pdf'),
    });
  }
}
