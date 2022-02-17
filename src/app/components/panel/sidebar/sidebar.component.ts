import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  faHome,
  faColumns,
  faImages,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { NavItem } from 'src/app/models/NavItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faHome = faHome;
  faColumns = faColumns;
  faImages = faImages;
  faFolderOpen = faFolderOpen;
  faConnectDevelop = faConnectdevelop;
  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/admin', icon: faHome },
    { label: 'Pages', route: '/admin/pages', icon: faColumns },
    { label: 'Media', route: '/admin/media', icon: faImages },
    { label: 'Posts', route: '/admin/posts', icon: faFolderOpen },
    { label: 'Components', route: '/admin/components', icon: faConnectdevelop },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logOut();
  }
}
