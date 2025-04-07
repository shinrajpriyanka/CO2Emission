import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import jsonData from '../app/data.json';
import { UserInputComponent } from './user-input/user-input.component';
import {SelectedChartComponent} from './selected-chart/selected-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserInputComponent, SelectedChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CO2Emission';
  data: {
    Entity: string,
    Code: string,
    Year: string,
    Annual_emission: string;
  }[]= jsonData;
  uniqueCountries? : String[];
  year?: string[];

  dataset: any = [];
  country?: string;
  ngOnInit(): void {
    this.uniqueCountries = Array.from(new Set( this.data?.map(obj => obj.Entity)));
    this.year = Array.from(new Set( this.data?.map(obj => obj.Year)));
  }
  onChangeOfCountry(data: string) {
      this.country = data;
  }
}
