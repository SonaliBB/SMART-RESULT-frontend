import { Component } from '@angular/core';
import { ViewMarksService } from '../Service/view-marks.service';
import { Mark } from '../models/models/mark';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-marks',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './view-marks.component.html',
  styleUrl: './view-marks.component.css'
})
export class ViewMarksComponent {
  student: any = null;        // Store fetched student data
  successMessage: string = '';  // Success message to display
  errorMessage: string = '';    // Error message to display

  constructor(
    private viewMarkService: ViewMarksService,
    private route: ActivatedRoute  // To capture the student ID from URL
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id'); // Get student ID from URL
    if (studentId) {
      this.viewMarkService.getStudentById(Number(studentId)).subscribe(
        (data) => {
          this.student = data;  // Populate student data
          this.successMessage = "Student data fetched successfully!";
          this.errorMessage = '';  // Reset error message
        },
        (error) => {
          this.errorMessage = 'Student not found! Please check the ID.';
          this.successMessage = '';  // Reset success message
          this.student = null;
        }
      );
    }
  }
}