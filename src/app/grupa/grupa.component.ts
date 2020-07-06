import { GrupaDialogComponent } from './../dialog/grupa-dialog/grupa-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, bindCallback } from 'rxjs';
import { Grupa } from '../models/grupa.model';
import { GrupaService } from '../services/grupa.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Smer } from '../models/smer.model';
import { SmerService } from '../services/smer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit {
  displayedColumns=['id', 'oznaka', 'smer', 'actions'];
  dataSource: MatTableDataSource<Grupa>;
  database: GrupaService | null;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  
  selektovanaGrupa: Grupa;

  constructor(public httpClient: HttpClient, public grupaService: GrupaService,
    
  public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, oznaka: string, smer: Smer){
    const dialogRef = this.dialog.open(GrupaDialogComponent, {data: { id:id, oznaka:oznaka, smer:smer }});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.loadData();
      }

    })
  }
  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.grupaService.getAllGrupa().subscribe(data => {
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

  public selectRow(row){
    this.selektovanaGrupa = row;
  }

  compareTo(a,b){
    return a.id === b.id;
  }
}