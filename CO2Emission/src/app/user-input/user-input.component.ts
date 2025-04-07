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
  country?: String;
  update() {
    this.selectedValue?.emit(this.country);
  }
}
