<template>
  <div>
    <ul class="horizontal-list">
      <li><a href="#">Política de Privacidade</a></li>
      <li><a href="#">Envie seu Feedback</a></li>
      <li><a href="#">Regras da Comunidade</a></li>
      <li><a href="#">Termos de Uso</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterLinksPolicy',
  data () {
    return { }
  }
}
</script>

<style>
  .horizontal-list {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0;
  }

  .horizontal-list li a {
    text-decoration: none;
    font-size: 12px;
  }
</style>
