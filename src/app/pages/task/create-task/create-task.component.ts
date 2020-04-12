import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../service/http.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../service/data-service.service';
import {UtilService} from '../../../service/util.service';
import {ModalService} from '../../../service/modal.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  todoCreateForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public dataService: DataServiceService,
    public util: UtilService,
    public modal: ModalService,
    public httpService: HttpService, public route: Router) { }

  ngOnInit() {
    this.todoCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      expiryDate:['', Validators.required]
    });
  }
  formatDate(date) {
    var 
        month = '' + date.month,
        day = '' + date.day,
        year = date.year;

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  createTodo(data) {
      data.expiryDate = this.formatDate(data.expiryDate);
      data.status = 'New';
      data.users = [this.dataService.getUserId()];
      this.httpService.postApi(data, 'todo/createTodo').subscribe((res) => {
        console.log(res);
        if (res.success) {
          this.route.navigate(['/view-task']);
        } else {
          this.modal.showModal({'success': false, 'message': res['message']});
        }
      }, err => {
        this.modal.showModal({'success': false, 'message': 'Something went wrong. Please try again'});
      });
  }

}
