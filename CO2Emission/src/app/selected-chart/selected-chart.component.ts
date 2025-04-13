import { Component, Input, input, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType, } from "chart.js";
import jsonData from '../data.json';


@Component({
  selector: 'app-selected-chart',
  imports: [BaseChartDirective],
  templateUrl: './selected-chart.component.html',
  styleUrl: './selected-chart.component.css'
})

export class SelectedChartComponent {
  @Input() uniqueCountries? : String[];
  @Input() dataset: any = [];
  @Input() selectTable: boolean = false;
  @Input() selectChart: boolean = false;
  country = input<string>();
  tableValue: {year:string, emission:string}[] = [];
  data: {
    Entity: string,
    Code: string,
    Year: string,
    Annual_emission: string;
  }[]= jsonData;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend = true;
  ngOnChanges(changes: SimpleChanges): void {
    changes['selectChart'] ? this.chartData() : '';
    changes['selectTable']  ? this.tableData(): '';
    if(changes['country']) {
      this.chartData();
      this.tableData();
    }
  }
  chartData() {
    this.dataset = [];
    for(let data of this.data) {
      if(data.Entity === this.country()) {
        this.dataset.push(data.Annual_emission);
      }
    }
    this.lineChartData = {
      labels: Array.from(new Set( this.data?.map(obj => obj.Year))),
      datasets: [
        {
          data: this.dataset,
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'greenyellow'
        }
      ]
    }
  }
  tableData() {
    this.tableValue = [];
    for(let data of this.data) {
      if(data.Entity === this.country()) {
        this.tableValue.push({
          year: data.Year,
          emission:data.Annual_emission
        });
      }
    }
  }
}
