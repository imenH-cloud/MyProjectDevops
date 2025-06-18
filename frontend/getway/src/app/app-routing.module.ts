import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)} ,
{path:'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)} ,
{path:'parent', loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule)},
{path:'classroom', loadChildren: () => import('./classroom/classroom.module').then(m => m.ClassroomModule)},
{path:'activity', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)},

{path:'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
