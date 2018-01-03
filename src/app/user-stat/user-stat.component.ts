import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {UserStat} from '../../dto/user.stat';

@Component({
  selector: 'app-user-stat',
  templateUrl: './user-stat.component.html'
})
export class UserStatComponent implements OnInit {
  voteText:string = 'Poursuivre mes votes';
  charObject:any;
  constructor(private rest:RestService) { }
  graphs:UserStat[];
  ngOnInit() {
    if(this.rest && this.rest.isLoggedIn()){
      this.getUserStat();
    }else{
      //TO DO
      //Redirect to login page
    }
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
              let charObj = {
                labels: ['Alinéa rejetés','Sans opinion','Alinéas approuvé','Alinéas non votés'],
                datasets: [
                    {
                        data: [graph.no, graph.noOpinion,graph.yes,graph.emptyVote],
                        backgroundColor: [
                             "#ff5131",  
                             "#eceff1",                          
                            "#99d066",
                            "#80deea"

                        ],
                        hoverBackgroundColor: [
                            "#d50000",
                            "#36A2EB",
                            "#689f38", // 3rd
                            "#4bacb8"
                        ]
                    }]    
                };
                this.charObject = charObj;
            });
            this.graphs = graphs;
          }
        }
      },
      error =>{

      }
    );
  }
  goToNextVotes(){

  }
  onChartClick(event){
    console.log(event);
  }

}
