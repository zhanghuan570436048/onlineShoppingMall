<template>
<div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemSon, i) in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl v-for="(itemSon, i) in item.subcates" :key="itemSon.id">
                                            <dt>
                                                <a href="/goods/40.html">{{itemSon.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html">手机通讯</a>
                                                <a href="/goods/43.html">摄影摄像</a>
                                                <a href="/goods/43.html">存储设备</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="(item, index) in toplist" :key="item.id">
                            <img :src="item.img_url" alt="">
                            <!-- v-lazy="img.src" -->
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|cutTime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section"  v-for="(item, index) in productList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(itemSon, i) in item.level2catelist" >{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>>></i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemSon, i) in item.datas" :key="itemSon.artID">
                            <!-- <router-link :to="'/goodsinfo?id='+itemSon.artID"> -->
                            <router-link :to="'/goodsinfo/'+itemSon.artID">
                                <div class="img-box">
                                    <img v-lazy="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import $ from "jquery";
//  import axios from "axios";


export default {
    //数据
  data:function(){
      return {
          catelist:[],
          sliderlist:[],
          toplist:[],
          productList:[]
      }
  },
  mounted(){
    $("#menu2 li a").wrapInner( '<span class="out"></span>' );
	$("#menu2 li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});

	$("#menu2 li a").hover(function() {
		$(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
		$(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

	}, function() {
		$(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
		$(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
	});

},
//即将显示时调用
 beforeMount() {
     this.axios.get(`/site/goods/gettopdata/goods`)
     .then(response=>{
         //console.log(response);
         this.catelist = response.data.message.catelist;
         this.sliderlist = response.data.message.sliderlist;
         this.toplist = response.data.message.toplist;
         //moment(response.data.message.toplist.add_time).format(YYYY,MM,dd);

     })
     .catch((error)=>{
         //console.log(error);
     }),
 //商品列表页数据请求
 this.axios.get(`/site/goods/getgoodsgroup`)
      .then(response=>{
          console.log(response);
          this.productList = response.data.message;
      })
      .catch(error=>{})
 },
 filters:{

 }
};
</script>

<style spoted>
@import url('../assets/navcss/style.css'); 
.left-705 {
    height: 340px;
}
.left-705 .el-carousel {
    width: 100%;
    height: 100%;
}
.left-705 .el-carousel .el-carousel__container {
    width: 100%;
    height: 100%;
}
.el-carousel .el-carousel__container img {
    width: 100%;
    height: 100%;
}
</style>

