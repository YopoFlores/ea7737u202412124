/** @summary Toolbar, sidenav and language switcher. @author Juan Diego Flores Rios */
import {Component} from '@angular/core';
import {RouterLink,RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
@Component({selector:'app-layout',imports:[RouterLink,RouterOutlet,MatToolbarModule,MatSidenavModule,MatListModule,MatButtonModule,MatIconModule,TranslatePipe,LanguageSwitcher],templateUrl:'./layout.html',styleUrl:'./layout.css'})
export class Layout {protected readonly options=[{link:'/home',label:'layout.options.home'},{link:'/reservations/new',label:'layout.options.new-reservation'}];}
