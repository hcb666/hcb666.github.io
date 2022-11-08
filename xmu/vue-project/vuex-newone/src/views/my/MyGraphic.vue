<template>
    <div class="my-page">
        <div class="my-page-mask">
            <div class="top">
                <div class="back-icon">
                    <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
                </div>
                <h3>图文</h3>
            </div>
            <div class="nav-icon" v-show="!photographyListCol">
                <img src="@/assets/images/bookcase.png" alt="">
                <h5>一个都没有</h5>
            </div>
            <section class="content">
                <ul>
                    <li v-for="content in photographyListCol" :key="content.id"
                        @click="$router.push({path:'/bydate' , query:{date:content.post_date}})">
                        <div class="content-top">
                            <img :src="content.img_url" alt="">
                            <h5>{{content.volume}}</h5>
                        </div>
                        <p>{{content.forward}}</p>
                    </li>
                </ul>
            </section>
        </div>
    </div>

</template>

<script>
import { mapState } from "vuex";

export default {

    computed: {
        ...mapState(["photographyList", "photographyListCol"]),
    },
}
</script>

<style lang="less" scoped>
.my-page {
    position: relative;

    .my-page-mask {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 9999;

        .top {
            width: 100%;
            height: 40rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            // background-color: red;
            border-bottom: 1rem solid rgb(236, 236, 236);

            .back-icon {
                width: 24rem;
                position: absolute;
                top: 8rem;
                left: 10rem;
            }
        }

        .nav-icon {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            h5 {
                font-size: 24rem;
                font-weight: 600;
                color: rgb(187, 187, 187);
            }
        }

        .content {
            ul {
                width: 100%;

                display: flex;

                li {
                    width: calc(50% - 20rem);
                    margin: 10rem;
                    border-radius: 5rem;
                    box-shadow: 0 0 3rem 0 rgb(127, 127, 127);

                    .content-top {

                        position: relative;

                        h5 {
                            position: absolute;
                            bottom: 3rem;
                            left: 0;
                            color: #fff;
                            transform: scale(0.8);
                        }

                        img {

                            border-radius: 5rem 5rem 0 0;
                        }
                    }

                    p {
                        padding: 3rem;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden; //溢出内容隐藏
                        text-overflow: ellipsis; //文本溢出部分用省略号表示
                        display: -webkit-box; //特别显示模式
                        -webkit-line-clamp: 2; //行数
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        color: rgb(177, 177, 177);
                    }
                }
            }

        }
    }
}
</style>