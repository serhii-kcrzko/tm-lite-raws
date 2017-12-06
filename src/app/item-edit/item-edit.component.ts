import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
// private apiUrl = 'http://localhost:9000';
data: any = {};

  constructor(private http: Http, private db: BackendService) { }

  getData() {
    // return this.http.get(`${this.apiUrl}/raws`)
    //   .map((res: Response) => res.json());

    return this.db.getRaws();
  }

  getRaws() {
    this.getData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.getRaws();
    this.getData();
  }
}
