/** @summary Open-Meteo API client.
 * @author Juan Diego Flores Rios
 **/
import {inject,Injectable} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {map} from 'rxjs';
import {environment} from '../../../environments/environment';
import {WeatherResponse} from './weather-response';
import {WeatherAssembler} from './weather-assembler';
@Injectable({providedIn:'root'})

export class WeatherService {
  private readonly http=inject(HttpClient);
  getCurrent(latitude:number,longitude:number){const params=new HttpParams().set('latitude',latitude).set('longitude',longitude).set('current','temperature_2m');return this.http.get<WeatherResponse>(environment.weatherBaseUrl,{params}).pipe(map(WeatherAssembler.toEntity));}
}
