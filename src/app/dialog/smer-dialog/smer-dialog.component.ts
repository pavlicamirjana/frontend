import { Component, OnInit, Inject } from '@angular/core';
import { SmerService } from 'src/app/services/smer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrls: ['./smer-dialog.component.css']
})
export class SmerDialogComponent implements OnInit {

  public flag: number
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SmerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public smerService: SmerService) { }
    public add(): void {
      this.smerService.addSmer(this.data);
      this.snackBar.open("Uspešno dodat smer: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public update(): void {
      this.smerService.updateSmer(this.data);
      this.snackBar.open("Uspešno ažuriran smer: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public delete(): void {
      this.smerService.deleteSmer(this.data.id);
      this.snackBar.open("Uspešno obrisan smer: " + this.data.id, 'Uredu', {
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
    }


}