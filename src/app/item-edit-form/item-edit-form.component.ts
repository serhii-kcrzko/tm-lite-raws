import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styleUrls: ['./item-edit-form.component.css']
})
export class ItemEditFormComponent implements OnInit {
  editForm: FormGroup;
  article: AbstractControl;
  name: AbstractControl;
  limit: AbstractControl;
  id: string;
  raw: any;

  constructor(fb: FormBuilder, private http: Http, private route: ActivatedRoute, private db: BackendService, private location: Location) {
    this.editForm = fb.group({
      'article': ['', Validators.required],
      'name': ['', Validators.required],
      'limit': ['', Validators.required]
    });

    this.article = this.editForm.controls['article'];
    this.name = this.editForm.controls['name'];
    this.limit = this.editForm.controls['limit'];
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
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
  }

  onSubmit(value: string): void {
    const update = this.editForm.value;
    this.raw.article = update.article && update.article.length ? update.article : this.raw.article;
    this.raw.name = update.name && update.name.length ? update.name : this.raw.name;
    this.raw.limit = update.limit !== this.raw.limit ? update.limit : this.raw.limit;

    this.http.put(`http://localhost:9000/raws/${this.raw.id}`, this.raw)
    .subscribe((data) => this.editForm.reset());
  }

  delete(): void {
    this.http.delete(`http://localhost:9000/raws/${this.raw.id}`)
    .subscribe((data) => this.location.back());
  }

}
