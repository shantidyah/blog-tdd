<template>
<div>
    <!-- {{readmore}} -->
    <!-- {{detail}} -->
    <div class="card" style="margin-top:5%;" v-if="!show">
        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
        <div class="card-header">
            <p style="font-size: 150%; font-weight:bold;">{{readmore.title}}</p>
			<p style="font-style:italic;text-align:left;font-size:12px;">by {{readmore.user.name}} <br> {{ readmore.created_at | changeDate }}</p>
        </div>
        <div class="card-body">
            <img v-bind:src="readmore.url" style="width: 70%; height: 70%"><br><br>
            <!-- <read-more more-str="read more" v-html="article.content" link="#" less-str="read less" :max-chars="50"></read-more> -->
            <p v-html="readmore.content"></p>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-info btn-sm">Edit</button>
            <button type="button" class="btn btn-danger btn-sm" @click="deleteArticle(readmore._id)">Delete</button>
            <div>
                <label for="comment"> Comment: </label>
                <textarea class='form-control' id="comment" placeholder="add comment here..." v-model="comment"></textarea>
                <input class="btn btn-primary btn-sm" type="submit" @click="addcomment(readmore._id)" value="Submit" >
                <!-- <button @click="addcomment">test</button> -->
            </div>        
            <div class="card" style="margin-top:2%" v-for="( comm, index ) in readmore.comments" :key="index">
                <div class="card-body">
                    <!-- {{comm}} -->
                    <p style="cursor:pointer" align="right" @click="deletecom(comm._id)">X</p>
                    <div style="font-size:90%; font-family: 'Times New Roman'" align="left">{{comm.user.name | uppercase}}</div>
                    <p style="font-size:70%" align="left">{{comm.created_at | changeDate}}</p>
                    <p style="font-size:100%; font-family: 'Times New Roman'" align="left">{{comm.comment}}</p>
                </div>
            </div>
            <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
        </div>
    </div>

    <div class="card" style="margin-top:5%;" v-else v-for="(article, index) in detail" :key=index>
            <div class="card-header">
                <p style="font-size: 150%; font-weight:bold;">{{article.title | uppercase}}</p>
                <div style="font-style:italic;text-align:left;font-size:12px;">
                    <div style="font-size:120%"> by: {{article.user.name}} </div> 
                    {{ article.created_at | changeDate }}
                </div>
            </div>
            <div class="card-body">
                <img v-bind:src="article.url" style="width: 70%; height: 10%"><br><br>
                <!-- <read-more more-str="read more" v-html="article.content" link="#" less-str="read less" :max-chars="50"></read-more> -->
                <p v-html="article.content"></p>
            </div>
            <div class="card-footer">
                    <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-edit" @click="edit(article)">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="deleteArticle(article._id)">Delete</button>
                <div>
                    <label for="comment"> Comment: </label>
                    <textarea class='form-control' id="comment" placeholder="add comment here..." v-model="comment"></textarea>
                    <input class="btn btn-primary btn-sm" type="submit" @click="addcomment(article._id)" value="Submit" >
                    <!-- <button @click="addcomment">test</button> -->
                </div>        
                <div class="card" style="margin-top:2%" v-for="( comm, index ) in article.comments" :key="index">
                    <div class="card-body">
                        <!-- {{comm}} -->
                        <p style="cursor:pointer" align="right" @click="deletecom(comm._id)">X</p>
                        <div style="font-size:90%; font-family: 'Times New Roman'" align="left">{{comm.user.name | uppercase}}</div>
                        <p style="font-size:70%" align="left">{{comm.created_at | changeDate}}</p>
                        <p style="font-size:100%; font-family: 'Times New Roman'" align="left">{{comm.comment}}</p>
                    </div>
                </div>
                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
            </div>
    </div>
</div>
</template>

<script>

export default {
    name:'listarticle',
    props:['listart','readmore','detail','show'],
    data(){
        return{
			list:[],
            // show:false,
            comment:'',
            admin:true
        }
	},
    mounted(){
        if(this.$route.params.id!==undefined){
            this.$emit('change',this.$route.params.id)
                // console.log("mounted",this.$route.params.id);
                console.log("success");
            
        }

    },
    filters:{
        changeDate:function(val){
            var newDate = new Date(val)
            var date = newDate.getDate().toString()
            var month = newDate.getMonth().toString()
            var year = newDate.getFullYear().toString()

            if(month.length == 1){
                month = '0'+ month
            }else if(date.length == 1){
                date = '0'+date 
            }
            return date + '-' + month + '-' + year
        },
        uppercase(val){
            return val.toUpperCase()
        }
    },
    methods:{
        addcomment(id){
            this.$emit('addcom',{comment:this.comment,id:id})
            this.comment = ''
        },
        deletecom(id){
            this.$emit('deletecom',id)
        },
        deleteArticle(id){
            // console.log("masuk deleteArticle",id);
            
            this.$emit('deleteart',id)
        },
        edit(article){
            this.$emit('getdata',article)
        }
    }
}
</script>

<style>
	
</style> 
