import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { CriarUsuarioService } from './../../services/criar-usuario/criar-usuario.service';
import { DialogComponent } from '../dialog-usuario/dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  form!: FormGroup;
  card!: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private criarUsuario: CriarUsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl('')
    })

    this.criarUsuario.lerUsuarios().subscribe({
      next:(usuario: Usuario[]) => {
        this.card = usuario
      }
    })
  }

  cadastrarUsuario(){
    const id = (this.card[(this.card.length)-1].id) +1;
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;
    const usuario: Usuario = {id: id, nome: nome, email: email, telefone: telefone};

    this.criarUsuario.salvarUsuario(usuario).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  removerUsuario(id: any){
    this.criarUsuario.deletarUsuario(id).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  editarUsuario(id: any){
    this.dialog.open(DialogComponent,{width: '400px', data:{id}})
    this.dialog.afterAllClosed.subscribe(
      result => {
        this.ngOnInit()
      }
    )
  }
}
