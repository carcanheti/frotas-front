import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateVehicleComponent } from './pages/update-vehicle/update-vehicle.component';

const routes: Routes = [


{ 
  path: "" , component: HomeComponent 
},

{ 
  path: "update/create" , component: UpdateVehicleComponent
},

{ 
  path: "vehicle/update/:id" , component: UpdateVehicleComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
