import { Component } from '@angular/core';
import { ViewStudentService } from '../../Service/view-student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  studentId: number | null = null; // Input value for student ID
  student: any = null; // Store fetched student data
  successMessage: string = ''; // Success message to display
  errorMessage: string = ''; // Error message to display

  constructor(private viewStudentService: ViewStudentService) {}

  onViewStudent(): void {
    if (this.studentId) {
      this.viewStudentService.getStudentById(this.studentId).subscribe(
        (data) => {
          this.student = data; // Populate student data
          this.successMessage = 'Student data fetched successfully!';
          this.errorMessage = ''; // Reset error message
          this.hideSuccessMessageAfterDelay(); // Hide success message after delay
        },
        (error) => {
          this.errorMessage = 'Student not found! Please check the ID.';
          this.successMessage = ''; // Reset success message
          this.student = null;
        }
      );
    } else {
      this.errorMessage = 'Please enter a student ID.';
      this.successMessage = '';
    }
  }

  // Method to hide the success message after 2 seconds
  private hideSuccessMessageAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = '';
    }, 2000); // 2 seconds delay
  }
}
