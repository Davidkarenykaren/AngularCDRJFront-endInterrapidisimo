import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceInter } from '../servicio/serviceinter';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Cliente',
  imports: [CommonModule,
            ReactiveFormsModule, 
            NgIf],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente {

   constructor(private fb: FormBuilder, private service: ServiceInter) { } 

   formCliente!: FormGroup;

   clientes: any[] = [];

    ngOnInit() {
    this.formCliente = this.fb.group({
          nombre: ['', Validators.required],
      documento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paisId: ['', Validators.required],
      departamentoId: ['', Validators.required],
      ciudadId: ['', Validators.required],
      });

       this.cargarClientes();
  }

  cargarClientes() {
    this.service.getClientes().subscribe(data => this.clientes = data);

    console.log(this.clientes);
  }


  onSubmit(): void{
   

    if (this.formCliente.valid) { // Opcional: verificar la validez del formulario
      console.log('Datos del formulario:', this.formCliente.value); // Accede a los valores

       this.service.crearCliente(this.formCliente.value).subscribe({
      next: (data) => {
        console.log("Exitoso guardado")
        this.service.getClientes();
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
      }
    });

      // Aquí puedes enviar los datos a un servicio o API
    } else {
       this.markAllAsTouched(this.formCliente);
      console.log('Formulario inválido. No se enviaron datos.');
    }


  }


  markAllAsTouched(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    control?.markAsTouched({ onlySelf: true });
  });
}

}
