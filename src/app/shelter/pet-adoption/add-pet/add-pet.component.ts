import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { PetAdoptService } from 'src/app/services/pet-adopt.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.less']
})
export class AddPetComponent {
  pet: Pet;
  genderOptions = [
    {
      id: '0', value: 'Cái'
    },
    {
      id: '1', value: 'Đực'
    }
  ]
  listStatus = [
    {
      id: 'sterilized', value: 'Xổ giun', checked: false
    },
    {
      id: 'deWormed', value: 'Triệt sản', checked: false
    },
    {
      id: 'vaccinated', value: 'Tiêm phòng', checked: false
    },
    {
      id: 'friendly', value: 'Thân thiện', checked: false
    }
  ]
  constructor(private petService: PetAdoptService, public ref: DynamicDialogRef, private builder: FormBuilder,) { }

  addPetForm = this.builder.group({
    petBreed: this.builder.control(''),
    petGender: this.builder.control(''),
    petColor: this.builder.control(''),
    petAge: this.builder.control(''),

  })

  ngOnInit() {
  }

  onStatusChange(event){
    if(event.checked.length > 0){
      console.log(event.checked[0].id)
    }
  }
}
