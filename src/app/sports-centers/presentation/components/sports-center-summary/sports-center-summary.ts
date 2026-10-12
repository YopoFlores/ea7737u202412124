/** @summary Sports center capacity summary card. @author Juan Diego Flores Rios */
import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {Reservation} from '../../../domain/model/reservation.entity';

@Component({selector:'app-sports-center-summary',imports:[MatCardModule,TranslatePipe],templateUrl:'./sports-center-summary.html'})
export class SportsCenterSummary {readonly center=input.required<{
    id: number;
    name: string;
    activityType: string;
    capacity: number;
    latitude: number;
    longitude: number;
}>();readonly reservations=input.required<Reservation[]>();readonly total=input.required<number>();readonly available=input.required<number>();}
