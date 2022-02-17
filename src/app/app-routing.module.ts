import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { PagesComponent } from './pages/admin/pages/pages.component';
import { MediaComponent } from './pages/admin/media/media.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { AuthGuard } from './guards/auth.guard';
import { CreatePageComponent } from './pages/admin/pages/create-page/create-page.component';
import { EditPageComponent } from './pages/admin/pages/edit-page/edit-page.component';
import { CreatePostComponent } from './pages/admin/posts/create-post/create-post.component';
import { EditPostComponent } from './pages/admin/posts/edit-post/edit-post.component';
import { ComponentsComponent } from './pages/admin/components/components.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/pages', component: PagesComponent },
  { path: 'admin/media', component: MediaComponent },
  { path: 'admin/posts', component: PostsComponent },
  { path: 'admin/posts/create-post', component: CreatePostComponent },
  { path: 'admin/posts/edit/:id', component: EditPostComponent },
  { path: 'admin/pages/create-page', component: CreatePageComponent },
  { path: 'admin/pages/edit/:id', component: EditPageComponent },
  { path: 'admin/components', component: ComponentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
