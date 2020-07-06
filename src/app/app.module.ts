import { GrupaDialogComponent } from './dialog/grupa-dialog/grupa-dialog.component';
import { RouterModule} from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'

import { AppComponent } from './app.component';
import { VoziloComponent } from './vozilo/vozilo.component';
import { AutomobilComponent } from './vozilo/automobil/automobil.component';
import { ProjekatComponent } from './projekat/projekat.component';
import { SmerComponent } from './smer/smer.component';
import { GrupaComponent } from './grupa/grupa.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './core/home/home.component';
import { AuthorComponent } from './core/author/author.component';
import { AboutComponent } from './core/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjekatService } from './services/projekat.service';
import { ProjekatDialogComponent } from './dialog/projekat-dialog/projekat-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SmerDialogComponent } from './dialog/smer-dialog/smer-dialog.component';
import { SmerService } from './services/smer.service';
import { GrupaService } from './services/grupa.service';
import { StudentService } from './services/student.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { StudentDialogComponent } from './dialog/student-dialog/student-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const Routes = [{path: 'projekat', component: ProjekatComponent},
{path:'smer', component:SmerComponent},
{path: 'grupa', component:GrupaComponent},
{path:'student', component:StudentComponent},
{path:'home', component:HomeComponent}, 
{path:'about', component:AboutComponent},
{path:'author', component: AuthorComponent},
{path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent, VoziloComponent, AutomobilComponent, ProjekatComponent, SmerComponent, GrupaComponent, StudentComponent, HomeComponent, AuthorComponent, AboutComponent, ProjekatDialogComponent, SmerDialogComponent, GrupaDialogComponent, StudentDialogComponent
  ],
  imports: [
    BrowserModule, 
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [ProjekatService, SmerService, GrupaService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
