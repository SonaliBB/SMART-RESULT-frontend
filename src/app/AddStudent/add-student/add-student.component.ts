import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../models/models/student';
import { AddStudentService } from '../../Service/add-student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  studentForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private addStudentService: AddStudentService) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      seatNo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      college: ['', Validators.required],
      course: ['', Validators.required],
      center: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      permRegNo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      motherName: ['', Validators.required],
      marklist: this.fb.array([this.createMarkFormGroup()])
    });
  }

  get marks(): FormArray {
    return this.studentForm.get('marklist') as FormArray;
  }

  createMarkFormGroup(): FormGroup {
    return this.fb.group({
      subjectName: ['', Validators.required],
      internalMarks: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      externalMarks: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      totalMarks: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  addMark(): void {
    this.marks.push(this.createMarkFormGroup());
  }

  removeMark(index: number): void {
    this.marks.removeAt(index);
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData: Student = this.studentForm.value;
      this.addStudentService.addStudent(studentData).subscribe({
        next: () => {
          this.successMessage = 'Student and marks added successfully!';
          this.errorMessage = null;
          this.studentForm.reset();
          this.marks.clear();
          this.marks.push(this.createMarkFormGroup());
        },
        error: (err) => {
          this.errorMessage = 'Failed to add student. Please try again.';
          this.successMessage = null;
          console.error('Error:', err);
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly before submitting.';
      this.successMessage = null;
    }
  }
}
