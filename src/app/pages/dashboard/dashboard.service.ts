import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { values } from 'lodash-es';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  advancedPieChartDemoLabels,
  advancedPieChartDemoValues,
  audienceOverviewBounceRateDemoData,
  audienceOverviewBounceRateDemoDataLastWeek,
  audienceOverviewBounceRateDemoLabels,
  audienceOverviewSessionDurationDemoData,
  audienceOverviewSessionDurationDemoLabels,
  audienceOverviewSessionDurationDemoLastWeek,
  audienceOverviewSessionsDemoData,
  audienceOverviewSessionsDemoDataLastWeek,
  audienceOverviewSessionsDemoLabels,
  audienceOverviewUsersDemoData,
  audienceOverviewUsersDemoDataLastWeek,
  audienceOverviewUsersDemoLabels,
  clicksChartDemoLabels,
  clicksChartDemoValues,
  conversionsChartDemoLabels,
  conversionsChartDemoValues,
  recentSalesChartDemoLabels,
  recentSalesChartDemoValues,
  recentSalesTableDemoData,
  salesChartDemoLabels,
  salesChartDemoValues,
  salesSummaryDemoData,
  salesSummaryDemoLabels,
  top5CategoriesDemoData,
  visitsChartDemoLabels,
  visitsChartDemoValues
} from '../demo-data/widget-demo-data';

/**
 * @class DashboardService
 * This is just a pages service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */

@Injectable()
export class DashboardService {

  url = environment.backend;
  apiUrl:any  = environment.apiUrl

  showLineToggle :any ;
  showTableToggle:any ;
  showSingleValueToggle:any;

  constructor(private http: HttpClient,private datePipe:DatePipe) {
    
  }
 getRecentSalesTableData() {
    // Simulating request from local data
    return of(recentSalesTableDemoData);
  }

  getDataTest(val){
    const headers = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'http://localhost:4200'});
    return this.http.get(this.apiUrl+val,{headers:headers})
  }

  getSales() {
    // Simulating request from local data
    return of({ labels: salesChartDemoLabels(), data: salesChartDemoValues }).pipe(
      map(values => this.toSalesChartData(values)
      )
      
    );
    
  }



  getSalesDummy(data,label){
    return of({ labels: label, data: data }).pipe(
      map(values => this.toSalesChartData(values)
      )
    );
  }

  /**
   * Converting Data from Server to Chart compatible format
   * @returns {Chart.ChartData}
   */
  toSalesChartData(chartData: { labels: string[], data: number[] }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: '# of Sales',
          data: chartData.data,
          backgroundColor: '#FFFFFF',
          barPercentage: 0.5
        }
      ]
    } as ChartData;
  }

  getVisitsDemo(val,label)
  {
    // visitsChartDemoLabels()
    return of({ labels: label, data: val }).pipe(
      map(values => this.toVisitsChartData(values))
    );
  }




  LineVisualData(x,y) {
    // Simulating request from local data

    return of({ labels: x, data: y }).pipe(
      map(values => this.toVisitsChartData(values))
    );
  }



  getVisits() {
    // Simulating request from local data
      return of({ labels: visitsChartDemoLabels(), data: visitsChartDemoValues }).pipe(
      map(values => this.toVisitsChartData(values))
    );
  }


  MyYaxisValue:any = "" ;
  mySelectedColor:any;

  toVisitsChartData(chartData: { labels: string[], data: number[] }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: 'value',
          data: chartData.data,
          backgroundColor: 'red',
          // #FFFFFF
          fill: false,
          borderColor: '#FFFFFF',
          borderWidth: 2,
          lineTension: 0,
          
        }
      ]
    } as ChartData;
  }

  getClicks() {
    // Simulating request from local data
    return of({ labels: clicksChartDemoLabels(), data: clicksChartDemoValues }).pipe(
      map(values => this.toClicksChartData(values))
    );
  }

  toClicksChartData(chartData: { labels: string[], data: number[] }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: '# of Clicks',
          data: chartData.data,
          fill: false,
          backgroundColor: '#FFFFFF',
          borderColor: '#FFFFFF',
          borderWidth: 2,
        }
      ]
    } as ChartData;
  }

  getConversions() {
    // Simulating request from local data

    return of({ labels: conversionsChartDemoLabels(), data: conversionsChartDemoValues }).pipe(
      map(values => this.toConversionsChartData(values))
    );
  }

  getConversionsDemo(label,value){
    return of({ labels: label, data: value }).pipe(
      map(values => this.toConversionsChartData(values))
    );
  }

  toConversionsChartData(chartData: { labels: string[], data: number[] }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: '# of Conversions',
          data: chartData.data,
          fill: false,
          backgroundColor: '#FFFFFF',
          borderColor: '#FFFFFF',
          borderWidth: 2,
          pointRadius: 0,
          lineTension: 0
        }
      ]
    } as ChartData;
  }

  getSalesSummary() {
    // Simulating request from local data
    return of({ labels: salesSummaryDemoLabels(), data: salesSummaryDemoData }).pipe(
      map(values => this.toSalesSummaryChartData(values))
    );
  }

  toSalesSummaryChartData(chartData: { labels: string[], data: { [set: string]: number[] } }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: '#7cb342',
          borderColor: '#7cb342',
          data: chartData.data.revenue
        },
        {
          label: 'Expenses',
          backgroundColor: '#EEEEEE',
          borderColor: '#EEEEEE',
          data: chartData.data.expenses
        }
      ]
    } as ChartData;
  }

  getTop5Categories() {
    // Simulating request from local data
    return of(top5CategoriesDemoData).pipe(
      map(values => this.toTop5CategoriesChartData(values))
    );
  }




  getTop5CategoriesDumm(data) {
    // Simulating request from local data
    return of(data).pipe(
      map(values => this.toTop5CategoriesChartData(values))
    );
  }




  toTop5CategoriesChartData(chartData: { label: string, value: number }[]) {
    return {
      labels: chartData.map(data => data.label),
      datasets: [
        {
          data: chartData.map(data => data.value),
          backgroundColor: ['#2196F3', '#009688', '#4CAF50', '#607D8B', '#E91E63']
        }
      ]
    } as ChartData;
  }






  getAudianceDummyData(records)
  {
    var labels = ["1","2","3","4","5","6","7","8","9"];
    // var recordss = [1,2,3]
    return of({
      labels: labels,
      data: { thisWeek: records}
    }).pipe(
      map(values => this.toAudienceOverviewUsersChartData(values))
    );
  }

  getAudienceOverviewUsers(x,y) {
    return of({
      labels: x,
      data: { mydata:y}
    }).pipe(
      map(values => this.toAudienceOverviewUsersChartData(values))
    );




    // return of({
    //   labels: audienceOverviewUsersDemoLabels(),
    //   data: { thisWeek: audienceOverviewUsersDemoData, lastWeek: audienceOverviewUsersDemoDataLastWeek }
    // }).pipe(
    //   map(values => this.toAudienceOverviewUsersChartData(values))
    // );
  }

  // toAudienceOverviewUsersChartData(chartData: { labels: string[], data: { [set: string]: number[] } }) {
    
    toAudienceOverviewUsersChartData(chartData) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Users',
          data: chartData.data.mydata,
          lineTension: 0,
          fill: false,
          borderColor: '#4285f4',
          pointRadius: 0
        },
        // {
        //   label: 'Users - Last Week',
        //   data: chartData.data.lastWeek,
        //   lineTension: 0,
        //   fill: false,
        //   borderColor: 'rgba(66, 133, 244, 0.3)',
        //   borderDash: [3, 5],
        //   pointRadius: 0
        // }
      ]
    } as ChartData;
  }

  getAudienceOverviewSessions() {
    // Simulating request from local data
    return of({
      labels: audienceOverviewSessionsDemoLabels(),
      data: { thisWeek: audienceOverviewSessionsDemoData, lastWeek: audienceOverviewSessionsDemoDataLastWeek }
    }).pipe(
      map(values => this.toAudienceOverviewSessionsChartData(values))
    );
  }

  toAudienceOverviewSessionsChartData(chartData: { labels: string[], data: { [set: string]: number[] } }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Sessions',
          data: chartData.data.thisWeek,
          lineTension: 0,
          fill: false,
          backgroundColor: '#4285f4',
          borderColor: '#4285f4',
        },
        {
          label: 'Sessions - Last Week',
          data: chartData.data.lastWeek,
          lineTension: 0,
          fill: false,
          borderColor: 'rgba(66, 133, 244, 0.3)',
          borderDash: [3, 5],
          pointRadius: 0
        }
      ]
    } as ChartData;
  }

  getAudienceOverviewBounceRate() {
    // Simulating request from local data
    return of({
      labels: audienceOverviewBounceRateDemoLabels(),
      data: { thisWeek: audienceOverviewBounceRateDemoData, lastWeek: audienceOverviewBounceRateDemoDataLastWeek }
    }).pipe(
      map(values => this.toAudienceOverviewBounceRateChartData(values))
    );
  }

  toAudienceOverviewBounceRateChartData(chartData: { labels: string[], data: { [set: string]: number[] } }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Bounce Rate',
          data: chartData.data.thisWeek,
          lineTension: 0,
          fill: false,
          backgroundColor: '#4285f4',
          borderColor: '#4285f4',
        },
        {
          label: 'Bounce Rate - Last Week',
          data: chartData.data.lastWeek,
          lineTension: 0,
          fill: false,
          borderColor: 'rgba(66, 133, 244, 0.3)',
          borderDash: [3, 5],
          pointRadius: 0
        }
      ]
    } as ChartData;
  }

  getAudienceOverviewSessionDuration() {
    // Simulating request from local data
    return of({
      labels: audienceOverviewSessionDurationDemoLabels(),
      data: { thisWeek: audienceOverviewSessionDurationDemoData, lastWeek: audienceOverviewSessionDurationDemoLastWeek }
    }).pipe(
      map(values => this.toAudienceOverviewSessionDurationChartData(values))
    );
  }

  toAudienceOverviewSessionDurationChartData(chartData: { labels: string[], data: { [set: string]: number[] } }) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Session Duration',
          data: chartData.data.thisWeek,
          lineTension: 0,
          fill: false,
          backgroundColor: '#4285f4',
          borderColor: '#4285f4',
        },
        {
          label: 'Session Duration - Last Week',
          data: chartData.data.lastWeek,
          lineTension: 0,
          fill: false,
          borderColor: 'rgba(66, 133, 244, 0.3)',
          borderDash: [3, 5],
          pointRadius: 0
        }
      ]
    } as ChartData;
  }

  getRecentSalesData() {
    return of({
      labels: recentSalesChartDemoLabels(),
      data: recentSalesChartDemoValues
    }).pipe(
      map(values => this.toRecentSalesChartData(values))
    );
  }


  
  toRecentSalesChartData(chartData: { labels: string[], data: number[] }) {
    return {
      labels: chartData.labels,
      datasets: [{
        label: 'Sales',
        backgroundColor: '#DBF6F9',
        borderColor: '#DBF6F9',
        data: chartData.data,
        lineTension: 0
      }]
    };
  }     

  getPiChartRecord(){
    const headers = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'http://localhost:4200'});
    return this.http.get(this.apiUrl+"GetAlltranasaction/2",{headers:headers})
    //  return this.http.get("./assets/test.txt")
  }
  transformData(lbl,data){
    return of({
      labels: lbl,
      data: data
    }).pipe(
      map(
        values => this.toAdvancedPieChartData(values)
        ))

  }

  getAdvancedPieChartData() {
    return of({
      labels: advancedPieChartDemoLabels,
      data: advancedPieChartDemoValues
    }).pipe(
      map(values => this.toAdvancedPieChartData(values))
    );

  }

  toAdvancedPieChartData(chartData: { labels: string[], data: number[] }) {
    return {
      labels: chartData.labels,
      datasets: [{
        label: 'Sales',
        backgroundColor: ['#009688', '#2196F3', '#9C27B0', '#00BCD4', '#F44336', '#FF9800'],
        borderColor: 'transparent',
        data: chartData.data,
      }]
    };
  }




  calculateFunctions(data){
    if(data === 'number' || data === 'decimal')
    {
      var functionData = [
        {key:'Average' , value:'average'},
        {key:'Minimum' , value:'minimum'},
        {key:'Maximum' , value:'maximum'},
        {key:'Sum' , value:'sum'},
        {key:'Count' , value:'count'},
        {key:'Count(unique)' , value:'count(unique)'},

      ]
    }
    else if(data=== 'string' || data=== 'text'){
      var functionData = [
        {key:'First' , value:'first'},
        {key:'Last' , value:'last'},
        {key:'Count' , value:'count'},
        {key:'Count(unique)' , value:'count(unique)'},
      ]
    }
    else if(data=== 'datetime'){
      var functionData = [
        {key:'Earliest' , value:'earliest'},
        {key:'Latest' , value:'latest'},
        {key:'Count' , value:'count'},
        {key:'Count(unique)' , value:'count(unique)'},
      ]
    }
    

    return functionData
  }
  getCalculatedValue(data,functionname){
    let value
    if(functionname=="average"){
     value=data.reduce((prev, curr) => parseInt(prev) + parseInt(curr)) / data.length;
    }
    if(functionname=="minimum"){
      value=Math.min(...data) 
     }
     if(functionname=="maximum"){
      value=Math.max(...data) 
     }
     if(functionname=="earliest"){
       let newdate=[]
      data.map(date=>{
        date=new Date(date)
        newdate.push(date)
      })
      value=new Date(Math.max.apply(null, newdate)); 
      value= this.datePipe.transform(value,  'dd-MMM-yyyy');
     }
     if(functionname=="latest"){
      let newdate=[]
     data.map(date=>{
       date=new Date(date)
       newdate.push(date)
     })
     value=new Date(Math.min.apply(null, newdate)); 
     value= this.datePipe.transform(value,  'dd-MMM-yyyy');
    }
    if(functionname=="first"){
      value=data[0];
     }
     if(functionname=="last"){
      value=data[data.length-1];
     }
    return value
  }



  // people: Array<number> = [1, 2, 3, 4, 5];
  total: number = 0;
  // arrayLength: number = this.people.length;
  average: number = 0;

  max: number = 0;
  min: number = 0;
  sd:number=0;

  // retunData:any = [];

  AverageList:any = []
  minimumList:any = [];
  maximumList:any = [];
  FirstList:any = [];
  LastList:any = [];
  sumlist:any = [];
  countLength:any = [];
  countUnique:any = []

  ImplimentCalculationFunctions( WholeData, data,functionName){
  this.AverageList = []
  this.minimumList = []
  this.maximumList = []
  this.FirstList = []
  this.LastList = []
  this.sumlist  = []
  this.countLength = [];
  this.countUnique = []

    if(functionName == "average"){
      for(var i = 0 ; i<data.length; i++)
      {
        var lengths  = data[i].values.length;
        this.total = data[i].values.reduce((a, b) => a + b);
        this.average = ((this.total) / lengths);
        this.AverageList.push(this.average);
        // this.AverageList.push({keys:data[i].Keys,values:this.average})
      }
      return this.AverageList
    }
    
    if(functionName == "minimum"){
      for(var  i = 0; i <data.length; i++){
        this.min = data[i].values.reduce((a, b) => Math.min(a, b));
        this.minimumList.push(this.min)
        // this.minimumList.push({keys:data[i].Keys,values:this.min})
      }
      return this.minimumList;
    }

    
    if(functionName == "maximum"){
      for(var  i = 0; i <data.length; i++){
        this.max = data[i].values.reduce((a, b) => Math.min(a, b));
        // this.maximumList.push({keys:data[i].Keys,values:this.max})
        this.maximumList.push(this.max)
      }
      return this.maximumList;
      // alert("MAX")
    }
    
    if(functionName == "first"){
      for(var  i = 0; i <data.length; i++){
        this.FirstList.push(data[i].values[0]);
        // this.FirstList.push({keys:data[i].Keys,values:data[i].values[0]})
      }
      return this.FirstList;
    }
    if(functionName == "last"){
      for(var  i = 0; i <data.length; i++){
        // this.LastList.push({keys:data[i].Keys,values:(data[i].values.length - 1 )});
        this.LastList.push(data[i].values.length - 1 )
      }
      return  this.LastList;
    }


    if(functionName == "sum"){
      for(var  i = 0; i <data.length; i++){
        // this.LastList.push({keys:data[i].Keys,values:(data[i].values.length - 1 )});
        this.sumlist.push(data[i].values.reduce((a, b) => a + b));
      }
      return this.sumlist;
    }

    if(functionName == "count"){
      for(var  i = 0; i <data.length; i++){
        this.countLength.push(data[i].values.length);
      }
      return this.countLength;
    }

    if(functionName == "count(unique)"){



for(var i = 0 ; i <data.length; i++)
{
  var a = data[i].values.filter(function(item, pos){
    return data[i].values.indexOf(item)== pos; 
  });
  this.countUnique.push(a.length);
}

      
      return this.countUnique;
    }
  }

}
