<template>
    <div style="margin-top:20%">
        <!-- <div class="card" style="margin-top:10%; margin-bottom:10%;">
            <div class="card-header">
                <h3>Recent Post</h3>
            </div>
                <ul class="list-group list-group-flush" v-for='(article, index) in articles' :key=index>
                <li class="list-group-item" align='left'><a href=''>{{article.title}}</a></li>
            </ul>
        </div> -->

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Recent Post</th>
                </tr>
            </thead>
            <tbody>
                <tr><br></tr>
                <tr align="left" v-for='(article, index) in articles' :key=index>
                    <!-- <br> -->
                    <router-link :to="{name: 'detail', params: {id: article._id}}" class="mt-0 mb-1" @click.native="detail(article._id)">{{article.title}}</router-link>
                    <hr>
                    <!-- <td><a href='#' style="font-size:15px">{{article.title}}</a></td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name:'side',
    props:['articles'],
    methods: {
        detail(val){
            this.$emit('detail',val)
        }
    }
}
</script>

<style>

</style>
