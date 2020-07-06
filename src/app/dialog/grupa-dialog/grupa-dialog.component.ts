import { Smer } from './../../models/smer.model';
import { Component, OnInit, Inject } from '@angular/core';
import { GrupaService } from 'src/app/services/grupa.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SmerService } from 'src/app/services/smer.service';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {
  smerovi: Smer[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GrupaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public smerService: SmerService,
    public grupaService: GrupaService) { }
    public add(): void {
      this.grupaService.addGrupa(this.data);
      this.snackBar.open("Uspešno dodat grupa: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public update(): void {
      this.grupaService.updateGrupa(this.data);
      this.snackBar.open("Uspešno ažuriran grupa: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public delete(): void {
      this.grupaService.deleteGrupa(this.data.id);
      this.snackBar.open("Uspešno obrisan grupa: " + this.data.id, 'Uredu', {
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
      this.smerService.getAllSmer().subscribe(smerovi =>
        this.smerovi = smerovi);
    }
    compareTo(a,b){
      return a.id === b.id;
    }

}