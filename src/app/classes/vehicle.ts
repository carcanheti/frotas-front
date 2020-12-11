import { Manufacturer } from './manufacturer';
import { Model } from './model';

export class Vehicle {

    id: number;
    plate: string;
    manufacturer: Manufacturer;
    model: Model;
    color: string;
    status: boolean;
}