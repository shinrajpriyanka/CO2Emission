import { Component, Input, input, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType, } from "chart.js";
import Chart from 'chart.js/auto';
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
  country = input<string>();
  data: {
    Entity: string,
    Code: string,
    Year: string,
    Annual_emission: string;
  }[]= jsonData;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: Array.from(new Set( this.data?.map(obj => obj.Year))),
    datasets: [
      {
        data: this.dataset,
        label: 'Series A',
        fill: true,
        tension: 0.05,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: any = {
    scales : {
      x: {
        ticks: {
        beginAtZero: true,
            stepValue: 20,

        }
      },
        y: {
            ticks: {
            beginAtZero: true,
                stepValue: 4,

            }
        }
      }
  };
  public lineChartLegend = true;
  ngOnInit(): void {
    console.log(this.country())
  }
  ngOnChanges(changes: SimpleChanges): void {
    let selectedCountry= this.country();
    for(let data of this.data) {
      if(data.Entity === selectedCountry) {
        this.dataset.push(data.Annual_emission);
      }
    }
    console.log(this.dataset);
    this.lineChartData = {
      labels: Array.from(new Set( this.data?.map(obj => obj.Year))),
      datasets: [
        {
          data: this.dataset,
          label: 'Series A',
          fill: true,
          tension: 0.05,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]
    }
  }
}
