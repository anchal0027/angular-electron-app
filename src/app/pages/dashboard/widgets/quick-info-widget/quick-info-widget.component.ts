import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'fury-quick-info-widget',
  templateUrl: './quick-info-widget.component.html',
  styleUrls: ['./quick-info-widget.component.scss']
})
export class QuickInfoWidgetComponent implements OnInit {

  @Input() value: string;
  @Input() label: string;
  @Input() background: string;
  @Input() color: string;
  @Input() singlechartDesciption:any;
  @Input() icon: string;
  @Input() threeDots :string ;
  @Input() totalSingleValueChart:any;
  @Input() cardDetails:any;
  @Output() removeSingleValueCard=new EventEmitter()
  constructor(public DBService:DashboardService) {
  }

  ngOnInit() {
    if(this.singlechartDesciption && (this.singlechartDesciption.bgColor=="" || this.singlechartDesciption.bgColor=="#undefined" )){
      this.singlechartDesciption.bgColor="#000000"
    }
    if(this.singlechartDesciption && (this.singlechartDesciption.fgColor=="" || this.singlechartDesciption.fgColor=="#undefined")){
      this.singlechartDesciption.fgColor="#ffffff"
    }
  }
  RemoveCardd()
  {
    if(this.totalSingleValueChart && this.totalSingleValueChart.length>0){
      this.totalSingleValueChart.map((chart,i)=>{
        if(chart.id==this.cardDetails.id){
          this.totalSingleValueChart.splice(i,1);
          localStorage.setItem("singlechart",JSON.stringify(this.totalSingleValueChart))
          this.removeSingleValueCard.emit();
        }
      })
    }
  }
 
}
