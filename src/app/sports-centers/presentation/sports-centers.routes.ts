/** @summary Sports center bounded-context child routes. @author Juan Diego Flores Rios */
import {Routes} from '@angular/router';
export const sportsCentersRoutes:Routes=[{path:'new',loadComponent:()=>import('./views/new-reservation/new-reservation').then(m=>m.NewReservation)}];
