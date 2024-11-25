import { provideRouter, RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './StudentComponent/student-list/student-list.component';
import { ExcelImportComponent } from './ExcelImport/excel-import/excel-import.component';
import { AddStudentComponent } from './AddStudent/add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { ViewStudentComponent } from './ViewStudent/view-student/view-student.component';
import { DownloadpdffileComponent } from './downloadpdffile/downloadpdffile.component';
import { ViewMarksComponent } from './view-marks/view-marks.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path:' ', redirectTo:' '},
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path:'krios' ,component:StudentListComponent},
  { path: 'student-list', component: StudentListComponent ,canActivate: [authGuard] },
  { path: 'add-student', component: AddStudentComponent ,canActivate: [authGuard]},
  {path:'view-student',component:ViewStudentComponent,canActivate: [authGuard]},
  { path: 'update-student/:id', component: UpdateStudentComponent },
  { path: 'delete-student', component: DeleteStudentComponent},
  { path: 'view-marks/:id', component: ViewMarksComponent },
  { path: 'pdf-download', component: DownloadpdffileComponent } ,
  { path: 'upload-excel', component:ExcelImportComponent,canActivate: [authGuard]}
 ];

export const appRouting = provideRouter(routes);
