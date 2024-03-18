<template>
  <section class="notfound-section">
    <h2 class="notfound-title">Error 404</h2>
    <h2>PARECE QUE NO ENCONTRAMOS ESA PÁGINA...</h2>
    <router-link class="notfound-link" to="/">
       <p>VOLVER AL INICIO</p>
    </router-link>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notfound-link{
  text-decoration: none;
}
.notfound-section{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10rem;
}
.notfound-title {
  font-size: 50px;
	display: inline-block;
	padding-right: 12px;
	animation: type .5s alternate infinite;
}
@keyframes type{
	  from{box-shadow: inset -3px 0px 0px #888;}
	  to{box-shadow: inset -3px 0px 0px transparent;}
}


</style>
