import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoDataType, DialogoTypes } from './dialogo-data-type';

@Component({
  selector: 'app-dialogo-general',
  templateUrl: './dialogo-general.component.html',
  styleUrls: ['./dialogo-general.component.scss']
})
export class DialogoGeneralComponent implements OnInit {

  public dialogTypeClass = DialogoTypes;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogoDataType) { }

  ngOnInit(): void {
  }

}
