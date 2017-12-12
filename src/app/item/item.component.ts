import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-raw-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {
  id: string;
  raw: Object;
  priceOptions: Object;
  needOptions: Object;

  constructor(private route: ActivatedRoute, private db: BackendService, private location: Location) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.db
      .getRaw(this.id)
      .subscribe((res: any) => {
        this.renderRaw(res);
      });
  }

  back(): void {
    this.location.back();
  }

  renderRaw(res: any): void {
    this.raw = res;
    this.priceOptions = {
      title: { text: '' },
      series: [{ data: res.priceStatistics }],
      xAxis: {
        title: 'Дні'
      },
      yAxis: {
        title: 'Показники'
      },
      legend: {
        enabled: false
      }
    };
    this.needOptions = {
      title: { text: '' },
      series: [{ data: res.needStatistics }],
      xAxis: {
        title: 'Дні'
      },
      yAxis: {
        title: 'Показники'
      },
      legend: {
        enabled: false
      }
    };
  }
}
