/** @summary Converts API resources to reservation domain objects.
 * @author Juan Diego Flores Rios
 **/
import { Reservation } from '../domain/model/reservation.entity';
export class ReservationAssembler {
  static toEntity(resource: Reservation): Reservation {
    return { ...resource };
  }
}
