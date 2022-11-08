<template>
    <div class="my-page">
        <div class="my-page-mask">
            <div class="top">
                <div class="back-icon">
                    <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
                </div>
                <h3>文章</h3>
            </div>
            <div class="nav-icon">
                <img src="@/assets/images/bookcase.png" alt="">
                <h5>一个都没有</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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
    }
}
</style>