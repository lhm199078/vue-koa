<template>
    <div class="home">
        <button @click="getUser">点击</button>
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import axios from 'axios'
@Component({
    components: {
        HelloWorld
    },
})
export default class Home extends Vue {
    public getUser() {
        axios.get('/pay/add.json', {})
          .then(({ data }) => {
              console.log(data)
          })
          .catch((error) => {
              console.log(error)
          })
    }
}
</script>
