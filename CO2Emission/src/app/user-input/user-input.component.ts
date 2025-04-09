import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Input() data?: {
    Entity: string,
      Code: string,
      Year: string,
      Annual_emission: string;
  }[];
  @Input() countries?: String[];
  @Output() selectedValue = new EventEmitter();
  @Output() selectedChart = new EventEmitter();
  @Output() selectedTable = new EventEmitter();
  country?: String;
  selectChart: boolean = false;
  selectTable: boolean = false;
  ngOnInit(): void {
    this.selectChart = false;
    this.selectTable = false;
  }
  update() {
    this.selectedValue?.emit(this.country);
    this.selectedChart?.emit(this.selectChart);
    this.selectedTable?.emit(this.selectTable);
  }
}
