<template>
	<div class="hot-movies">
    <el-carousel trigger="click" interval="4700" class="bigBrowser">
      <el-carousel-item>
        <img src="../../assets/banner1-big.png"  height="100%" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/banner2-big.png" height="100%" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/banner3-big.png" height="100%" width="100%">
      </el-carousel-item>
    </el-carousel>
    <el-carousel trigger="click" interval="4700" class="smallBrowser">
      <el-carousel-item>
        <img src="../../assets/banner1-small.png"  height="100%" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/banner2-small.png" height="100%" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/banner3-small.png" height="100%" width="100%">
      </el-carousel-item>
    </el-carousel>
 	 <div class="triangle_up">
 	 	<span></span>
   </div>
</div>
</template>
<script>
export default {
	name: 'hot-movies',
}	
</script>

<style>
	.el-carousel__indicators{
		left: 19% !important;
		bottom: 20px !important;
	}
	.el-carousel__button{
		height: 8px !important;
		width: 8px !important;
		border-radius: 50%;
	}
	.is-active button {
		width: 36px !important;
		border-radius: 12px !important;
	}
	.triangle_up{
	    width:0;
	    height:0;
	    border-width:0 30px 30px;
	    border-style:solid;
	    border-color:transparent transparent #fff;/*透明 透明  灰*/
	    margin:0 auto;
	    margin-top:-30px;
	    position:relative;
	    top: 10px;
	    z-index: 999;
	}
@media (max-width:1000px) {
	.el-carousel__container{
		height: 250px !important;
	}
	.bigBrowser{
		display: none !important;
	}
	.smallBrowser{
		display: block !important;
	}
}
@media (min-width:1001px ) and (max-width:1100px) {
	.el-carousel__container{
		height: 280px !important;
	}
	.bigBrowser{
		display: none !important;
	}
	.smallBrowser{
		display: block !important;
	}
}
@media (min-width:1101px ) and (max-width:1200px) {
	.el-carousel__container{
		height: 290px !important;
	}
	.bigBrowser{
		display: none !important;
	}
	.smallBrowser{
		display: block !important;
	}
}
@media (min-width:1201px ) and (max-width:1300px) {
	.el-carousel__container{
		height: 300px !important;
	}
	.bigBrowser{
		display: none !important;
	}
	.smallBrowser{
		display: block !important;
	}
}
@media (min-width:1301px ) and (max-width:1400px) {
	.el-carousel__container{
		height: 340px !important;
	}
	.bigBrowser{
		display: none !important;
	}
	.smallBrowser{
		display: block !important;
	}
}
@media (min-width:1401px ) and (max-width:1500px) {
	.el-carousel__container{
		height: 360px !important;
	}
	.bigBrowser{
		display: none !important;
	}
	.smallBrowser{
		display: block !important;
	}
}
@media (min-width:1501px ) and (max-width:1600px) {
	.el-carousel__container{
		height: 380px !important;
	}
	.smallBrowser{
		display: none !important;
	}
	.bigBrowser{
		display: block !important;
	}
}
@media (min-width:1601px ) and (max-width:1700px) {
	.el-carousel__container{
		height: 400px !important;
	}
	.smallBrowser{
		display: none !important;
	}
	.bigBrowser{
		display: block !important;
	}
}
@media (min-width:1701px ) and (max-width:1800px) {
	.el-carousel__container{
		height: 440px !important;
	}
	.smallBrowser{
		display: none !important;
	}
	.bigBrowser{
		display: block !important;
	}
}
@media (min-width:1801px ) and (max-width:1900px) {
	.el-carousel__container{
		height: 460px !important;
	}
	.loginWrapper{
		margin-top: 30px;
	}
	footer{
		margin-top: 10px;
	}
	.smallBrowser{
		display: none !important;
	}
	.bigBrowser{
		display: block !important;
	}
}
@media (min-width:1901px ) and (max-width:2000px) {
	.el-carousel__container{
		height: 470px !important;
	}
	.loginWrapper{
		margin-top: 30px;
	}
	footer{
		margin-top: 20px;
	}
	.smallBrowser{
		display: none !important;
	}
	.bigBrowser{
		display: block !important;
	}
}
@media (min-width:2001px ) {
	.el-carousel__container{
		height: 500px !important;
	}
	.loginWrapper{
		margin-top: 30px;
	}
	footer{
		margin-top: 20px;
	}
	.smallBrowser{
		display: none !important;
	}
	.bigBrowser{
		display: block !important;
	}
}
  .el-carousel__item {
     /*background-color: #5B99FE;*/
  }

</style>