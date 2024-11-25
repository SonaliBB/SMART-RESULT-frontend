import { Component } from '@angular/core';
import { Student } from '../models/models/student';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateStudentService } from '../Service/update-student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {
  updateForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  studentId!: number;

  constructor(private fb: FormBuilder,
     private updateStudentService: UpdateStudentService, 
     private route: ActivatedRoute,
      private router: Router) {
  }

  ngOnInit(): void {
    // Get student ID from route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = +id;
    } else {
      this.errorMessage = 'Invalid student ID';
      return;
    }

    this.initializeForm();

    // Fetch student details and populate form
    this.updateStudentService.getStudentById(this.studentId).subscribe({
      next: (student) => this.populateForm(student),
      error: (err) => {
        console.error('Error fetching student', err);
        this.errorMessage = 'Failed to fetch student details.';
      },
    });
  }

  // Initialize form
  initializeForm(): void {
    this.updateForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      seatNo: ['', Validators.required],
      college: ['', Validators.required],
      course: ['', Validators.required],
      center: ['', Validators.required],
      permRegNo: ['', Validators.required],
      motherName: ['', Validators.required],
      marklist: this.fb.array([]),
    });
  }

  // Populate form with student data
  populateForm(student: Student): void {
    this.updateForm.patchValue(student);
    const marksArray = this.updateForm.get('marklist') as FormArray;
    student.marklist.forEach((mark) => {
      marksArray.push(
        this.fb.group({
          subjectName: [mark.subjectName, Validators.required],
          internalMarks: [mark.internalMarks, Validators.required],
          externalMarks: [mark.externalMarks, Validators.required],
          totalMarks: [mark.totalMarks, Validators.required],
        })
      );
    });
  }

  // Add a new mark field
  addMark(): void {
    const marksArray = this.updateForm.get('marklist') as FormArray;
    marksArray.push(
      this.fb.group({
        subjectName: ['', Validators.required],
        internalMarks: ['', Validators.required],
        externalMarks: ['', Validators.required],
        totalMarks: ['', Validators.required],
      })
    );
  }

  // Remove a mark field
  removeMark(index: number): void {
    const marksArray = this.updateForm.get('marklist') as FormArray;
    marksArray.removeAt(index);
  }

  // Submit updated form
  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedStudent: Student = {
        ...this.updateForm.getRawValue(),
        id: this.studentId, // Ensure ID is included
      };

      this.updateStudentService.updateStudent(updatedStudent).subscribe({
        next: () => {
          alert('Student updated successfully!');
          this.router.navigate(['/student-list']);
        },
        error: (err) => {
          console.error('Update failed', err);
          alert('An error occurred while updating the student.');
        },
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // Helper to get FormArray controls
  get marksControls() {
    return (this.updateForm.get('marklist') as FormArray).controls;
  }
}
