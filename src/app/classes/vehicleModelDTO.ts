import { Manufacturer } from './manufacturer';
import { Model } from './model';

export class VehicleModelDTO {

    id: number;
    plate: string;
	model: Model;
	manufacturer: Manufacturer;
	color: string;
	status: boolean;
}