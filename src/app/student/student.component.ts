import { StudentDialogComponent } from './../dialog/student-dialog/student-dialog.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, bindCallback } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Smer } from '../models/smer.model';
import { SmerService } from '../services/smer.service';
import { Grupa } from '../models/grupa.model';
import { Projekat } from '../models/projekat.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  displayedColumns=['id', 'ime', 'prezime', 'broj_indeksa', 'grupa', 'projekat','actions'];
  dataSource: MatTableDataSource<Student>;
  database: StudentService | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  selektovanaGrupa: Grupa;
  constructor(public httpClient: HttpClient, public studentService: StudentService,
  
  public dialog: MatDialog) { }

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojIndeksa: string, grupa: Grupa, projekat: Projekat ){
    const dialogRef = this.dialog.open(StudentDialogComponent, {data: { id:id, ime:ime, prezime:prezime, brojIndeksa:brojIndeksa, grupa:grupa, projekat:projekat  }});
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
  ngOnChanges(){
    if(this.selektovanaGrupa.id){
      //this.loadData();
      this.studentService.getStudentZaGrupa(this.selektovanaGrupa.id).subscribe(data => {
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
  }

  public loadData(){
    this.studentService.getAllStudent().subscribe(data => {
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
  compareTo(a,b){
    return a.id === b.id;
  }
}