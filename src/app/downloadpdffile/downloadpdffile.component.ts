import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { PdfdownloadserviceService } from '../Service/pdfdownloadservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-downloadpdffile',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './downloadpdffile.component.html',
  styleUrl: './downloadpdffile.component.css'
})
export class DownloadpdffileComponent {

  studentId!: number;

  constructor(
    private pdfDownloadService: PdfdownloadserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
      if (this.studentId) {
        this.downloadPdf(); // Automatically download the PDF if ID is provided
      }
    });
  }

  downloadPdf() {
    if (!this.studentId) {
      console.log('Student ID is required.');
      return;
    }

    this.pdfDownloadService.downloadPdf(this.studentId).subscribe({
      next: (data: Blob) => {
        console.log('PDF download initiated for student ID:', this.studentId);
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `student_${this.studentId}_report.pdf`;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (err) => console.error('Error downloading PDF:', err),
    });
  }
}