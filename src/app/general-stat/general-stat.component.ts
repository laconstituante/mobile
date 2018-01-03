import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Chart } from 'chart.js';
import { WindowService } from "../../services/window.service";

@Component({
  selector: 'app-general-stat',
  templateUrl: './general-stat.component.html'
})
export class GeneralStatComponent implements OnInit {
  doughnutChart:any;
  chartObj:any;
  // @ViewChild('chart') chart: UIChart;
  constructor(private rest:RestService, public win:WindowService) {
    
   } 
  ngOnInit() {
    this.doughnutChart = {
      labels: ['Oui','Non'],
      datasets: [{
        data:[0,0],
        backgroundColor: [
              "#99d066",
              "#ff5131"
        ],
        hoverBackgroundColor: [
            "#689f38",
            "#d50000"
        ]
      }]
    };
    this.getGlobalStat();
  }
  getGlobalStat(){
    this.rest.getGlobalStat().subscribe(
      success => {
        if(success && success.entity && success.entity.length){
            let stats = success.entity;
            stats.forEach(graph => {
                this.chartObj = this.doughnutChart = new Chart(this.win.nativeWindow.document.getElementById('allPie'), {
                        type: 'doughnut',
                        data: {
                            labels: ['Nombre de votes NON','Nombre de votes sans opinion','Nombre de votes OUI'],
                            datasets: [{
                                label: 'Voici une autre perspective',
                                data: [graph.no, graph.emptyVote,graph.yes],
                                backgroundColor: [
                                    'rgba(255, 81, 49, 0.5)',
                                    'rgba(236, 239, 241, 0.5)',
                                    'rgba(153, 208, 102, 0.5)'
                                ],
                                hoverBackgroundColor: [
                                    'rgba(255, 81, 49, 1)',
                                    'rgba(236, 239, 241, 1)',
                                    'rgba(153, 208, 102, 1)'
                                ]
                            }]
                        }
            
                    });
                });
        }
      },
      error => {

      }
    );
  }
  update(event){
    console.log(event);
  }
}
