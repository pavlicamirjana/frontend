import { Smer } from './../models/smer.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SmerService } from '../services/smer.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SmerDialogComponent } from '../dialog/smer-dialog/smer-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-smer',
  templateUrl: './smer.component.html',
  styleUrls: ['./smer.component.css']
})
export class SmerComponent implements OnInit {

  displayedColumns=['id', 'naziv', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<Smer>;
  database: SmerService | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;


  constructor(public httpClient: HttpClient, public smerService: SmerService,
    
    public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, naziv: string, oznaka: string){
    const dialogRef = this.dialog.open(SmerDialogComponent, {data: { id:id, naziv:naziv, oznaka:oznaka }});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.loadData();
      }

    })
  }
  ngOnInit(): void {
    this.loadData()
  }

  public loadData(){
    this.smerService.getAllSmer().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property){
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
