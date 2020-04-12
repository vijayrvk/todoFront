import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../service/http.service';
import {UtilService} from '../../service/util.service';
import {ModalService} from '../../service/modal.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public util: UtilService,
              public modal: ModalService,
              public httpService: HttpService, public route: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  
  login(data) {
    console.log('login form');
    console.log(data);
    this.httpService.postApi(data, 'auth/login').subscribe((res) => {
      console.log({res});

      if (res.success) {
        this.util.storeText('userId', res.data.userId);
        this.util.storeText('token', res.data.token);
        this.util.storeJson('name', {'name': res.data.name});
        console.log('res.message');
        this.route.navigate(['/view-task']);
        console.log(`res.messagesdfasd`);
      } else {
        console.log(res.message);
        this.modal.showModal({
          'success': false,
          'message': res.message
        });
      }
    }, err => {

      this.modal.showModal({
        'success': false,
        'message': 'Something went wrong. Please try again'
      });
    });
  }
}
