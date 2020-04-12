import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {Router} from '@angular/router';
import {ModalService} from '../../../service/modal.service';
import {UtilService} from '../../../service/util.service';
import {DataServiceService} from '../../../service/data-service.service';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  todos = []
  pagination: any = {
    limit: 10,
    offset: 1,
    total: 0,
    maxsize: 1,
    filter: {}
};
  constructor(public httpService: HttpService,
    public modal: ModalService,
    public dataService: DataServiceService,
    public util: UtilService,
    public router: Router) { }

  ngOnInit() {
    this.pagination.offset = 0;
    this.pagination.filter.users = this.dataService.getUserId();
    this.httpService.postApi(this.pagination, 'todo/getTodoCondition').subscribe(res => {
      this.todos = res['data'];
      this.pagination.total = res['count'];
    });
  }

  pageChange(pageNo){
    this.pagination.offset = pageNo - 1;
    this.pagination.filter.users = this.dataService.getUserId();
    this.httpService.postApi(this.pagination, 'todo/getTodoCondition').subscribe(res => {
      this.todos = res['data'];
      this.pagination.total = res['count'];
    });
  }

}
