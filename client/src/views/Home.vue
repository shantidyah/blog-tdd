<template>
  <div class="home">
    <Navbar :statuslogin="seen" @logout='logout' @listHome='readMore'></Navbar>
        <Register @save='register'></Register>
        <Login @login='login'></Login>
        <AddArticle @newarticle='AddArticle'></AddArticle>
    <div class="container">
      <p>ShanBlog</p>
      <!-- {{list}} -->
      <div class="row">
        <div class="col-md-4">
          <side-bar :articles="list" @detail='detailArticle'></side-bar>
        </div>
        <div class="col-md-8">
          <Article :listart="list" :readmore="listread" :detail='detailArt' @addcom='addComment' @deletecom='deleteComment' :show='show' @change='detailArticle' @deleteart='deleteArticle' @getdata="getdataUpdate"></Article>
          <Edit :url="url" :title="title" :content="content" @update="updateArticle"></Edit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import SideBar from '@/components/SideBar.vue'
import Article from '@/components/Content.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import AddArticle from '@/components/AddArticle.vue'
import Edit from '@/components/EditArticle.vue'


export default {
  name: 'home',
  data(){
    return{
      nameRegister:'',
      seen:false,
      list:[],
      listread:[],
      detailArt:[],
      show:false,
      idArticle:'',
      url:'',
      title:'',
      content:''
    }
  },
  components: {
    HelloWorld,
    Navbar,
    SideBar,
    Article,
    Register,
    Login,
    AddArticle,
    Edit
  },
  watch:{
    seen (val) {
      this.seen = val
    },
    list(){
      this.listArticle()
    },
    show(val){
      if(!val){
        this.readMore()
      }
    },
    '$route'(to,from){
      // console.log(this.$route.params.id);
      if(this.$route.params.id==undefined){
        this.readMore()
      }
    }
  },
  created(){
    var status = localStorage.getItem('token')
    this.listArticle()
    var params = this.$route.params
    if(params.id==undefined){
      this.readMore()
    }
    if(status){
      this.seen = true
    }
    else{
      this.seen = false
    }
  },
  methods:{
    register(newUser){
      axios.post("http://localhost:3000/register",{
          name: newUser.name,
          email: newUser.email,
          password: newUser.password
      })
      .then(token =>{
        swal("", "You successfull register!", "success")
        .then(val=>{
          this.seen = true
          localStorage.setItem('token',token.data)
        })
        console.log("success register");
      })
      .catch(err=>{
        swal("", "You cannot register!", "warning")
        .then(val=>{
          console.log(err.response.data.msg);
        })
      })
    },
    logout(){
      localStorage.removeItem('token')
      this.seen = false
    },
    login(user){
      // this.seen = true
      axios.post('http://localhost:3000/login',{
        email: user.email,
        password: user.password
      })
      .then(token =>{
        swal("", "You successfull login!", "success")
        .then(val=>{
          this.seen = true
          localStorage.setItem('token',token.data)
        })
        console.log("success login");
      })
      .catch(err=>{
        swal("", `${err.response.data.msg}`, "warning")
        .then(val=>{
          console.log(err.response.data.msg);
        })
      })
    },
    AddArticle(newArticle){
      let token = localStorage.getItem('token')
      let formData = new FormData()
      formData.append('image',newArticle.img)
      axios.post('http://localhost:3000/upload',formData,{
        headers:{
          token: token
        }
      })
      .then(result =>{
        // console.log(result.data.link);
        console.log("success upload img");
        let tokenauth = localStorage.getItem('token')
        axios.post('http://localhost:3000/articles/add',{
          title: newArticle.title,
          content: newArticle.content,
          url: result.data.link
        },{
          headers:{
            token: tokenauth
          }
        })
        .then( article =>{
          // console.log(tokenauth);

          console.log("success add article to database");
        })
        .catch(err =>{
          console.log("gagal");
          // console.log(tokenauth);
          console.log(err.response.data)
        })

      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    listArticle(){
      axios.get('http://localhost:3000/articles/')
      .then(article=>{
        this.list = article.data
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    readMore(){
      this.show = false
      axios.get('http://localhost:3000/articles/')
      .then(article=>{
        this.listread = article.data[0]
      })
      .catch(err=>{
        console.log(err);
      })
    },
    addComment(val){
      var token = localStorage.getItem('token')
      axios.post(`http://localhost:3000/articles/${val.id}/addcomment`,{
        comment : val.comment
      },{
        headers:{
          token: token
        }
      })
      .then( comment =>{
        swal('','success added comment','success')
        .then(val=>{
          this.listArticle()
          this.detailArticle(this.idArticle)
          console.log(comment);
        })
      })
      .catch( err =>{
        swal('',"you must login to add comment",'warning')
        console.log(err.response);
        
      })
    },
    detailArticle(id){
      this.show = true
      this.idArticle = id
      axios.get(`http://localhost:3000/articles/detail/${id}`)
      .then(article=>{
        this.detailArt = article.data
      })
      .catch(err=>{
        console.log(err);
        
      })

    },
    deleteComment(id){
      var token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/articles/${this.idArticle}/deletecomment/${id}`,{
        headers:{
          token: token
        }
      })
      .then(result=>{
        swal('','success delete your comment','success')
        .then(val=>{
          // console.log(result);
          this.listArticle()
          this.detailArticle(this.idArticle)
        })
        .catch(err=>{
          console.log(err.response);
        })
      })
      .catch(err=>{
        swal('',err.response.data.msg,'warning')
        console.log(err.response.data);
        
      })
    },
    deleteArticle(id){
      var token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/articles/delete/${id}`,{
        headers:{
          token: token
        }
      })
      .then(result=>{
        swal('','success delete your article','success')
        .then(val=>{
          window.location = '/'
        })
        .catch(err=>{
          console.log(err);
        })
        // console.log("berhasil delete");
      })
      .catch(err=>{
        console.log("masuk error");
        swal('',err.response.data.msg,'warning')
        console.log(err.response.data.msg);
      })
    },
    getdataUpdate(article){
      this.url = article.url
      this.title = article.title
      this.content = article.content
      this.artId = article._id
    },
    updateArticle(article){
      var token = localStorage.getItem('token')

      if(article.img){
        let token = localStorage.getItem('token')
        let formData = new FormData()
        formData.append('image',article.img)
        axios.post('http://localhost:3000/upload',formData,{
          headers:{
            token: token
          }
        })
        .then(result=>{
          console.log("masuk upload");
          
          axios.put(`http://localhost:3000/articles/update/${this.artId}`,{
            title: article.title,
            content: article.content,
            url: result.data.link
          },{
            headers:{
              token: token
            }
          })
          .then(articleedit=>{
            swal('',"success update this article",'success')
            .then(val=>{
              this.detailArticle(this.idArticle)
                this.url = ''
                this.title = ''
                this.content = ''
            })
            .catch(err=>{
              console.log(err);
              
            })
          })
          .catch(err=>{
            swal('',err.response.data.msg,'warning')
            // console.log(err.response.data);
            
          })
        })
        .catch(err=>{
          console.log(err.response);
        })
      }
      else{
          axios.put(`http://localhost:3000/articles/update/${this.artId}`,{
            title: article.title,
            content: article.content,
            url: this.url
          },{
            headers:{
              token: token
            }
          })
          .then(articleedit=>{
            swal('',"success update this article",'success')
            .then(val=>{
              this.detailArticle(this.idArticle)
                this.url = ''
                this.title = ''
                this.content = ''
            })
            .catch(err=>{
              console.log(err);
              
            })
          })
          .catch(err=>{
            swal('',err.response.data.msg,'warning')
            // console.log(err.response.data);
            
          })
      }
    }
  }
}
</script>

<style>
  body{
    background-image: url("https://shantidyahblog.wordpress.com/wp-content/themes/pub/pachyderm/img/background.png?m=1391151857h");
  }
</style>

