
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../service/http.service';
import {ModalService} from '../../service/modal.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../service/data-service.service';
import {UtilService} from '../../service/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userCreateForm: FormGroup;
  validator = Validators.email;


  constructor(private formBuilder: FormBuilder,
              public modal: ModalService,
              public router: Router,
              public util: UtilService,
              public dataService: DataServiceService,
              public httpService: HttpService) {
    
  }

  ngOnInit() {
    this.userCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      loginId: ['', Validators.email],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      isActive: ['', Validators.required]

    });
  }

  
  userCreate(data) {
    this.httpService.postApi(data, 'user/registerUser').subscribe(res => {
      if (res.success) {
        this.router.navigateByUrl('/login');
      } else {
        this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'});
      }
    }, err => {

      this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'})
    });

  }
}
