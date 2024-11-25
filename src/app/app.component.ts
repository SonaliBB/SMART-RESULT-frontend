import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StudentService } from './Service/student.service';
import { Router } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AuthServiceService } from './Service/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,FormsModule,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  studentId!:number;
  constructor(private http:HttpClient,private studentService:StudentService,private router: Router,public authService:AuthServiceService){

  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  downloadExcel() {
    this.studentService.downloadExcel().subscribe({
      next: (data: Blob) => {
        console.log("Excel download initiated.");
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'students.xlsx';  
        link.click();
        window.URL.revokeObjectURL(downloadUrl);  
      },
      error: (err) => console.error("Error downloading Excel:", err)
    });
  }

}