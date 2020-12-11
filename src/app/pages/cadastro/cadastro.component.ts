import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Utils } from 'src/app/classes/utils';
import { VehicleModelDTO } from 'src/app/classes/vehicleModelDTO';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, AfterViewInit{
 

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

@ViewChild(MatTable, {static: false}) table: MatTable<any>;
@ViewChild(MatSort, { static: false }) sort: MatSort;
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

dataSource = new MatTableDataSource<VehicleModelDTO>();

@Input() pageSize: string[] = ['5', '10', '25', '100'];

formDegreeRisk: FormGroup;

filterValue: any;

displayedColumns: string[] = ['plate', 'model',
  'manufacturer', 'status',  'action'];

utils = new Utils(this.snackBar);

disableSave: boolean = false;

disableEdit: boolean = false;

displayProgressSpinner = false;

disableButtom: boolean = false;

resultsLength = 0;

constructor(
  private vehicleService: VehicleService,
  private snackBar: MatSnackBar, 
  private router: Router) {
  
}

 
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  
  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.vehicleService.getVehiclePaginator(this.paginator.pageIndex, this.paginator.length,
            this.sort.direction, this.filterValue);
        }),
        map(data => {
          this.resultsLength = data.total_count;
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }


ngOnInit() {
  this.getAllValuesVehicles();
  this.disableEdit = true;
  this.disableSave = false;
 

}

private getAllValuesVehicles(): void {
  this.vehicleService.getAllVehicle().subscribe(res => {
    this.dataSource.data = res;

  })
}

private onCreate(): void {
  this.router.navigate(['update/create']);

}

reset() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue;
    this.disableSave = false;
    this.disableEdit = true;

}

applyFilter(event: any) {
  this.filterValue = (event.target as HTMLInputElement).value;

  this.dataSource.filter = this.filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}

getRecord(value) {
  this.disableSave = true;
  this.disableEdit = false;

 

}

sortData = (sort: Sort) =>{
  this.dataSource.data.sort( (a, b) => {

   let isAsc = sort.direction == 'asc';
   switch (sort.active) {
     case 'plate': return this.compare(a.plate, b.plate, isAsc);
     case 'model': return this.compare(+a.model, +b.model, isAsc);
   
     default: return 0;
   }
  })
}

compare(a, b, isAsc) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

}
