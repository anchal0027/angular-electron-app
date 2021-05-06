import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import * as moment from 'moment';
import { of, Subject } from 'rxjs';
import { ChartData } from 'chart.js';
import { Observable, ReplaySubject } from 'rxjs';
import { SalesSummaryWidgetOptions } from '../dashboard/widgets/sales-summary-widget/sales-summary-widget-options.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartWidgetOptions } from '../../../@fury/shared/chart-widget/chart-widget-options.interface';
import { SelectionModel } from '@angular/cdk/collections';

import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
// import { AudienceOverviewWidgetOptions } from './widgets/audience-overview-widget/audience-overview-widget-options.interface';

import { FormGroup, Validators, FormArray } from '@angular/forms';
import { AudienceOverviewWidgetOptions } from '../dashboard/widgets/audience-overview-widget/audience-overview-widget-options.interface';
import { RecentSalesWidgetOptions } from '../dashboard/widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { Color, rgbaToHex } from '@angular-material-components/color-picker';
// import { isNumber, isString } from 'lodash-es';
// import { type } from 'os';
@Component({
  selector: 'fury-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  // LineChart Code
  functionsJsonSingleChart: any;
  singleChartSelectedColumnData: any;
  LineChartObject: any = {};
  checkedLabels: any = []
  myXaxisDataValues: any = [];
  myYaxisDataValues: any = []
  params:any={}
  isEdit:boolean=false;
  matchedIndex:any;
  colorCtr: AbstractControl = new FormControl(null);
  myCustomArray: any = [];
  myWholeDataArray:any = []
  MyDupliacteValueArrayson: any = [];
  LineBGColor: any = {}
  TableFGColor: AbstractControl = new FormControl(null);
  TableBGColor: AbstractControl = new FormControl(null);
  SingleBGColor: AbstractControl = new FormControl(null);
  SingleFGColor: AbstractControl = new FormControl(null);
  totalVisitsOptions: any = {
    LineBGColor: "",
    LineFGColor: "",
    allignment: "Center",
    axis: "",
    functionn: "Minimum",
    title: "Transaction",
    value: "",
    fontsize: 24,
    xaxislable: "Xlabel",
    yaxislable: "Ylabel ",
  }
  SingleTitleColor: AbstractControl = new FormControl(null);
  SingleSubTitleColor: AbstractControl = new FormControl(null);



  FGcolorCtr: AbstractControl = new FormControl(null);
  public disabled = false;
  public colors: ThemePalette = 'primary';
  public touchUi = false;
  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];
  eventsSubject: Subject<any[]> = new Subject<any[]>();



  showColumnFilter: boolean = false
  panelOpenState = false;
  myJsonData: any = [];
  labelsArray: any = [];
  insertedTotal: any = [];
  recievedTotal: any = [];
  orderedTotal: any = [];
  sum = 0;
  cardValue: any;
  showGraphs = 0;
  numeric: any;
  TextValue: any;
  recentSalesTableData$: Observable<any[]>;
  showTable = 0;

  selectedTableContent: any = 1;

  ShowMyTextChrtsValue: any = 0;
  showLineChart: any = 'HIDE';
  showTableChart: any = 'HIDE';
  showSingleValueChart: any = 'HIDE';

  selection = new SelectionModel(true, []);
  istableDataLoaded: any = false
  userTableChart: any = []
  visitsData$: Observable<ChartData>;

  myLineChartTopFour: any = "HIDE"
  tableFields: any = { title: "Transaction" }
  tableFormating: any = { foregroundColor: "", backgroundColor: "", horizantalAlign: "", textSize: "" }
  TableColumnNames = [
    { name: 'Transaction Date', property: 'transactionDate', visible: false, isModelProperty: true },
    { name: 'Transaction Id ', property: 'transactionId', visible: false, isModelProperty: true },
    { name: 'Total Recived', property: 'recievedTotal', visible: false, isModelProperty: true },
    { name: 'Total order', property: 'orderedTotal', visible: false, isModelProperty: true },
    { name: 'Total Inserted', property: 'insertedTotal', visible: false, isModelProperty: true },
    { name: 'Credit Recived', property: 'creditValue', visible: false, isModelProperty: true },
  ]
  TableChartSchema = [
    { header: 'Transaction Date', column: 'transactionDate', dataType: "datetime", format: "", visible: false, isModelProperty: true },
    { header: 'Machine Number', column: 'machineno', dataType: "text", format: "", visible: false, isModelProperty: true },
    { header: 'Total Ordered ', column: 'orderedTotal', dataType: "decimal", format: "", visible: false, isModelProperty: true },
    { header: 'Total Received', column: 'recievedTotal', dataType: "decimal", format: "", visible: false, isModelProperty: true },
    { header: 'Total Inserted', column: 'insertedTotal', dataType: "decimal", format: "", visible: false, isModelProperty: true },
    { header: 'Notes Retracted', column: 'NotesRetracted', dataType: "number", format: "", visible: false, isModelProperty: true },
    { header: 'Credit Received', column: 'creditValue', dataType: "decimal", format: "", visible: false, isModelProperty: true },
  ]


  audienceOverviewOptions: any = [];
  recentSalesData$: Observable<ChartData>;
  recentSalesOptions: RecentSalesWidgetOptions = {
    title: 'Recent Sales',
    subTitle: 'See who bought what in realtime'
  };


  userSingleChart: any = [];
  singlechartDesciption: any = { title: "NAB Assets", subtitle: "Self Service", description: "This is the NAB self service fleet.", textSize: "14", bgColor: "", titleColor: "", fgColor: "", subtitleColor: "", align: "center", function: "", text: "", value: "0" }
  private _gap = 16;
  gap = `${this._gap}px`;

  functionsJson: any = [];
  constructor(public service: DashboardService, private router: Router, private cdref: ChangeDetectorRef,private route: ActivatedRoute) {

  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }
  ngOnInit(): void {
    if(!this.isEdit){
      //initially set background of table
      const tableBG = this.hexToRgb('#f0f0f0');
      this.tableFormating.backgroundColor = new Color(tableBG.r, tableBG.g, tableBG.b);
      const tableFG = this.hexToRgb('#000000');
      this.tableFormating.foregroundColor = new Color(tableFG.r, tableFG.g, tableFG.b);
    }
    this.route.queryParams.subscribe(params => {
     this.params=params;
  });
  if(Object.keys(this.params).length === 0){
    this.CreateTransistionForm();
  }
  else{
   this.getDataById(this.params)
  }
   
  }

  getLabelnames(val, checked, column?) {
    if (column) {
      this.selection.toggle(column);
    }
    if (this.selectedTableContent == 2) {
      if (!this.istableDataLoaded && !this.isEdit) {
        this.eventsSubject.next(this.myJsonData);
        this.istableDataLoaded = true;
      }
      // if(this.selectedTableContent==1){
      column.visible = !column.visible;
      // }
    }
    if (this.selectedTableContent == 1) {
      var index = this.checkedLabels.indexOf(val);
      if (index === -1) {
        this.checkedLabels.push(val);
      } else {
        this.checkedLabels.splice(index, 1);
      }
    }
    if (this.selectedTableContent == 3) {
      this.selection.clear()
      if (checked) {
        this.selection.toggle(column);
      }
      if (this.selection.selected.length == 0) {
        this.TextValue = ""
        this.cardValue = ""
      }
      else {
        this.functionsJsonSingleChart = this.service.calculateFunctions(column.dataType);
        this.singlechartDesciption.function = this.functionsJsonSingleChart[0].value;
        this.TextValue = val;
        this.singleChartSelectedColumnData = this.myJsonData.map(r => r[this.TextValue])
        this.cardValue = this.service.getCalculatedValue(this.singleChartSelectedColumnData, this.singlechartDesciption.function)
        this.singlechartDesciption.text = this.TextValue;
        this.singlechartDesciption.value = this.cardValue;
        // this.sum = 0;
        // var length = arrayData.length;
        // if (typeof (arrayData[0]) == "number") {
        //   for (var i = 0; i < arrayData.length; i++) {
        //     this.cardValue = (this.sum += parseInt(arrayData[i], 10) / length); //don't forget to add the base
        //   }
        //   this.showGraphs = 2;
        // }
        // else {
        //   this.cardValue = "NAN"
        //   this.showGraphs = 2;
        // }
        // this.numeric = this.cardValue
      }

    }

  }
  saveSingleChart() {
    let data = localStorage.getItem("singlechart");
    if (data == null) {
      this.userSingleChart = []
    }
    else {
      this.userSingleChart = JSON.parse(data);
    }
    this.singlechartDesciption.bgColor = `#` + this.singlechartDesciption.bgColor.hex;
    this.singlechartDesciption.fgColor = `#` + this.singlechartDesciption.fgColor.hex;
    this.singlechartDesciption.subtitleColor = `#` + this.singlechartDesciption.subtitleColor.hex;
    this.singlechartDesciption.titleColor = `#` + this.singlechartDesciption.titleColor.hex;
    this.userSingleChart.push({ id: this.userSingleChart.length, singlechartDecription: this.singlechartDesciption, text: this.TextValue, value: this.cardValue })
    localStorage.setItem("singlechart", JSON.stringify(this.userSingleChart))
    this.router.navigate(['/dashboard']);

  }


  getIconsValues(value) {
    this.istableDataLoaded = false;
    //on tab change remove selection and set vusible field o false
    this.selection.selected.map(selection => {
      selection.visible = false;
    })
    this.selection.toggle(this.selection.selected)
    this.selection.clear()
    if (value == 2) {

      this.selectedTableContent = value;
      this.ShowMyTextChrtsValue = 1;
    }
    else if (value == 3) {
      this.selectedTableContent = value;
      this.ShowMyTextChrtsValue = 1;
      // this.getLabelnames('recievedTotal')
      this.showGraphs = 2
      this.showTable = 0;
    }
    else if (value == 1) {
      this.selectedTableContent = value;
      this.ShowMyTextChrtsValue = 1;
      this.checkedLabels = []
      this.showTable = 0;
      this.showGraphs = 3
      // this.visitsData$ = this.service.getVisits();

    }

  }

  saveTableForDashboard() {

    let data = localStorage.getItem("tablechart");
    if (data == null) {
      this.userTableChart = []
    }
    else {
      this.userTableChart = JSON.parse(data);
    }
    this.tableFormating.backgroundColor = `#` + this.tableFormating.backgroundColor.hex;
    this.tableFormating.foregroundColor = `#` + this.tableFormating.foregroundColor.hex;
    if(!this.isEdit){
      this.userTableChart.push({ columns: this.TableChartSchema, tabledata: this.tablejsonData, id: this.userTableChart.length, tableFields: this.tableFields, tableFormating: this.tableFormating })
    }
    else{
      this.userTableChart[this.matchedIndex]={ columns: this.TableChartSchema, tabledata: this.tablejsonData, id: this.userTableChart.length, tableFields: this.tableFields, tableFormating: this.tableFormating }
    }
   
    // localStorage.setItem('Label',"2")
    // localStorage.setItem('TableShow','SHOW')
    localStorage.setItem("tablechart", JSON.stringify(this.userTableChart))

    this.router.navigate(['/dashboard']);

  }


  myLinedata: any = [];
  myAllLinedataArray: any = []
  SubmitLine() {

    let data = localStorage.getItem("MyLineChartDataaaa");
    if (data == null) {
      this.myLinedata = []
    }
    else {
      this.myLinedata = JSON.parse(data);

    }

    this.totalVisitsOptions.LineBGColor = '#' + this.totalVisitsOptions.LineBGColor.hex
    this.totalVisitsOptions.LineFGColor = '#' + this.totalVisitsOptions.LineFGColor.hex


    if (this.totalVisitsOptions.LineBGColor == "#undefined"
    ) {
      this.totalVisitsOptions.LineBGColor = "#1023c3";
    }
    if (this.totalVisitsOptions.LineFGColor == "#undefined") {
      this.totalVisitsOptions.LineFGColor = "#e1e1e9"
    }
    this.myLinedata.push({
      "LineChartOptions": this.totalVisitsOptions,
      "LineChartXaxis": this.myXaxisDataValues,
      "LineChratYAxis": this.myYaxisDataValues
    })



    //     this.myAllLinedataArray.push( this.myLinedata);
    localStorage.setItem("MyLineChartDataaaa", JSON.stringify(this.myLinedata));
    // console.log("SetupLocalStorge",localStorage.setItem("MyLineChartDataaaa",JSON.stringify(this.myLinedata)));
    // localStorage.setItem('LineShow', 'SHOW')
    this.router.navigate(['/dashboard']);
  }

  goToPreviewpage() {
  }


  respponseJson: any = [];
  tablejsonData: any = [];

  CreateTransistionForm() {
    var data = this.service.getDataTest("GetAlltranasaction/2")
      .subscribe((r) => {
        this.respponseJson = r;
        for (let i = 0; i < this.respponseJson.length; i++) {
          this.tablejsonData.push(
            {
              "transactionDate": this.respponseJson[i].createdAt,
              "machineno": this.respponseJson[i].details.machineInformation.machineNumber,
              "orderedTotal": this.respponseJson[i].details.data.transactionDetails.orderedTotal,
              "recievedTotal": this.respponseJson[i].details.data.transactionDetails.recievedTotal,
              "insertedTotal": this.respponseJson[i].details.data.transactionDetails.insertedTotal,
              "NotesRetracted": this.respponseJson[i].details.data.transactionDetails.creditValue,
              "creditValue": this.respponseJson[i].details.data.transactionDetails.creditValue,
            }
          )

        }
        this.myJsonData = this.tablejsonData
        // this.callTableColumns();
        this.recentSalesTableData$ = of([])
        // this.recentSalesTableData$ =this.tablejsonData;
      })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.TableChartSchema.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    if (this.selectedTableContent == 1) {
      // alert("1")   
      this.checkedLabels = Object.keys(this.myJsonData[0]);
      if (this.selection.selected.length == 0) {
        this.checkedLabels = Object.keys(this.myJsonData[0]);
      }
      else {
        this.checkedLabels = [];
      }
    }

    if (this.selectedTableContent == 2) {
      if (!this.istableDataLoaded && !this.isEdit) {
        this.eventsSubject.next(this.myJsonData);
        this.istableDataLoaded = true;
      }
      // if(this.selectedTableContent==1){
      // }
    }

    if (this.isAllSelected()) {
      this.selection.clear()
      this.TableChartSchema.map(data => {
        data.visible = false
      })
    }
    else {
      this.TableChartSchema.forEach(row => this.selection.select(row));
      this.TableChartSchema.map(data => {
        data.visible = true
      })
    }

  }


  YaxisValueData(e) {
    // this.audienceOverviewOptions = []
    localStorage.setItem('YaxisValue', e);
    this.myYaxisDataValues = this.myJsonData.map(r => r[e]);
    this.ImplimentFunctions(this.myXaxisDataValues, this.myYaxisDataValues);
    var DataTypeOf = typeof (this.myYaxisDataValues[0])
    this.functionsJson = this.service.calculateFunctions(DataTypeOf);
    //  this.service.getAudienceOverviewUsers(this.myXaxisDataValues,this.myYaxisDataValues).subscribe(response => {
    //   this.audienceOverviewOptions.push({
    //     label: e,
    //     data: response
    //   });
    //   console.log("audiance",this.audienceOverviewOptions);
    // });

    this.visitsData$ = this.service.LineVisualData(this.myXaxisDataValues, this.myYaxisDataValues)
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */

  XaxisValueData(e) {
    this.myXaxisDataValues = this.myJsonData.map(r => r[e]);
    // var  p = ["a","b","c","d","e","f","g","h","i","j","k","w","a","b","c","d","e","f","g","h","i","j","k","w"];
    // var app =  [1,2,6,9,6,9,5,8,5,9,6,3,1,2,6,9,6,9,5,8,5,9,6,3]
    // this.visitsData$ = this.service.LineVisualData(p, app)
    this.visitsData$ = this.service.LineVisualData(this.myXaxisDataValues, this.myYaxisDataValues)
  }
  onFunctionChange() {
    this.cardValue = this.service.getCalculatedValue(this.singleChartSelectedColumnData, this.singlechartDesciption.function)
    if (this.cardValue) {
      this.singlechartDesciption.text = this.TextValue;
      this.singlechartDesciption.value = this.cardValue;
    }
    else {
      this.singlechartDesciption.value = "0";
    }

  }


  ImplimentFunctions(x, y) {
    this.myCustomArray = []
    var myArray = []
    x.map((item, index) => {
      myArray.push({ Keys: item, values: y[index] })
    })
    this.myWholeDataArray = myArray;
    // console.log("myArray",this.myWholeDataArray);
    this.MyDupliacteValueArrayson = Object.values(myArray.reduce((acc, { Keys, values }) => {
      acc[Keys] = acc[Keys] || { Keys, values: [] };
      acc[Keys].values.push(values);
      return acc;
    }, {}));
  
    var holder = {};
    myArray.forEach(function (d) {
      if (holder.hasOwnProperty(d.Keys)) {
        // OLD
        holder[d.Keys] = holder[d.Keys] + d.values;
      } else {
        // New
        holder[d.Keys] = d.values;
      }
    });
    for (var prop in holder) {
      this.myCustomArray.push({ myKeys: prop, myValues: holder[prop] });
    }

    this.MyFUnctionValue =   this.service.ImplimentCalculationFunctions(this.myWholeDataArray,this.MyDupliacteValueArrayson,'average')
    this.myYaxisDataValues = this.MyFUnctionValue;
    this.visitsData$ = this.service.LineVisualData(this.myXaxisDataValues, this.myYaxisDataValues)
    



  }

MyFUnctionValue:any = []; 
  getfunctionValue()
  {
  this.MyFUnctionValue =   this.service.ImplimentCalculationFunctions(this.myWholeDataArray,this.MyDupliacteValueArrayson,this.totalVisitsOptions.functionn)
  this.myYaxisDataValues = this.MyFUnctionValue;
  this.visitsData$ = this.service.LineVisualData(this.myXaxisDataValues, this.myYaxisDataValues)
  }
  getDataById(params){
    this.isEdit=true;
    this.TableChartSchema=[];
    if(params.type=="table"){
      this.selection.clear()
      this.TableChartSchema.map(data => {
        data.visible = false
      })
      this.selectedTableContent="2";
      let data = JSON.parse(localStorage.getItem("tablechart"));
      data.map((table,i)=>{
        if(table.id==params.id){
          this.matchedIndex=i;
          this.TableChartSchema=table.columns;
          this.ShowMyTextChrtsValue = 1;
          this.recentSalesTableData$ = of(table.tabledata);
          this.tableFields=table.tableFields;
          this.tablejsonData=table.tabledata;
          this.tableFormating=table.tableFormating;
          const tableBG = this.hexToRgb(this.tableFormating.backgroundColor);
          this.tableFormating.backgroundColor = new Color(tableBG.r, tableBG.g, tableBG.b);
          const tableFG = this.hexToRgb(this.tableFormating.foregroundColor);
          this.tableFormating.foregroundColor = new Color(tableFG.r, tableFG.g, tableFG.b);
        }
       
      })
      this.TableChartSchema.map((schema)=>{
        if(schema.visible){
          this.selection.toggle(schema);
        }
      })
      
    }
  }
  hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }  
}


