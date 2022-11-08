<template>
    <div class="my">
        <img src="@/assets/images/bgc.png" alt="">
        <div class="sign">
            <!-- @click="loginHandler" @click="show=true" -->
            <div class="sign-top" @click="$router.push({path:'/login'})">
                <h3>登录</h3>
                <h5>ONE一个</h5>
            </div>
            <div class="register">
                <p>还没有账号？&nbsp;点击<a href="">注册</a></p>
            </div>
            <div class="agreement">
                <input type="checkbox" name="" id="">
                <p>我已阅读并同意<a href="">《用户服务协议》</a>和<a href="">《隐私协议》</a></p>
            </div>
            <div class="login-method">
                <h5>其他登录方式</h5>
                <div class="login-icon">
                    <img src="@/assets/images/bubble_wechat.png" alt="">
                    <img src="@/assets/images/bubble_weibo.png" alt="">
                    <img src="@/assets/images/bubble_qq.png" alt="">
                </div>
            </div>
        </div>
        <MySign v-if="show" />
    </div>
</template>
  
<script>
import MySign from "@/components/MySign.vue";
export default {
    components: {
        MySign
    },
    data() {
        return {
            show: false
        }
    }
}
</script>
  
<style lang="less" scoped>
.my {
    width: 100vw;
    height: 100vh;
    background-color: rgb(244, 243, 247);

    img {
        width: 100%;
        height: 300rem;
    }

    .sign {
        display: flex;
        // justify-content: center;
        align-items: center;
        flex-direction: column;

        .sign-top {
            width: 80rem;
            height: 80rem;
            color: white;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius: 50%;

            h3 {
                font-weight: 300;
            }

            h5 {
                font-weight: 700;
            }
        }

        .register {
            margin-top: 20rem;

            p {
                font-weight: 600;

                a {
                    color: black;

                }
            }
        }

        .agreement {
            display: flex;
            margin-top: 20rem;
            transform: scale(0.9);

            input {}

            p {
                color: rgb(189, 189, 189);

                a {
                    color: black;
                    font-weight: 500;
                    text-decoration: none;
                }
            }
        }

        .login-method {
            margin-top: 40rem;

            h5 {
                color: rgb(190, 190, 190);
                text-align: center;
                font-weight: 600;
            }

            .login-icon {
                margin-top: 20rem;
                width: 90vw;
                display: flex;
                justify-content: space-around;

                img {
                    width: 30rem;
                    height: 30rem;
                }
            }
        }
    }
}
</style>


