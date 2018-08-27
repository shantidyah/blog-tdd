<template>
    <div class="modal fade bd-example-modal-lg" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Edit Article</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">  
                        Title : <input type="text" class="form" placeholder="" aria-label="" aria-describedby="basic-addon1" v-model="title">
                    </div>
                    <div align="left">
                        Upload Image : <input type="file" v-on:change="selectedImage">
                    </div>
                    <br>
                    <div align="left">
                        Content: 
                        <wysiwyg v-model="content" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="editArticle">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div>sfjkhskjh</div> -->
</template>

<script>
export default {
    name:'addcontent',
    data () {
        return {
            inputContent:'',
            img:''
            // title:''
        }
    },
    props:['url','title','content'],
    methods:{
        selectedImage(e){
            this.img = e.target.files[0]
        },
        close(){
            this.inputContent = '',
            this.img = '',
            this.title = ''       
        },
        editArticle(){
            this.$emit('update',{title:this.title,content:this.content,img:this.img})
        }
    }
}
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css"
</style>
