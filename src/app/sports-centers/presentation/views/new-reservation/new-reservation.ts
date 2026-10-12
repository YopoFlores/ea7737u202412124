/** @summary Reactive reservation form with weather and capacity checks. @author Juan Diego Flores Rios */
import {Component,inject,signal} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {switchMap,throwError} from 'rxjs';
import {SportsCentersStore} from '../../../application/sports-centers.store';
import {WeatherService} from '../../../../weather/infrastructure/weather.service';
/** Rejects whitespace-only names. */
function nonBlank(control:AbstractControl):ValidationErrors|null{return typeof control.value==='string'&&!control.value.trim()?{blank:true}:null;}
@Component({selector:'app-new-reservation',imports:[ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatButtonModule,TranslatePipe],templateUrl:'./new-reservation.html',styleUrl:'./new-reservation.css'})
export class NewReservation {
 protected readonly store=inject(SportsCentersStore);
 private readonly weather=inject(WeatherService);
 private readonly router=inject(Router);
 protected readonly form=new FormGroup({activityType:new FormControl('',{nonNullable:true,validators:[Validators.required]}),participantName:new FormControl('',{nonNullable:true,validators:[Validators.required,nonBlank]}),participants:new FormControl(1,{nonNullable:true,validators:[Validators.required,Validators.min(1),Validators.pattern(/^[0-9]+$/)]})});
 protected readonly temperature=signal<number|null>(null);
 protected readonly weatherLoading=signal(false);
 protected readonly weatherError=signal(false);
 protected readonly saving=signal(false);
 protected readonly error=signal('');
 protected get selectedCenter(){return this.store.centerForActivity(this.form.controls.activityType.value);}
 protected selectActivity(){this.temperature.set(null);this.weatherError.set(false);const center=this.selectedCenter;if(!center)return;this.weatherLoading.set(true);this.weather.getCurrent(center.latitude,center.longitude).subscribe({next:value=>{this.temperature.set(Number.isFinite(value.temperatureCelsius)?value.temperatureCelsius:null);this.weatherError.set(this.temperature()===null);this.weatherLoading.set(false);},error:()=>{this.weatherError.set(true);this.weatherLoading.set(false);}});}
 protected submit(){this.form.markAllAsTouched();this.error.set('');const center=this.selectedCenter;const temperature=this.temperature();if(this.form.invalid||!center||temperature===null||this.saving())return;this.saving.set(true);this.store.refreshReservations().pipe(switchMap(()=>{const available=this.store.available(center);const count=this.form.controls.participants.value;if(count>available)return throwError(()=>new Error('capacity'));return this.store.create({sportsCenterId:center.id,activityType:center.activityType,participantName:this.form.controls.participantName.value.trim(),participants:count,weatherTemperature:temperature,reservedAt:new Date().toISOString()});})).subscribe({next:()=>{this.saving.set(false);this.router.navigate(['/home']);},error:err=>{this.saving.set(false);this.error.set(err.message==='capacity'?'capacity':'save');}});}
 protected cancel(){this.router.navigate(['/home']);}
}
