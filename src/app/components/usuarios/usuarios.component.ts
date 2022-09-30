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

  // Cria um array para receber os valores de Usuarios
  form!: FormGroup;
  card!: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private criarUsuario: CriarUsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // Recebe valores dos inputs
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl('')
    })

    // Lê os Usuarios no DB e transforma em objetos na array declarada
    this.criarUsuario.lerUsuarios().subscribe({
      next:(usuario: Usuario[]) => {
        this.card = usuario
      }
    })
  }

  cadastrarUsuario(){

    // Gera Id nova baseada na ultima Id no Db
    const id = (this.card[(this.card.length)-1].id) +1;

    // Salva os valores do array no DB
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

  // Usa o metodo delete do service
  removerUsuario(id: any){
    this.criarUsuario.deletarUsuario(id).subscribe({
      next: () => {
        this.ngOnInit()
      }
    })
  }

  // Pega o Id do objeto e abre um Dialog
  editarUsuario(id: any){
    this.dialog.open(DialogComponent,{data:{id}})
    this.dialog.afterAllClosed.subscribe(
      result => {
        this.ngOnInit()
      }
    )
  }
}
