import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Genero } from 'src/app/models/genero.model';
import { CriarGeneroService } from 'src/app/services/criar-genero/criar-genero.service';

@Component({
  selector: 'app-dialog-genero',
  templateUrl: './dialog-genero.component.html',
  styleUrls: ['./dialog-genero.component.scss']
})
export class DialogGeneroComponent implements OnInit {

  form!: FormGroup;
  card!: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private criarGenero: CriarGeneroService,
    public dialogRef: MatDialogRef<DialogGeneroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: new FormControl('')
    })
  }

  editarGenero(){
    const id = this.data
    const nome = this.form.controls["nome"].value;
    const genero: Genero = {id: id, nome: nome};

    this.criarGenero.updateGenero(genero,this.data).subscribe({
      next: () => {
        this.fecharDialog()
      }
    })
  }

  fecharDialog(): void {
    this.dialogRef.close();
  }
}
