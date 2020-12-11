import { Manufacturer } from './manufacturer';
import { Model } from './model';

export class NewVehicleModelDTO{

    plate: string;
	model: Model;
	manufacturer: Manufacturer;
	color: string;
	status: boolean;
	
}