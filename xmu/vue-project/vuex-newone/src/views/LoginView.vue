<template>
    <div>
        <input type="text" v-model="username">
        <input type="password" v-model="password">
        <input @click.prevent="loginHandler" type="submit" value="登录">
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            username: '',
            password: ''
        }
    },
    methods: {
        loginHandler() {
            console.log(123,this);
            console.log(this.$router.replace);
            // 假设是ajax的结果
            let token = 'MaJ6bKsj'
            if (token) {
                localStorage.setItem('token', token)
                this.$router.replace({ path: '/my' })
                this.show = true
            }

        }
    }
}
</script>

<style lang="less" scoped>

</style>