import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Field, FIELDS } from 'src/app/models/Field';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss'],
})
export class CreateComponentComponent implements OnInit {
  isLoading: boolean = false;
  name: string = '';
  faPlus = faPlus;
  fields: Field[] = FIELDS;

  constructor() {}

  ngOnInit(): void {}

  onAddField(): void {}

  onSubmit(): void {}
}
