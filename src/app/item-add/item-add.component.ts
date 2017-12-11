import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  addForm: FormGroup;
  article: AbstractControl;
  name: AbstractControl;
  limit: AbstractControl;
  saved: boolean;

  constructor(fb: FormBuilder, private http: Http, private db: BackendService) {
    this.addForm = fb.group({
      'article': ['', [Validators.required, Validators.minLength(8)]],
      'name': ['', [Validators.required, Validators.minLength(1)]],
      'limit': ['', [Validators.required, Validators.minLength(1)]]
    });

    this.article = this.addForm.controls['article'];
    this.name = this.addForm.controls['name'];
    this.limit = this.addForm.controls['limit'];
  }

  ngOnInit() { }

  onSubmit(value: string): void {
    this.saved = true;
    this.db.putRaw(value)
      .subscribe((data) => { this.addForm.reset(); this.saved = false; });
  }
}
