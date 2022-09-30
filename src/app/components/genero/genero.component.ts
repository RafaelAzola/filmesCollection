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

  form!: FormGroup;
  card!: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private criarGenero: CriarGeneroService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('')
    })

    this.criarGenero.lerGeneros().subscribe({
      next:(genero: Genero[]) => {
        this.card = genero
      }
    })
  }

  cadastrarGenero(){
    const id = (this.card[(this.card.length)-1].id) +1;
    const nome = this.form.controls["nome"].value;
    const genero: Genero = {id: id, nome: nome};

    this.criarGenero.salvarGenero(genero).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  removerGenero(id: any){
    this.criarGenero.deletarGenero(id).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  editarGenero(id: any){
    this.dialog.open(DialogGeneroComponent,{width: '400px', data:{id}})
    this.dialog.afterAllClosed.subscribe(
      result => {
        this.ngOnInit()
      }
    )
  }
}
