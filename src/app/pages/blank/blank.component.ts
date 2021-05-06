import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'fury-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  constructor(public router : Router, public db:DashboardService) { }

  @Output() removeTableCard=new EventEmitter()
  @Output() removeSingleValueCard=new EventEmitter()
  @Output() removeLineCard=new EventEmitter()
  // showTableToggle:any ; 
  // showLineToggle:any ; 
  // showSingleValueToggle:any;
  @Input()showTableChart:any;
  @Input()showSingleChart:any;
  @Input()showLineChart:any;


lineShowHideToggle:any;

  ngOnInit() {
    // this.showTableToggle  = localStorage.getItem('TableShow');
    // this.showLineToggle    =   localStorage.getItem('LineShow');
    // this.showSingleValueToggle= localStorage.getItem('SingleValueShow');
    // this.db.showLineToggle = localStorage.getItem('LineShow');
    // this.db.showTableToggle = localStorage.getItem('TableShow');
    // this.db.showSingleValueToggle = localStorage.getItem('SingleValueShow');
    // console.log("MyLocalStorage Data ",this.showTableToggle,this.showLineToggle,this.showSingleValueToggle);


    // this.lineShowHideToggle = JSON.parse(localStorage.getItem('MyLineChartDataaaa')).length;
  }

  navigateToGraph()
  {
    this.router.navigate(['/graphs'])
  }
  ClearVisual()
  {
    // this.lineShowHideToggle = []
    // this.lineShowHideToggle = 'HIDE'

    // this.db.showLineToggle = 'HIDE';
    // this.db.showSingleValueToggle = 'HIDE';
    // this.db.showTableToggle = 'HIDE';
    localStorage.clear();
    this.removeTableCard.emit();
    this.removeSingleValueCard.emit();
    this.removeLineCard.emit();
  }

}
