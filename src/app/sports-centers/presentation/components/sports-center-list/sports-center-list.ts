/** @summary Displays all sports centers in a responsive grid. @author Juan Diego Flores Rios */
import {Component,inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../application/sports-centers.store';
import {SportsCenterSummary} from '../sports-center-summary/sports-center-summary';
@Component({selector:'app-sports-center-list',imports:[TranslatePipe,SportsCenterSummary],template:`<section aria-labelledby="centers-heading"><h2 id="centers-heading">{{'home.my-centers'|translate}}</h2>@if(store.loading()){<p>{{'common.loading'|translate}}</p>}@if(store.error()){<p role="alert">{{'common.load-error'|translate}}</p>}<div class="centers-grid">@for(item of store.summaries();track item.center.id){<app-sports-center-summary [center]="item.center" [reservations]="item.reservations" [total]="item.total" [available]="item.available"/>}</div></section>`})
export class SportsCenterList {protected readonly store=inject(SportsCentersStore);}
