import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { PagesComponent } from './pages/admin/pages/pages.component';
import { MediaComponent } from './pages/admin/media/media.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { AuthGuard } from './guards/auth.guard';
import { CreatePageComponent } from './pages/admin/pages/create-page/create-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/pages', component: PagesComponent },
  { path: 'admin/media', component: MediaComponent },
  { path: 'admin/posts', component: PostsComponent },
  { path: 'admin/pages/create-page', component: CreatePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
