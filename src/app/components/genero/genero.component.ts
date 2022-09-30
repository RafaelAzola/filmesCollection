import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Genero } from 'src/app/models/genero.model';
import { CriarGeneroService } from 'src/app/services/criar-genero/criar-genero.service';
import { DialogGeneroComponent } from '../dialog-genero/dialog-genero.component';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  // Cria um array para receber os valores de Genero
  form!: FormGroup;
  card!: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private criarGenero: CriarGeneroService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // Recebe valores dos inputs
    this.form = this.formBuilder.group({
      nome: new FormControl('')
    })

    // Lê os Generos no DB e transforma em objetos na array declarada
    this.criarGenero.lerGeneros().subscribe({
      next:(genero: Genero[]) => {
        this.card = genero
      }
    })
  }

  cadastrarGenero(){

    // Gera Id nova baseada na ultima Id no Db
    const id = (this.card[(this.card.length)-1].id) +1;

    // Salva os valores do array no DB
    const nome = this.form.controls["nome"].value;
    const genero: Genero = {id: id, nome: nome};

    this.criarGenero.salvarGenero(genero).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  // Usa o metodo delete do service
  removerGenero(id: any){
    this.criarGenero.deletarGenero(id).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  // Pega o Id do objeto e abre um Dialog
  editarGenero(id: any){
    this.dialog.open(DialogGeneroComponent,{data:{id}})
    this.dialog.afterAllClosed.subscribe(
      result => {
        this.ngOnInit()
      }
    )
  }
}
