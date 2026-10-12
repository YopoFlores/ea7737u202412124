/** @summary Semantic application routing. @author Juan Diego Flores Rios */
import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';
export const routes:Routes=[{path:'home',component:Home,title:'UrbanFit - Home'},{path:'reservations',loadChildren:()=>import('./sports-centers/presentation/sports-centers.routes').then(m=>m.sportsCentersRoutes)},{path:'',redirectTo:'/home',pathMatch:'full'},{path:'**',loadComponent:()=>import('./shared/presentation/views/page-not-found/page-not-found').then(m=>m.PageNotFound)}];
