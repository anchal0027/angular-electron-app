  import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ALL_IN_ONE_TABLE_DEMO_DATA } from '../tables/all-in-one-table/all-in-one-table.demo';

@Component({
  selector: 'fury-offline-data',
  templateUrl: './offline-data.component.html',
  styleUrls: ['./offline-data.component.scss']
})
export class OfflineDataComponent implements OnInit {
  eventsSubject: Subject<any[]> = new Subject<any[]>();
  fs = (<any>window).require("fs");
  networkDrive = (<any>window).require("windows-network-drive");
  showColumnFilter:boolean=true;
  tableChart:any;
  TableSchema:any=[];
  offlineData:any;
  tableFields: any = { title: "Offline Data" }
  isLoaded:boolean=false;
  tableFormating: any = { foregroundColor: "", backgroundColor: "", horizantalAlign: "", textSize: "" }
  constructor() { }

  ngOnInit(): void {
    var self=this;
    this.networkDrive.list()
 .then(function (drives)
 {
  console.log(">>>>drives",drives)
  let op = Object.values(drives);
console.log(op);
   self.getdata(op[0]);
   console.log(">>>>drives",drives)
     // drives = {}
 });
//     this.tableChart=ALL_IN_ONE_TABLE_DEMO_DATA;
//     let keys= Object.keys(this.tableChart[0]);
//     this.isLoaded=true;
//     keys.map((key)=>{
//    this.TableSchema.push({
//    header: key, column: key, dataType: "text", format: "", visible: true, isModelProperty: true 
//  })
// })
   
}
getdata(z){
  console.log(">>>>z",`${z}\\test.json`)
  this.tableChart=[];
  this.TableSchema=[];
  this.fs.readFile(`${z}\\test.json`,"utf8", (err, data) => {
    if(err){
    console.log("No file found on path C:\\STM\\transaction.json")
    }
    else{
      this.offlineData=JSON.parse(data);
      console.log("data from offlineData",this.offlineData);
     //  this.fs.writeFile('C:\\Users\\bcs\\test.json', JSON.stringify(datas), function(err) {})
     this.tableChart=this.offlineData;
     let keys= Object.keys(this.tableChart[0]);
     this.isLoaded=true;
     keys.map((key)=>{
    this.TableSchema.push({
    header: key, column: key, dataType: "text", format: "", visible: true, isModelProperty: true 
  })
     })
    }
    
 })
}
refresh(e){
   this.getdata("z");
   setTimeout(()=>{
    this.eventsSubject.next(this.tableChart);
   },1000)
}
}
