import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';

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

  constructor(fb: FormBuilder, private http: Http) {
    this.addForm = fb.group({
      'article': ['', Validators.required],
      'name': ['', Validators.required],
      'limit': ['', Validators.required]
    });

    this.article = this.addForm.controls['article'];
    this.name = this.addForm.controls['name'];
    this.limit = this.addForm.controls['limit'];
  }

  ngOnInit() {}

  onSubmit(value: string): void {
    this.saved = true;
    this.http.post('http://localhost:9000/raws', this.addForm.value)
      .subscribe((data) => { this.addForm.reset(); this.saved = false; });
  }
}
