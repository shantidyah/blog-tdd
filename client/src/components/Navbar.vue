<template>
    <nav class="navbar navbar-expand-lg navbar" style="background-color: #ee6e73;">
        <router-link to='/' @click='backhome'>
            <a href='#' class="navbar-brand" style="color:white">Home</a>
        </router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0">
                <a class="nav-link disabled" href="#"  style="color:white" data-toggle="modal" data-target="#modal-login" v-if="!statuslogin">Login</a>
                <a class="nav-link disabled" href="#" style="color:white" data-toggle="modal" data-target="#modal-register" v-if="!statuslogin">Register</a>
                <a class="nav-link disabled" href="#" style="color:white" data-toggle="modal" data-target="#modal-add" v-if="statuslogin">Add</a>
                <a class="nav-link disabled" href="#" style="padding-right:30px; color:white" v-if="statuslogin" @click="logout" >Logout</a>          
            </form>
   
        </div>
    </nav>
</template>

<script>


export default {
    name:'navbar',
    props:['statuslogin'],
    data () {
        return {

        }
    },
    methods:{
        logout(){
            this.$emit('logout')
        },
        backhome(){
            this.$emit('listHome')
        }
    }
}
</script>

<style>

</style>
