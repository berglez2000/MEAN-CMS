import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './components/global/alert/alert.component';
import { SpinnerComponent } from './components/global/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/panel/sidebar/sidebar.component';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { PagesComponent } from './pages/admin/pages/pages.component';
import { MediaComponent } from './pages/admin/media/media.component';
import { PostsComponent } from './pages/admin/posts/posts.component';
import { PageItemComponent } from './components/global/cards/page-item/page-item.component';

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
    PageItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
