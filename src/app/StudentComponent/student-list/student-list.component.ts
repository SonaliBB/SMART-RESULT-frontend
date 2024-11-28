import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table'; // For mat-table
import { MatPaginatorModule } from '@angular/material/paginator'; // For mat-paginator
import { MatButtonModule } from '@angular/material/button'; // For mat-button
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Student } from '../../models/models/student';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-list',
  standalone:true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  length: number = 0; // Length for mat-paginator
  pageSize: number = 2; // Default page size
  pageIndex: number = 0; // Default page index
  selectedStudent!:Student;

  constructor(private studentService: StudentService,private router:Router) {}
  ngOnInit(): void {
    this.loadAllStudents();
  }

  loadAllStudents(): void {
    this.studentService.getAllStudents(this.pageIndex, this.pageSize).subscribe((data) => {
      this.students = data;
      this.length = data.length; // Set the total number of students
    });
  }

  // Handle page changes
  handlePageEvent(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Fetch new students based on the current page and size
    this.loadAllStudents();
  }

  view(student: Student): void {
    // Navigate to the update form or handle update logic
    this.router.navigate(['/view-marks', student.id]); // Example navigation
  }
  updateStudent(student: Student): void {
    // Navigate to the update form or handle update logic
    this.router.navigate(['/update-student', student.id]); // Example navigation
  }
  deleteStudent(student: Student): void {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.studentService.deleteStudent(student.id).subscribe(() => {
        alert('Student deleted successfully');
        this.loadAllStudents(); // Refresh the student list
      });
    }
  }
  navigateToDownloadPdf(studentId: number) {
    this.router.navigate(['/pdf-download'], { queryParams: { id: studentId } });
  }

}
