import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import { WindowService } from "../services/window.service";
import {RestService} from '../services/rest.service';
@Component({
  selector: 'insufficiant-privileges',
  templateUrl: './insufficiant.privileges.component.html'
})
export class InsufficiantPrivilegesComponent implements OnInit{    
    ratio:number;
    pieChart:any;
    @Output() settingEmitter = new EventEmitter();
    constructor(private rest:RestService, public win:WindowService){
        
    }
    ngOnInit(){
        this.ratio = Math.floor(this.rest.getEligibility().totalvotes / this.rest.getEligibility().totalAlinea *100);
            this.pieChart = new Chart(this.win.nativeWindow.document.getElementById('pieChart'), {
                    type: 'pie',
                    data: {
                        labels: ['Votes exprimés','Sans votes'],
                        datasets: [{
                            label: 'Avancement des votes',
                            data: [this.rest.getEligibility().totalvotes,this.rest.getEligibility().totalAlinea - this.rest.getEligibility().totalvotes],
                            backgroundColor: [
                                "#99d066",
                                "#cfd8dc"
                            ],
                            hoverBackgroundColor: [
                                "#689f38",
                                "#9ea7aa"
                            ]
                        }]
                    }
        
                });
    }
    vote(){
        this.settingEmitter.emit('resume-votes');
    }

}