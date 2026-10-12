/** @summary Reservation domain entity.
 * @author Juan Diego Flores Rios
 **/
export interface Reservation {
  id: number;
  sportsCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
export type ReservationRequest = Omit<Reservation, 'id'>;
