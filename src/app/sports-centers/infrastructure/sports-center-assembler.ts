/** @summary Converts API resources to sports center domain objects.
 * @author Juan Diego Flores Rios
 **/
import { SportsCenter } from '../domain/model/sports-center.entity';
export class SportsCenterAssembler {
  static toEntity(resource: SportsCenter): SportsCenter {
    return { ...resource };
  }
}
