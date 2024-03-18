<template>
  <footer class="footer">
    <nav class="footer-nav">
      <ul class="footer-nav-list">
        <li class="footer-nav-item">
          <router-link class="footer-link" to="/contact">Contacto</router-link>
        </li>
        <li class="footer-nav-item">
          <router-link class="footer-link" to="/">Sobre nosotros</router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-nav-list{
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  height: 60px;
  align-items: center;
  border-top: 1px solid lightblue;
}
.footer-link {
  text-decoration: none;
  font-size: 20px;
  padding: 10px;
}


</style>
