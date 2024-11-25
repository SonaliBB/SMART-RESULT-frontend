import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excel-download',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './excel-download.component.html',
  styleUrls: ['./excel-download.component.css']
})
export class ExcelDownloadComponent {
  studentId: string = '';  // Store the student ID input from the user
 
  constructor(private studentService: StudentService,private router:Router) {}

  downloadExcel() {
    this.studentService.downloadExcel().subscribe({
      next: (data: Blob) => {
        console.log("Excel download initiated.");
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'students.xlsx';  // Set the default name for the downloaded file
        link.click();
        window.URL.revokeObjectURL(downloadUrl);  // Clean up the URL after download
      },
      error: (err) => console.error("Error downloading Excel:", err)
    });
  }
}

