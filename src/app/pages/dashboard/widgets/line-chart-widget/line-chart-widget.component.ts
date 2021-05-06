import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import defaultsDeep from 'lodash-es/defaultsDeep';
import { defaultChartOptions } from '../../../../../@fury/shared/chart-widget/chart-widget-defaults';
import { ChartWidgetOptions } from '../../../../../@fury/shared/chart-widget/chart-widget-options.interface';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'fury-line-chart-widget',
  templateUrl: './line-chart-widget.component.html',
  styleUrls: ['./line-chart-widget.component.scss']
})
export class LineChartWidgetComponent implements OnInit{

  @Input() data: ChartData;
  // @Input() options: ChartWidgetOptions;
  @Input() options;
  // @Input() fontValue:string;
  @Input() threeDots :string ;
  @Input() CompleteData:any;
  @Output() removeLineCard=new EventEmitter()
  @Input() chartOptions: ChartOptions = defaultsDeep({
    layout: {
      padding: {
        left: 24,
        right: 24,
        top: 16,
        bottom: 24
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      intersect: true
    }
  }, defaultChartOptions);

  isLoading: boolean;

  constructor(public db:DashboardService) {
  }

  ngOnInit()
  {
    if(this.options && (this.options.LineBGColor=="" || this.options.LineBGColor=="#undefined" )){
      this.options.LineBGColor="#0031ff"
    }
    if(this.options && (this.options.LineFGColor=="" || this.options.LineFGColor=="#undefined")){
      this.options.LineFGColor="#ffffff"
    }
    
  }
  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  RemoveCardd()
  {



    
    this.CompleteData.map((chart,i)=>{
      // if(chart.id==this.cardDetails.id){
        this.CompleteData.splice(i,1);
        localStorage.setItem("MyLineChartDataaaa",JSON.stringify(this.CompleteData))
        this.removeLineCard.emit();
      // }
    })


    console.log("CompleteData",this.CompleteData)
    // this.db.showLineToggle = 'HIDE'
    // localStorage.setItem('LineShow','HIDE');
  }
  
}
