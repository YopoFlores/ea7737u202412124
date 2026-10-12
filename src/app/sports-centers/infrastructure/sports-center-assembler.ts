/** @summary Converts API resources to sports center domain objects.
 * @author Juan Diego Flores Rios
 **/
export class SportsCenterAssembler {
  static toEntity(resource: {
    id: number;
    name: string;
    activityType: string;
    capacity: number;
    latitude: number;
    longitude: number;
  }): {
    id: number;
    name: string;
    activityType: string;
    capacity: number;
    latitude: number;
    longitude: number;
  } {
    return { ...resource };
  }
}
