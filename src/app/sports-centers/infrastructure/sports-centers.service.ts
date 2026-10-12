/** @summary HTTP access to sports centers and reservations. @author Juan Diego Flores Rios */
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation, ReservationRequest} from '../domain/model/reservation.entity';
import {SportsCenterAssembler} from './sports-center-assembler';
import {ReservationAssembler} from './reservation-assembler';
import {sportsCentersEndpoint, reservationsEndpoint} from './sports-centers-api-endpoint';
@Injectable({providedIn:'root'})
export class SportsCentersService {
  private readonly http=inject(HttpClient);
  getCenters(){return this.http.get<SportsCenter[]>(sportsCentersEndpoint).pipe(map(items=>items.map(SportsCenterAssembler.toEntity)));}
  getReservations(){return this.http.get<Reservation[]>(reservationsEndpoint).pipe(map(items=>items.map(ReservationAssembler.toEntity)));}
  createReservation(request:ReservationRequest){return this.http.post<Reservation>(reservationsEndpoint,request);}
}
