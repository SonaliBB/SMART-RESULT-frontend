import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf-download',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css']
})
export class PdfDownloadComponent {
  studentId: string = '';  // Store the student ID input from the user
  private baseUrl = 'http://localhost:8091/api/pdf/getpdf/';   
  constructor(private http: HttpClient) {}
  downloadPdf() {
    if (!this.studentId) {
      console.log("Student ID is required.");  
      return;
    } 
    const apiUrl = `${this.baseUrl}${this.studentId}`;  // Construct URL based on student ID
    this.http.get(apiUrl, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Accept', 'application/pdf')
    }).subscribe({
      next: (data: Blob) => {
        console.log("PDF download initiated for student ID:", this.studentId);
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `student_${this.studentId}_report.pdf`;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (err) => console.error("Error downloading PDF:", err)
    });
  }
}
