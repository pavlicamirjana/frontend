import { Component, OnInit, Inject } from '@angular/core';
import { ProjekatService } from 'src/app/services/projekat.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projekat-dialog',
  templateUrl: './projekat-dialog.component.html',
  styleUrls: ['./projekat-dialog.component.css']
})
export class ProjekatDialogComponent implements OnInit {

  public flag: number
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProjekatDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public projekatService: ProjekatService) { }
    public add(): void {
      this.projekatService.addProjekat(this.data);
      this.snackBar.open("Uspešno dodat projekat: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public update(): void {
      this.projekatService.updateProjekat(this.data);
      this.snackBar.open("Uspešno ažuriran projekat: " + this.data.naziv, 'Uredu', {
          duration:3000
      });
    }
    public delete(): void {
      this.projekatService.deleteProjekat(this.data.id);
      this.snackBar.open("Uspešno obrisan projekat: " + this.data.id, 'Uredu', {
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
  


