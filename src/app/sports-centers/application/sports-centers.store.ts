/** @summary Signal-based state management for sports centers. @author Juan Diego Flores Rios */
import {computed, inject, Injectable, signal} from '@angular/core';
import {forkJoin, tap} from 'rxjs';
import {SportsCentersService} from '../infrastructure/sports-centers.service';
import {Reservation} from '../domain/model/reservation.entity';

@Injectable({providedIn:'root'})
export class SportsCentersStore {
  private readonly api=inject(SportsCentersService);
  readonly centers=signal<{
    id: number;
    name: string;
    activityType: string;
    capacity: number;
    latitude: number;
    longitude: number;
  }[]>([]);
  readonly reservations=signal<Reservation[]>([]);
  readonly loading=signal(false);
  readonly error=signal(false);
  readonly activityTypes=['fitness','yoga','swimming','cycling'];
  readonly summaries=computed(()=>this.centers().map(center=>({center,reservations:this.reservations().filter(r=>r.sportsCenterId===center.id),total:this.total(center.id),available:this.available(center)})));
  load(){this.loading.set(true);this.error.set(false);forkJoin({centers:this.api.getCenters(),reservations:this.api.getReservations()}).subscribe({next:data=>{this.centers.set(data.centers);this.reservations.set(data.reservations);this.loading.set(false);},error:()=>{this.error.set(true);this.loading.set(false);}});}
  centerForActivity(activity:string|null){return this.centers().find(c=>c.activityType===activity);}
  total(centerId:number){return this.reservations().filter(r=>r.sportsCenterId===centerId).reduce((sum,r)=>sum+r.participants,0);}
  available(center:{
    id: number;
    name: string;
    activityType: string;
    capacity: number;
    latitude: number;
    longitude: number;
  }){return Math.max(0,center.capacity-this.total(center.id));}
  refreshReservations(){return this.api.getReservations().pipe(tap(items=>this.reservations.set(items)));}
  create(request:import('../domain/model/reservation.entity').ReservationRequest){return this.api.createReservation(request).pipe(tap(item=>this.reservations.update(items=>[...items,item])));}
  constructor(){this.load();}
}
