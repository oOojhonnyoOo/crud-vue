<template>
 <div id="main">
    <img  :src="previewImage" width="180px" height="180px">
    <br>
    <input type="text"   v-model="usuario.first_name" placeholder="Informe seu primeiro nome"> <br>
    <input type="email"  v-model="usuario.last_name" placeholder="Informe seu último nome"> <br>
    <input type="email"  v-model="usuario.email" placeholder="Informe seu email"> <br>
    <input type="file" @change="processFile($event)"> <br>
    <input type="button" v-on:click="atualizarUsuario" value="Alterar" v-if="usuario.id"> 
    <input type="button" v-on:click="adicionarUsuario" value="Cadastrar" v-else>
    <br>
    <br>

    <table border="0">
        <thead>
            <tr style="font-weight: bold;">
                <td>ID</td>
                <td>Primeiro Nome</td>
                <td>Ultimo Nome</td>
                <td>Email</td>
                <td>Foto</td>
                <td>Excluir</td>
                <td>Editar</td>
            </tr>    
        </thead>
        <tbody>
            <tr v-for="usuario in listaUsuario" :key="usuario.id">
                <td>{{usuario.id}}</td>
                <td>{{usuario.first_name}}</td>
                <td>{{usuario.last_name}}</td>
                <td>{{usuario.email}}</td>
                <td> <img :src="usuario.website" width="25px" height="25px" border='1'> </td>
                <td v-on:click="deletarUsuario(usuario.id)" style="cursor:pointer; text-align:center;"><i class="fa fa-trash"></i></td>
                <td v-on:click="atualizarDadosUsuario(usuario.id)" style="cursor:pointer; text-align:center;"><i class="fa fa-edit"></i></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td 
                    style="cursor:pointer" 
                    @click="paginate(-1)"
                    v-if="pagination.page > 1"
                ><b> Anterior</b></td>
                <td v-else></td>
                <td colspan="5"></td>
                <td style="cursor:pointer; text-align:right" @click="paginate(1)"><b>Próximo ></b></td>
            </tr>
        </tfoot>
    </table>

</div> 
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      pagination:{
          page: 1
      },
      token: 'tquyhXCfjCU3DF3tPej_x-6FxZvVNi9jp1jZ',
      usuario: {},
      previewImage: null,
      listaUsuario: []
    }
  },
  methods:{
      adicionarUsuario(){
          const usuario = {
              first_name: this.usuario.first_name,
              last_name: this.usuario.last_name,
              email: this.usuario.email,
              gender: 'male'
          }

          axios.post('https://gorest.co.in/public-api/users', usuario,  {
              headers: { Authorization: 'Bearer '+this.token }
          }).then(response => {
              if(response.data._meta.success){
                  this.listarUsuariosApi();
                  this.usuario = {};
                  this.previewImage = null;
                  alert('usuário criado com sucesso!');
              } else {
                  response.data.result.forEach(error => {
                      alert('Erro no campo '+error.field+': '+error.message);
                  });
              }
          });

      },
      atualizarUsuario(){
          const usuario = {
              first_name: this.usuario.first_name,
              last_name: this.usuario.last_name,
              email: this.usuario.email
          }

          axios.patch('https://gorest.co.in/public-api/users/'+this.usuario.id, usuario, {
              headers: { Authorization: 'Bearer '+this.token }
          }).then(response => {
              if(response.data._meta.success){
                  this.usuario = {};
                  this.previewImage = null;
              }
          })

      },
      atualizarDadosUsuario(index){
          this.usuario = this.listaUsuario.find(usuario => usuario.id == index);
          this.previewImage = this.usuario.website;
      },
      deletarUsuario(index){
          axios.delete('https://gorest.co.in/public-api/users/'+index, {
              headers: { Authorization: 'Bearer '+this.token }
          }).then(response => {
              if(response.data._meta.success){
                  this.listarUsuariosApi();
                  alert('usuário deletado com sucesso!');
              }
          })
      },
      processFile(event) {
          // this.usuario.website = 
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = e =>{
              this.previewImage = e.target.result;
          };
      },
      paginate(position){
          this.pagination.page += position;
          if(this.pagination.page <= 0){
              this.pagination.page = 1;
          }else{
              this.listarUsuariosApi();
          }
      },
      listarUsuariosApi(){
          axios.get('https://gorest.co.in/public-api/users?_format=json&access-token='+this.token+'&page='+this.pagination.page).then(response => {
              if(response.data._meta.success){
                  this.listaUsuario = response.data.result;
              }
          });
      }
  },
  mounted(){
      this.listarUsuariosApi();
  }

}
</script>