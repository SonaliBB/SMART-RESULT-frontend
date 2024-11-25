import { Component } from '@angular/core';
import { DeleteStudentService } from '../Service/delete-student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delete-student',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './delete-student.component.html',
  styleUrl: './delete-student.component.css'
})
export class DeleteStudentComponent {
  studentId!: number;
  message: string = '';

  constructor(private deleteStudentService: DeleteStudentService) {}

  onDelete(): void {
    this.deleteStudentService.deleteStudent(this.studentId).subscribe({
      next: (response: string) => {
        this.message = response; // Backend success message
        alert('Student deleted successfully!');
      },
      error: (error: any) => {
        console.error(error);
        this.message = 'Failed to delete student. Student not found.';
        alert('Failed to delete student!');
      }
    });
  }
}
