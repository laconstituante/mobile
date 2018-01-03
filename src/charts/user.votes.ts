import { Chart } from 'chart.js';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WindowService } from "../services/window.service";
import { RestService } from "../services/rest.service";

@Component({
  selector: 'user-votes-component',
  templateUrl: './user.votes.html'
})
export class UserVoteComponent implements OnInit {
    @Output() settingEmitter = new EventEmitter();
    doughnutChart: any;
    voteText: string;
    barChart: any;
    titres1: any;
    titres2:any;
    lineChart: any;
 
    constructor(private rest:RestService, public win:WindowService) {
        // this.ionViewDidLoad();
    }
 
    ngOnInit() {
        this.getUserStat();
        this.getUserStatTitres()
    }
    getUserStat(){
        this.rest.getUserStat().subscribe(
        success => {
            if(success && success.entity){
            let graphs = success.entity;
            if(graphs && graphs.length){
                graphs.some(graph => {
                if(graph.id === 0 && graph.yes === 0 && graph.no && graph.noOpinion === 0){
                    this.voteText = "Commencer a voter";
                    return true;
                }
                });
                graphs.forEach(graph =>{                                           
                    this.doughnutChart = new Chart(this.win.nativeWindow.document.getElementById('doughnutCanvas'), {            
                        type: 'doughnut',
                        data: {
                            labels: ['Non','Sans opinion','Oui','Sans vote'],
                            datasets: [{
                                label: 'Voici une autre perspective',
                                data: [graph.no, graph.noOpinion,graph.yes,graph.emptyVote],
                                backgroundColor: [
                                    'rgba(255, 81, 49, 0.5)',
                                    'rgba(236, 239, 241, 0.5)',
                                    'rgba(153, 208, 102, 0.5)',
                                    'rgba(128, 222, 234, 0.5)'
                                ],
                                hoverBackgroundColor: [
                                    'rgba(255, 81, 49, 1)',
                                    'rgba(236, 239, 241, 1)',
                                    'rgba(153, 208, 102, 1)',
                                    'rgba(128, 222, 234, 1)'
                                ]
                            }]
                        }
            
                    });
                });            
            }
            }
        },
        error =>{

        }
        );
    }
    
    getUserStatTitres(){
        this.rest.getUserStatTitres().subscribe(
            success =>{
                let chart1 = {
                    type:'bar',
                    data: {
                            labels: [],
                            datasets: [{
                                label: 'Voici une autre perspective',
                                data: [],
                                backgroundColor: [
                                    'rgba(255, 81, 49, 0.5)',
                                    'rgba(236, 239, 241, 0.5)',
                                    'rgba(153, 208, 102, 0.5)',
                                    'rgba(128, 222, 234, 0.5)',
                                    'rgba(255, 81, 49, 0.5)',
                                    'rgba(236, 239, 241, 0.5)',
                                    'rgba(153, 208, 102, 0.5)',
                                    'rgba(128, 222, 234, 0.5)',
                                    'rgba(255, 81, 49, 0.5)',
                                    'rgba(236, 239, 241, 0.5)',
                                ],
                                hoverBackgroundColor: [
                                    'rgba(255, 81, 49, 1)',
                                    'rgba(236, 239, 241, 1)',
                                    'rgba(153, 208, 102, 1)',
                                    'rgba(128, 222, 234, 1)',
                                    'rgba(255, 81, 49, 1)',
                                    'rgba(236, 239, 241, 1)',
                                    'rgba(153, 208, 102, 1)',
                                    'rgba(128, 222, 234, 1)',
                                    'rgba(255, 81, 49, 1)',
                                    'rgba(236, 239, 241, 1)',
                                ]
                            }]
                        }
                }
                let chart2 = {
                    type:'bar',
                    data: {
                            labels: [],
                            datasets: [{
                                label: 'Voici une autre perspective',
                                data: [],
                                backgroundColor: [
                                    'rgba(255, 81, 49, 0.5)',
                                    'rgba(236, 239, 241, 0.5)',
                                    'rgba(153, 208, 102, 0.5)',
                                    'rgba(128, 222, 234, 0.5)',
                                    'rgba(255, 81, 49, 0.5)',
                                    'rgba(236, 239, 241, 0.5)',
                                    'rgba(153, 208, 102, 0.5)',
                                    'rgba(128, 222, 234, 0.5)',
                                    'rgba(255, 81, 49, 0.5)'
                                ],
                                hoverBackgroundColor: [
                                    'rgba(255, 81, 49, 1)',
                                    'rgba(236, 239, 241, 1)',
                                    'rgba(153, 208, 102, 1)',
                                    'rgba(128, 222, 234, 1)',
                                    'rgba(255, 81, 49, 1)',
                                    'rgba(236, 239, 241, 1)',
                                    'rgba(153, 208, 102, 1)',
                                    'rgba(128, 222, 234, 1)',
                                    'rgba(255, 81, 49, 1)'
                                ]
                            }]
                        }
                }

                if(success && success.entity){
                    success.entity.forEach( 
                        (value,index)=>{
                            if(index < 10){
                                if(!value.votesCount){
                                    value.votesCount = 0;
                                }
                                if(index === 0){
                                    chart1.data.labels.push('Préambule');
                                }else{
                                    chart1.data.labels.push(value.titre_name.substring(0,value.titre_name.indexOf(':')));
                                }
                                chart1.data.datasets[0].data.push(value.votesCount/value.totaux * 100);
                            }else{
                                chart2.data.labels.push(value.titre_name.substring(0,value.titre_name.indexOf(':')));
                                chart2.data.datasets[0].data.push(value.votesCount/value.totaux * 100);
                            }
                        }
                    );
                    this.titres1 = new Chart(this.win.nativeWindow.document.getElementById('titres1'),chart1);
                    this.titres2 = new Chart(this.win.nativeWindow.document.getElementById('titres2'),chart2);
                }
            },
            error =>{}
        );
    }

    goToVotePage(){
        this.settingEmitter.emit('resume-votes');
    }
 
}
