import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelImportService {
  private baseUrl = 'http://localhost:8091/importexcel'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  uploadExcelFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.baseUrl, formData, { responseType: 'text' });
  }
}
