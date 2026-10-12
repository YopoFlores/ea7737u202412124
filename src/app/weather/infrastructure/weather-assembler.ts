/** @summary Maps Open-Meteo snake_case fields to domain naming.
 *  @author Juan Diego Flores Rios
 **/
import {WeatherResponse} from './weather-response';
import {Weather} from '../domain/model/weather.entity';
export class WeatherAssembler {static toEntity(response:WeatherResponse):Weather{return {temperatureCelsius:response.current.temperature_2m};}}
