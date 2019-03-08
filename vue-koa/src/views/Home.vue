<template>
    <div class="home">
        <button @click="getUserInfo">获取个人信息</button>
        <el-table :data="users">
            <el-table-column
                prop="_id"
                label="_id">
            </el-table-column>
            <el-table-column
                prop="code"
                label="工号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名字">
                <template
                    slot-scope="scope" >
                    <el-button
                        @click="getPayList(scope.row.code)"
                        type="text">{{ scope.row.name }}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色">
            </el-table-column>
            <el-table-column
                label="操作">
                <template
                    slot-scope="scope" >
                    <el-button type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <br>
        <el-table :data="payLists">
            <el-table-column
                prop="_id"
                label="_id">
            </el-table-column>
            <el-table-column
                prop="code"
                label="工号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名字">
                <template
                    slot-scope="scope" >
                    <el-button
                        type="text">{{ scope.row.name }}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色">
            </el-table-column>
            <el-table-column
                label="操作">
                <template
                    slot-scope="scope" >
                    <el-button type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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
    users: Array<any> = []
    payLists: Array<any> = []
    mounted() {
        // this.getUserInfo()
        // this.getUser()
    }
    async getUserInfo() {
        let { data } = await axios.get('/user/info.json')
    }
    async getUser() {
        let { data } = await axios.get('/user/list.json')
        this.users = data.data
    }
    async getPayList(code) {
        let params = {
            code: code
        }
        let { data } = await axios.post('/pay/list.json', params)
        this.payLists = data.data
    }
}
// export default Home

</script>
