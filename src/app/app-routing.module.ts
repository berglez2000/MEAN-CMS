import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { PagesComponent } from './pages/admin/pages/pages.component';
import { MediaComponent } from './pages/admin/media/media.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/pages', component: PagesComponent },
  { path: 'admin/media', component: MediaComponent },
  { path: 'admin/posts', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
