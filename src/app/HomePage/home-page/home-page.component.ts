import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../Service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,FormsModule,FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  username: string = '';
  password: string = '';

  // showLoginSuccessPopup: boolean = false;
  // showLoginFailPopup: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router) {}

  
  login() {
    if (this.authService.authenticate(this.username, this.password)) {
      this.router.navigate(['/student-list']);
    } else {
      alert('Invalid username or password.');
    }
  }
  
  
  // showPopup(type: string) {
  //   if (type === 'success') {
  //     this.showLoginSuccessPopup = true;
  //     setTimeout(() => {
  //       this.showLoginSuccessPopup = false;
  //       this.router.navigate(['/student-list']);
  //     }, 2000); // Display for 2 seconds
  //   } 
  //   else if (type === 'failed') {
  //     this.showLoginFailPopup = true;
  //     setTimeout(() => {
  //       this.showLoginFailPopup = false;
  //     }, 2000); // Display for 2 seconds
  //     alert('Invalid username or password.');
  //   }
  // }
}
