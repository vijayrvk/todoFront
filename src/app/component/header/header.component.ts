import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilService} from '../../service/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = '';
  access;
  modules = [];

  constructor(public router: Router, public util: UtilService,) {
    try {
      this.name = this.util.getJson('name')['name'];
    } catch (e) {
      sessionStorage.clear();
      localStorage.clear();
      // this.router.navigateByUrl('/login');
    }

  }
  ngOnInit() {
  }

  signout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
