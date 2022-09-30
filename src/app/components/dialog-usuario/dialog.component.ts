import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { CriarUsuarioService } from './../../services/criar-usuario/criar-usuario.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  // Cria um array para receber os valores de Usuarios
  form!: FormGroup;
  card!: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private criarUsuario: CriarUsuarioService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    // Recebe valores dos inputs
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl('')
    })
  }

  editarUsuario(){

    // Recebe o Id enviado ao abrir o dialog
    const id = this.data

    // Salva os valores do array no DB
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;
    const usuario: Usuario = {id: id, nome: nome, email: email, telefone: telefone};

    this.criarUsuario.updateUsuario(usuario,this.data).subscribe({
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
