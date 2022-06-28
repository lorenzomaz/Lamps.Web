import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lamp } from '../lamp';

@Component({
  selector: 'app-add-lamp',
  templateUrl: './add-lamp.component.html',
  styleUrls: ['./add-lamp.component.css']
})
export class AddLampComponent {

  lampform: FormGroup;
  count: number = 1;
  lamp: Array<Lamp> = new Array<Lamp>();

  lampRandom: Array<Lamp> = [
    {
      // id: 0,
      name: "Paralume Esse",
      img: "test",
      info: "description",
      width: 50,
      height: 40,
      price: 70,
    },
    {
      // id: 0,
      name: "Lampada da terra",
      img: "path img",
      info: "description",
      width: 40,
      height: 180,
      price: 210,
    },
    {
      // id: 0,
      name: "Lampada Zen",
      img: "path img",
      info: "description",
      width: 30,
      height: 70,
      price: 110,
    },
    {
      // id: 0,
      name: "Paralume Classic",
      img: "path img",
      info: "description",
      width: 50,
      height: 60,
      price: 70,
    },
  ]

  constructor(
    private dialogRef: MatDialogRef<AddLampComponent>,
  ) {

    this.lampform = new FormGroup({
      quantity: new FormControl(null, [Validators.required]),
    })

  }

  generateLamp() {
    const lampIndex = Math.floor(Math.random() * this.lampRandom.length);
    return this.lampRandom[lampIndex];
  }

  generateLampLoop(){
    for (let i = 0; i < this.lampform.get("quantity")?.value; i++) {

      const lampada = this.generateLamp();

      this.lamp.push(lampada)
    }
  }

  onSubmit() {
    if (this.lampform.valid) {

      this.generateLampLoop();
      // this.lampService.addLamps(this.lamp).subscribe(r => console.log("results", r));
      this.dialogRef.close(this.lamp);
    }

  }


}
