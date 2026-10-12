/** @summary UrbanFit home view. @author Juan Diego Flores Rios */
import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCenterList} from '../../../../sports-centers/presentation/components/sports-center-list/sports-center-list';
@Component({selector:'app-home',imports:[TranslatePipe,SportsCenterList],templateUrl:'./home.html',styleUrl:'./home.css'})
export class Home {}
