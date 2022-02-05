import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faColumns,
  faImages,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
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
  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/admin', icon: faHome },
    { label: 'Pages', route: '/admin/pages', icon: faColumns },
    { label: 'Media', route: '/admin/media', icon: faImages },
    { label: 'Posts', route: '/admin/posts', icon: faFolderOpen },
  ];

  constructor() {}

  ngOnInit(): void {}
}
