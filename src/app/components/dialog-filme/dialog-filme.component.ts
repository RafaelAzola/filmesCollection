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

  // Cria um array para receber os valores de Generos e Filmes
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

    // Recebe valores dos inputs
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      genero: new FormControl('')
    })

    // Lê os Generos no DB e transforma em objetos na array declarada
    this.criarGenero.lerGeneros().subscribe({
      next:(genero: Genero[]) => {
        this.genero = genero
      }
    })
  }

  editarFilme(){

    // Recebe o Id enviado ao abrir o dialog
    const id = this.data

    // Salva os valores do array no DB
    const nome = this.form.controls["nome"].value;
    const genero = this.form.controls["genero"].value;
    const filme: Filme = {id: id, nome: nome, genero: genero};

    this.criarFilme.updateFilme(filme,this.data).subscribe({
      next: () => {
        this.fecharDialog()
      }
    })
  }

  // Metodo para fechar o dialog
  fecharDialog(): void {
    this.dialogRef.close();
  }
}
