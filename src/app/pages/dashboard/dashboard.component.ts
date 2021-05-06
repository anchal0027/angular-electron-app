import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';
import * as moment from 'moment';
import { of } from 'rxjs';
import { Observable, ReplaySubject } from 'rxjs';
import { AdvancedPieChartWidgetOptions } from './widgets/advanced-pie-chart-widget/advanced-pie-chart-widget-options.interface';
import { AudienceOverviewWidgetOptions } from './widgets/audience-overview-widget/audience-overview-widget-options.interface';
import { BarChartWidgetOptions } from './widgets/bar-chart-widget/bar-chart-widget-options.interface';
import { DonutChartWidgetOptions } from './widgets/donut-chart-widget/donut-chart-widget-options.interface';
import { RealtimeUsersWidgetData, RealtimeUsersWidgetPages } from './widgets/realtime-users-widget/realtime-users-widget.interface';
import { RecentSalesWidgetOptions } from './widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { SalesSummaryWidgetOptions } from './widgets/sales-summary-widget/sales-summary-widget-options.interface';
import { DashboardService } from './dashboard.service';
import { ChartWidgetOptions } from '../../../@fury/shared/chart-widget/chart-widget-options.interface';
import { Dummy } from './dummy.interface';
import * as fs from 'file-system';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as el from 'electron'
// import { ConsoleReporter } from 'jasmine';
// import { ErrorService } from 'src/app/layout/error.service';


@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  deviceInfo = null;
  panelOpenState = false;
  showThreeDots: boolean = false
  showColumnFilter: boolean = false
  showTableChart: boolean = false;
  showLineChart: boolean = false
  // fs = (<any>window).require("fs");
  // showThreeDots:boolean = false
  // showColumnFilter:boolean=false
  // showTableChart:boolean=false;
  showSingleChart:boolean=false;
  singlevalueChart:any;
  dummy: Dummy[] = [];
  TransactionIdArray: any = []
  orderSum: any = [];
  orderedSum: any;
  tableChart: any = [];

  private static isInitialLoad = true;

  salesData$: Observable<ChartData>;
  totalSalesOptions: BarChartWidgetOptions = {
    title: 'Total Sales',
    gain: 16.3,
    subTitle: 'compared to last month',
    background: '#3F51B5',
    color: '#FFFFFF'
  };
  totalVisitsOptions: any = {}
  visitsData$: Observable<ChartData>;
  // totalVisitsOptions: ChartWidgetOptions = {
  //   title: 'Total Orders',
  //   // gain: 42.5,
  //   // subTitle: 'Sub Heading Total Inserted',
  //   background: '#03A9F4',
  //   color: '#FFFFFF'
  // };
  clicksData$: Observable<ChartData>;
  totalClicksOptions: ChartWidgetOptions = {
    title: 'Total Clicks',
    gain: -6.1,
    subTitle: 'compared to last month',
    background: '#4CAF50',
    color: '#FFFFFF'
  };
  conversionsData$: Observable<ChartData>;
  conversionsOptions: ChartWidgetOptions = {
    title: 'Jobs',
    gain: 10.4,
    subTitle: 'Suncorp',
    background: '#009688',
    color: '#FFFFFF'
  };
  salesSummaryData$: Observable<ChartData>;
  salesSummaryOptions: SalesSummaryWidgetOptions = {
    title: 'Total Order',

    // subTitle: 'Self Services',
    gain: 372
  };
  top5CategoriesData$: Observable<ChartData>;
  top5CategoriesOptions: DonutChartWidgetOptions = {
    title: 'Top Categories',
    subTitle: 'Compare Sales by Category'
  };
  audienceOverviewOptions: AudienceOverviewWidgetOptions[] = [];
  recentSalesData$: Observable<ChartData>;
  recentSalesOptions: RecentSalesWidgetOptions = {
    title: 'Change Transaction',
    // subTitle: 'See who bought what in realtime'
  };


  TableColumnNames = [
    { name: 'Transaction Date', property: 'transaction_date', visible: true, isModelProperty: true },
    { name: 'Transaction Id ', property: 'transactionId', visible: true, isModelProperty: true },
    { name: 'Total Recived', property: 'recievedTotal', visible: true, isModelProperty: true },

    { name: 'Total order', property: 'orderedTotal', visible: true, isModelProperty: true },
    { name: 'Total Inserted', property: 'insertedTotal', visible: true, isModelProperty: true },
    { name: 'Credit Recived', property: 'creditValue', visible: true, isModelProperty: true },


  ]
  recentSalesTableData$: Observable<any[]>;
  TransactionDetails$: Observable<any[]>;
  advancedPieChartOptions: AdvancedPieChartWidgetOptions = {
    title: 'Sales by country',
    subTitle: 'Top 3 countries sold 34% more items this month\n'
  };
  advancedPieChartData$: Observable<ChartData>;
  private _realtimeUsersDataSubject = new ReplaySubject<RealtimeUsersWidgetData>(30);
  realtimeUsersData$: Observable<RealtimeUsersWidgetData> = this._realtimeUsersDataSubject.asObservable();

  private _realtimeUsersPagesSubject = new ReplaySubject<RealtimeUsersWidgetPages[]>(1);
  realtimeUsersPages$: Observable<RealtimeUsersWidgetPages[]> = this._realtimeUsersPagesSubject.asObservable();
  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  FormDataFeilds: any;
  respponseJson: any = [];
  tablejsonData: any = [];
  // pichart:any = [];
  insertedTotal: any = [];
  orderedTotal: any = [];
  recievedTotal: any = [];
  myLabelAray: any = [];
  PiChart: any = [];
  singleText: any;
  singleValaue: any;

  ShowMyDefaultScreen = 0;
  // singleText:any ;
  // singleValaue:any ;
  
  // ShowMyDefaultScreen= 0;
  showMySingleValueChart = 0

  showMyTable = 0;
  tableStructure;
  // Transaction:any = "Transactions";
  constructor(public dashboardService: DashboardService,
    private router: Router,
    private db: DashboardService,
    private deviceService: DeviceDetectorService,
    
    // public error: ErrorService
  ) {
     this.epicFunction();
    if (/Edge/.test(navigator.userAgent)) {
      if (DashboardComponent.isInitialLoad) {
        this.router.navigate(['/apps/chat']).then(() => {
          this.router.navigate(['/']);
        });
        DashboardComponent.isInitialLoad = false;
      }
    }


  }
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  showLableIntoDiffrentLan(val) {
    var x = this.FormDataFeilds.map(X => X == val)

  }
  /**
   * Everything implemented here is purely for Demo-Demonstration and can be removed and replaced with your implementation
   */
  showTableToggle: any;
  showLineToggle: any;
  showSingleValueToggle: any;
  ShoWRemoveMain: any = 'SHOW';
  JsonLineData: any = [];
  jsonLineDataUI: any = [];
  ngOnInit() {
  //   this.fs.readFile('https://jsonplaceholder.typicode.com/todos/1',"utf8", (err, data) => {
  //     console.log(">>>Dtatatata from server",data)
  // })
    // this.fs.readFile('C:\\Users\\bcs\\test.json',"utf8", (err, data) => {
  //     this.fs.readFile('C:\\STM//transaction.json',"utf8", (err, data) => {
  //     console.log("data from c drive",data);
  //      let datas=JSON.parse(data);
  //      datas[datas.length]={name: "sazal", order_count: 31, address: "noida"};
  //       this.fs.writeFile('C:\\Users\\bcs\\test.json', JSON.stringify(datas), function(err) {})
  //  })
    this.getData()
    this.getSingleChartData();
    this.getDyanmicata();
    // this.CreateTransistionForm();
    // this.showTableToggle = localStorage.getItem('TableShow');
    // this.showLineToggle = localStorage.getItem('LineShow');
    // this.showSingleValueToggle = localStorage.getItem('SingleValueShow');

    // this.dashboardService.showLineToggle = localStorage.getItem('LineShow');
    // this.dashboardService.showTableToggle = localStorage.getItem('TableShow');
    // this.dashboardService.showSingleValueToggle = localStorage.getItem('SingleValueShow');
    this.getLineChart();
    // this.salesData$ = this.dashboardService.getSales();
    // this.visitsData$ = this.dashboardService.getVisits();
    this.clicksData$ = this.dashboardService.getClicks();
    // this.conversionsData$ = this.dashboardService.getConversions();
    this.salesSummaryData$ = this.dashboardService.getSalesSummary();
    // this.top5CategoriesData$ = this.dashboardService.getTop5Categories();


    for (let i = 0; i < 30; i++) {
      this._realtimeUsersDataSubject.next(
        {
          label: moment().fromNow(),
          value: Math.round(Math.random() * (100 - 10) + 10)
        } as RealtimeUsersWidgetData);
    }

    // Simulate incoming values for Realtime Users Widget
    setInterval(() => {
      this._realtimeUsersDataSubject.next(
        {
          label: moment().fromNow(),
          value: Math.round(Math.random() * (100 - 10) + 10)
        } as RealtimeUsersWidgetData);
    }, 5000);

    // Prefill realtimeUsersPages with 3 random values
    const demoPages = [];
    const demoPagesPossibleValues = ['/components', '/tables/all-in-one-table', '/apps/inbox', '/apps/chat', '/dashboard', '/login', '/register', '/apps/calendar', '/forms/form-elements'];
    for (let i = 0; i < 3; i++) {
      const nextPossibleValue = demoPagesPossibleValues[+Math.round(Math.random() * (demoPagesPossibleValues.length - 1))];
      if (demoPages.indexOf(nextPossibleValue) === -1) {
        demoPages.push(nextPossibleValue);
      }

      this._realtimeUsersPagesSubject.next(demoPages.map(pages => {
        return { 'page': pages } as RealtimeUsersWidgetPages;
      }));
    }

    // Simulate incoming values for Realtime Users Widget
    setInterval(() => {
      const nextPossibleValue = demoPagesPossibleValues[+Math.round(Math.random() * (demoPagesPossibleValues.length - 1))];
      if (demoPages.indexOf(nextPossibleValue) === -1) {
        demoPages.push(nextPossibleValue);
      }

      if (demoPages.length > Math.random() * (5 - 1) + 1) {
        demoPages.splice(Math.round(Math.random() * demoPages.length), 1);
      }

      this._realtimeUsersPagesSubject.next(demoPages.map(pages => {
        return { 'page': pages } as RealtimeUsersWidgetPages;
      }));
    }, 5000);
    this.recentSalesData$ = this.dashboardService.getRecentSalesData();
    // this.advancedPieChartData$ = this.dashboardService.getAdvancedPieChartData();

  }
getData(){
  let data=localStorage.getItem("tablechart");
    if(data==null){
      this.showTableChart=false;
    //  this.db.showTableToggle = 'HIDE'
    //   localStorage.setItem('TableShow','HIDE');
      // this.TableColumnNames=this.TableColumnNames
    }
    else {
      this.tableChart = JSON.parse(data);
      if (this.tableChart.length == 0) {
        // this.db.showTableToggle = 'HIDE'
        // localStorage.removeItem("tablechart");
        this.showTableChart = false;
      }
      else {
        this.showTableChart = true;
      }
      // this.TableColumnNames=this.tableChart[0].schema;
      // this.recentSalesTableData$ = of(this.tableChart[0].tabledata);

    }
  }

  CreateTransistionForm() {
    var data = this.dashboardService.getDataTest("GetAlltranasaction/2")
      .subscribe((r) => {
        this.respponseJson = r;
        for (let i = 0; i < this.respponseJson.length; i++) {
          this.tablejsonData.push(
            {
              "transaction_date": this.respponseJson[i].createdAt,
              "transactionId": this.respponseJson[i].transactionId,
              "orderedTotal": this.respponseJson[i].details.data.transactionDetails.orderedTotal,
              "recievedTotal": this.respponseJson[i].details.data.transactionDetails.recievedTotal,
              "insertedTotal": this.respponseJson[i].details.data.transactionDetails.insertedTotal,
              "creditValue": this.respponseJson[i].details.data.transactionDetails.creditValue,
            }
          )
        }
        this.recentSalesTableData$ = of(this.tablejsonData);
      })

    this.tableStructure = localStorage.getItem('Label')
    if (this.tableStructure == 2) {
      this.showMyTable = 1;
      this.ShowMyDefaultScreen = 1
      //  this.showMyGraph = 3;  
    }



  }


  getDyanmicata() {
    var insertedTotalSum = 0;
    var insertData;
    var orderedTotalSum = 0;
    var orderedTotal;
    var recievedTotalSum = 0;
    var recievedTotal;
    var dataArray = [];
    var myLineChartData = [];
    var myTransactionDateArray = [];
    // this.dashboardService.getPiChartRecord().subscribe((r) => {
    this.dashboardService.getDataTest("GetAlltranasaction/2").subscribe((r) => {
      this.respponseJson = r;
      for (let i = 0; i < this.respponseJson.length; i++) {
        this.insertedTotal.push(this.respponseJson[i].details.data.transactionDetails.insertedTotal)
        this.orderedTotal.push(this.respponseJson[i].details.data.transactionDetails.orderedTotal)
        this.recievedTotal.push(this.respponseJson[i].details.data.transactionDetails.recievedTotal)
        myTransactionDateArray.push(this.respponseJson[i].createdAt);
      }
      // MEAN
      for (var i = 0; i < this.insertedTotal.length; i++) {
        insertData = (insertedTotalSum += parseInt(this.insertedTotal[i], 10) / 10); //don't forget to add the base
      }

      for (var i = 0; i < this.orderedTotal.length; i++) {
        this.orderSum.push(this.orderedTotal[i]);
        orderedTotal = (orderedTotalSum += parseInt(this.insertedTotal[i], 10)); //don't forget to add the base
        myLineChartData.push(this.orderedTotal[i])
      }
      this.orderedSum = this.orderSum.reduce((a, b) => a + b, 0);


      for (var i = 0; i < this.recievedTotal.length; i++) {
        recievedTotal = (recievedTotalSum += parseInt(this.insertedTotal[i], 10) / 10); //don't forget to add the base
      }
      this.myLabelAray.push(insertData, orderedTotal, recievedTotal);
      this.PiChart.push([
        { label: "Total Insert", value: insertData },
        { label: "Total Order", value: orderedTotal },
        { label: "Total Recived", value: recievedTotal },
      ])
      dataArray.push("Total Insert", "Total Order", "Total Recived")

      // this.visitsData$ = this.dashboardService.getVisitsDemo(myLineChartData, myTransactionDateArray);

      this.salesData$ = this.dashboardService.getSalesDummy(this.myLabelAray, dataArray);
      this.conversionsData$ = this.dashboardService.getConversionsDemo(dataArray, this.myLabelAray);
      this.advancedPieChartData$ = this.dashboardService.transformData(dataArray, this.myLabelAray);
      this.top5CategoriesData$ = this.dashboardService.getTop5CategoriesDumm(this.PiChart[0]);
    })


  }

  goToPreviewpage() {
    this.router.navigate(['/graphs'])
  }
  removeTableCard() {
    this.getData()
  }
  removeLineCard(d) {
    this.getLineChart()
  }
  AfterDeleteAllLine: any = 0

  getLineChart() {
    
    this.jsonLineDataUI = [];
    // this.JsonLineData = JSON.parse(localStorage.getItem('MyLineChartDataaaa'));
    // console.log("JSONLINE",this.jsonLineDataUI);
    let data=localStorage.getItem("MyLineChartDataaaa");
    
    if(data==null){
      this.showLineChart=false;
    // if(this.JsonLineData.length==0 ){
    //   this.AfterDeleteAllLine = 1;
    //   // this.jsonLineDataUI = []
    // }
    }
    else{
      this.JsonLineData = JSON.parse(data)

      console.log("GettingLocalStogra",this.JsonLineData);
      if(this.JsonLineData.length==0){
        // this.db.showSingleValueToggle = 'HIDE'
        // localStorage.removeItem("MyLineChartDataaaa");
       this.showLineChart=false;
      }
      else{
        this.showLineChart=true;
        for (var i = 0; i < this.JsonLineData.length; i++) {
          if (this.JsonLineData[i].LineChartOptions.LineBGColor == '#undefined' || this.JsonLineData[i].LineChartOptions.LineFGColor == '#undefined') {
            this.JsonLineData[i].LineChartOptions.LineBGColor = "#1023c3";
            this.JsonLineData[i].LineChartOptions.LineFGColor = "#e1e1e9";
          }
          else {
            this.JsonLineData[i].LineChartOptions.LineBGColor = this.JsonLineData[i].LineChartOptions.LineBGColor;
            this.JsonLineData[i].LineChartOptions.LineFGColor = this.JsonLineData[i].LineChartOptions.LineFGColor
          }
          this.totalVisitsOptions = this.JsonLineData[i].LineChartOptions;
          this.visitsData$ = this.dashboardService.LineVisualData(this.JsonLineData[i].LineChartXaxis, this.JsonLineData[i].LineChratYAxis)
          this.jsonLineDataUI.push({
            "Options": this.totalVisitsOptions,
            "Value": this.visitsData$
          })
        }
      }
      
  }
}





  getSingleChartData(){
    let data=localStorage.getItem("singlechart");
    if(data==null){
      this.showSingleChart=false;
    //  this.db.showSingleValueToggle = 'HIDE'
      // localStorage.setItem('SingleValueShow','HIDE');
      // this.TableColumnNames=this.TableColumnNames
    }
    else{
      this.singlevalueChart=JSON.parse(data)
      if(this.singlevalueChart.length==0){
        // this.db.showSingleValueToggle = 'HIDE'
        localStorage.removeItem("singlechart");
       this.showSingleChart=false;
      }
      else{
        this.showSingleChart=true;
      }
    }
  }
  removeSingleValueCard(){
    this.getSingleChartData();
  }

  RemoveLine()
  {
    this.getLineChart();
  }



  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  

}
