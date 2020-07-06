import { Smer } from './../../models/smer.model';
import { Component, OnInit, Inject } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SmerService } from 'src/app/services/smer.service';
import { Grupa } from 'src/app/models/grupa.model';
import { Projekat } from 'src/app/models/projekat.model';
import { GrupaService } from 'src/app/services/grupa.service';
import { ProjekatService } from 'src/app/services/projekat.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
  grupe: Grupa[];
  projekti: Projekat[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public smerService: SmerService,
    public grupaService: GrupaService,
    public projekatService: ProjekatService,
    public studentService: StudentService) { }
    public add(): void {
      this.studentService.addStudent(this.data);
      this.snackBar.open("Uspešno dodat student: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public update(): void {
      this.studentService.updateStudent(this.data);
      this.snackBar.open("Uspešno ažuriran student: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public delete(): void {
      this.studentService.deleteStudent(this.data.id);
      this.snackBar.open("Uspešno obrisan student: " + this.data.id, 'Uredu', {
          duration:3000
      });
    }
    public cancel(): void {
      this.dialogRef.close();
      this.snackBar.open('Odustali ste', 'Uredu', {
        duration: 1000
      });


    }
    ngOnInit(): void {
      this.grupaService.getAllGrupa().subscribe(grupe =>
        this.grupe = grupe);
      this.projekatService.getAllProjekat().subscribe(projekti =>
          this.projekti = projekti);
    }
    compareTo(a,b){
      return a.id === b.id;
    }

}
