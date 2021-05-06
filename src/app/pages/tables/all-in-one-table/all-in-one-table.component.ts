import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { ALL_IN_ONE_TABLE_DEMO_DATA } from './all-in-one-table.demo';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import { Customer } from './customer-create-update/customer.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ConditionalExpr } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'fury-all-in-one-table',
  templateUrl: './all-in-one-table.component.html',
  styleUrls: ['./all-in-one-table.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class AllInOneTableComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  // $data: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];

  
columns:any = [];
private eventsSubscription: Subscription;
  @Input() events: Observable<any[]>;
  @Input() tableOptions:any=[];
  @Input() tableData: any[];
  @Input() threeDots :string ;
  @Input() cardDetails:any;
  @Input() showColumnFilter:boolean;
  @Output() removeTableCard=new EventEmitter()
  @Input() totalCharts:any;
  @Input() tableFields:any;
  @Input() background:string="";
  @Input() foreground:string="";
  @Input() font:string;
  @Input() align:string;
  @Input()tableFormating:any;
  pageSize = 8;
  @Output() refresh=new EventEmitter()
  
  dataSource: MatTableDataSource<Customer> | null;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,public db :DashboardService,private router:Router) {
    
  }

  get visibleColumns() {

    return this.columns.
    filter(column => column.visible).
    map(column => column.column);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(ALL_IN_ONE_TABLE_DEMO_DATA.map(customer => new Customer(customer)));
  }

  ngOnInit() {
    if(this.tableFormating && (this.tableFormating.backgroundColor=="" || this.tableFormating.backgroundColor=="#undefined" )){
      this.tableFormating.backgroundColor="#F0F0F0"
    }
    if(this.tableFormating && (this.tableFormating.foregroundColor=="" || this.tableFormating.foregroundColor=="#undefined")){
      this.tableFormating.foregroundColor="#000000"
    }
    // console.log(">>>>back",this.background)
    // if(this.background==" " || this.background=="#undefined" ){
    //   this.background="#F0F0F0"
    // }
    // if(this.foreground==" " || this.foreground=="#undefined"){
    //   this.foreground="#000000"
    // }
    if(this.events){
      this.eventsSubscription = this.events.subscribe((data) => {
        this.dataSource.data = data;
        // this.eventsSubscription.unsubscribe();
      });
    }
    
    // this.columns = this.tableOptions
    //   this.subject$.next(this.tableData);
    // setTimeout(() => {
    //   this.columns = this.tableOptions
    //   this.subject$.next(this.tableData);
    //   // console.log("HEADING",this.name);
      
    // }, 980);
    this.columns = this.tableOptions
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.tableData;
    // this.data$.pipe(
    //   filter(data => !!data)
    // ).subscribe((customers) => {
    //   this.customers = customers;
    //   console.log(">>>>customers",this.customers)
    //   this.dataSource.data = customers;
    // });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // createCustomer() {
  //   this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {

  //     /**
  //      * Customer is the updated customer (if the user pressed Save - otherwise it's null)
  //      */
  //     if (customer) {
  //       /**
  //        * Here we are updating our local array.
  //        * You would probably make an HTTP request here.
  //        */
  //       this.customers.unshift(new Customer(customer));
  //       this.subject$.next(this.customers);
  //     }
  //   });
  // }

  // updateCustomer(customer) {
  //   this.dialog.open(CustomerCreateUpdateComponent, {
  //     data: customer
  //   }).afterClosed().subscribe((customer) => {
  //     /**
  //      * Customer is the updated customer (if the user pressed Save - otherwise it's null)
  //      */
  //     if (customer) {
  //       /**
  //        * Here we are updating our local array.
  //        * You would probably make an HTTP request here.
  //        */
  //       const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id);
  //       this.customers[index] = new Customer(customer);
  //       this.subject$.next(this.customers);
  //     }
  //   });
  // }

  // deleteCustomer(customer) {
  //   /**
  //    * Here we are updating our local array.
  //    * You would probably make an HTTP request here.
  //    */
  //   this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
  //   this.subject$.next(this.customers);
  // }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
  }

  
  RemoveCardd()
  {
   
    this.totalCharts.map((chart,i)=>{
      if(chart.id==this.cardDetails.id){
        this.totalCharts.splice(i,1);
        localStorage.setItem("tablechart",JSON.stringify(this.totalCharts))
        this.removeTableCard.emit();
      }
    })
  }
  edit(){
    this.router.navigate(['/graphs'], { queryParams: { type: 'table',id: this.cardDetails.id} });
  }
    // this.db.showTableToggle = 'HIDE'
    // localStorage.setItem('TableShow','HIDE');
    refreshList(e){
      this.refresh.emit();
    }
}
