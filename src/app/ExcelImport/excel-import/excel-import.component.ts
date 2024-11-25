import { Component } from '@angular/core';
import { ExcelImportService } from '../../Service/excel-import.service';

@Component({
  selector: 'app-excel-import',
  standalone: true,
  imports: [],
  templateUrl: './excel-import.component.html',
  styleUrl: './excel-import.component.css'
})
export class ExcelImportComponent {
  selectedFile: File | null = null;
  uploadMessage: string = '';

  constructor(private excelImportService: ExcelImportService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first!';
      return;
    }

    this.excelImportService.uploadExcelFile(this.selectedFile).subscribe(
      (response) => {
        this.uploadMessage = 'File uploaded successfully!';
      },
      (error) => {
        this.uploadMessage = 'Error uploading file: ' + error.message;
      }
    );
  }
}
