import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/classes/vehicle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manufacturer } from 'src/app/classes/manufacturer';
import { Model } from 'src/app/classes/model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Utils } from 'src/app/classes/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { NewVehicleModelDTO } from 'src/app/classes/newVehicleModelDTO';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.scss']
})
export class UpdateVehicleComponent implements OnInit {

  formVehicle: FormGroup;

  filterValue: any;
  paremtersInput: NewVehicleModelDTO = new NewVehicleModelDTO();

  listModel: Model[] = [{ id: 1, name: 'Fiesta Sedan', manufacturer: { id: 1, name: 'FORD' } }];
  listaManufacturer: Manufacturer[] = [{ id: 1, name: 'FORD' }];
  color: string;

  listStatus: any[] = [{ id: 1, name: 'active' }, { id: 2, name: 'inative' }];
  statusChecked: any;

  selectedModel: string;
  selectedManufacturer: string;

  disableButtonSave: false

  utils = new Utils(this.snackBar);

  constructor(private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.creatForm(new Vehicle);
  }

  creatForm(vehicle: Vehicle) {
    this.formVehicle = this.formBuilder.group({
      plate: [vehicle.plate, Validators.required],
      model: [vehicle.model, Validators.required],
      manufacturer: [vehicle.manufacturer, Validators.required],
      color: [vehicle.color, Validators.required],
      status: [vehicle.status],

    })

  }

  get dadosForm() {
    return this.formVehicle.controls;
  }

  onChangeValueModel(event) {

  }

  onChangeValueManufacturer(event) {

  }

  onSubmit() {
    this.vehicleService.saveVehicle(this.parseFormToVehicle()).subscribe(resp => {
      this.utils.showMessageSucess('Registro salvo com sucesso'),
      this.formVehicle.clearValidators();
    }),
      error => this.utils.showMessageError(error)
    
  }

  reset() {
    this.formVehicle.reset();
    this.filterValue = '';
    this.disableButtonSave = false;

  }

  private parseFormToVehicle(): NewVehicleModelDTO {
    this.paremtersInput.color = this.dadosForm.color.value;
    this.paremtersInput.status = this.dadosForm.status.value;
    this.paremtersInput.plate = this.dadosForm.plate.value;
    this.paremtersInput.model = this.dadosForm.model.value;
    this.paremtersInput.manufacturer = this.dadosForm.manufacturer.value;
    return this.paremtersInput;
  }


}
