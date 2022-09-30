import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Filme } from 'src/app/models/filme.model';
import { Genero } from 'src/app/models/genero.model';
import { CriarFilmeService } from 'src/app/services/criar-filme/criar-filme.service';
import { CriarGeneroService } from 'src/app/services/criar-genero/criar-genero.service';
import { DialogFilmeComponent } from '../dialog-filme/dialog-filme.component';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  // Cria um array para receber os valores de Genero e de Filmes
  form!: FormGroup;
  card!: Filme[];
  genero!: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private criarFilme: CriarFilmeService,
    private criarGenero: CriarGeneroService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // Recebe valores dos inputs
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      genero: new FormControl('')
    })

    // Lê os Filmes no DB e transforma em objetos na array declarada
    this.criarFilme.lerFilmes().subscribe({
      next:(filme: Filme[]) => {
        this.card = filme
      }
    })

    // Lê os Generos no DB e transforma em objetos na array declarada
    this.criarGenero.lerGeneros().subscribe({
      next:(genero: Genero[]) => {
        this.genero = genero
      }
    })
  }

  cadastrarFilme(){

    // Gera Id nova baseada na ultima Id no Db
    const id = (this.card[(this.card.length)-1].id) +1;

    // Salva os valores do array no DB
    const nome = this.form.controls["nome"].value;
    const genero = this.form.controls["genero"].value;
    const filme: Filme = {id: id, nome: nome, genero: genero};

    this.criarFilme.salvarFilme(filme).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  // Usa o metodo delete do service
  removerFilme(id: any){
    this.criarFilme.deletarFilme(id).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  // Pega o Id do objeto e abre um Dialog
  editarFilme(id: any){
    this.dialog.open(DialogFilmeComponent,{data:{id}})
    this.dialog.afterAllClosed.subscribe(
      result => {
        this.ngOnInit()
      }
    )
  }
}
