/** @summary API endpoint configuration.
 * @author Juan Diego Flores Rios
 **/
import { environment } from '../../../environments/environment';
export const sportsCentersEndpoint =
  environment.apiBaseUrl + environment.sportsCentersPath;
export const reservationsEndpoint =
  environment.apiBaseUrl + environment.reservationsPath;
