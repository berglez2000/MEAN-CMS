import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { AlertComponent } from './components/global/alert/alert.component';
import { SpinnerComponent } from './components/global/spinner/spinner.component';
import { SidebarComponent } from './components/panel/sidebar/sidebar.component';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { PagesComponent } from './pages/admin/pages/pages.component';
import { MediaComponent } from './pages/admin/media/media.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { PageItemComponent } from './components/global/cards/page-item/page-item.component';
import { CreatePageComponent } from './pages/admin/pages/create-page/create-page.component';
import { EditPageComponent } from './pages/admin/pages/edit-page/edit-page.component';
import { ImagesComponent } from './components/panel/sections/images/images.component';
import { CreatePostComponent } from './pages/admin/posts/create-post/create-post.component';
import { ModalImagesComponent } from './components/modals/modal-images/modal-images.component';
import { PostItemComponent } from './pages/admin/posts/post-item/post-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MainComponent,
    LoginComponent,
    AlertComponent,
    SpinnerComponent,
    SidebarComponent,
    DashboardComponent,
    PagesComponent,
    MediaComponent,
    PostsComponent,
    PageItemComponent,
    CreatePageComponent,
    EditPageComponent,
    ImagesComponent,
    CreatePostComponent,
    ModalImagesComponent,
    PostItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
