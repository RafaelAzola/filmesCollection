import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filme } from 'src/app/models/filme.model';
import { Genero } from 'src/app/models/genero.model';
import { CriarFilmeService } from 'src/app/services/criar-filme/criar-filme.service';
import { CriarGeneroService } from 'src/app/services/criar-genero/criar-genero.service';

@Component({
  selector: 'app-dialog-filme',
  templateUrl: './dialog-filme.component.html',
  styleUrls: ['./dialog-filme.component.scss']
})
export class DialogFilmeComponent implements OnInit {

  form!: FormGroup;
  card!: Filme[];
  genero!: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private criarFilme: CriarFilmeService,
    private criarGenero: CriarGeneroService,
    public dialogRef: MatDialogRef<DialogFilmeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      genero: new FormControl('')
    })

    this.criarGenero.lerGeneros().subscribe({
      next:(genero: Genero[]) => {
        this.genero = genero
      }
    })
  }

  editarFilme(){
    const id = this.data
    const nome = this.form.controls["nome"].value;
    const genero = this.form.controls["genero"].value;
    const filme: Filme = {id: id, nome: nome, genero: genero};

    this.criarFilme.updateFilme(filme,this.data).subscribe({
      next: () => {
        this.fecharDialog()
      }
    })
  }

  fecharDialog(): void {
    this.dialogRef.close();
  }
}
