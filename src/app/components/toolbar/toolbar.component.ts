import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() openSidebar: EventEmitter<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.openSidebar = new EventEmitter();
  }

  ngOnInit(): void {
  }

  openSidebarEmiter(){
    this.openSidebar.emit(true);
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('');
  }

}
