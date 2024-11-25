import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadExcelService {
  private url = `http://localhost:8091/api/excel`; // Verify that this URL matches the backend endpoint

  constructor(private http:HttpClient) { }
  downloadExcel(): Observable<Blob> {
   
    return this.http.get(this.url, {
        responseType: 'blob', 
        headers: new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    });
}
}
