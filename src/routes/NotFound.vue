<template lang="">
  <div class="not-found">
    <div class="status">
      404
    </div>
    <div class="message">
      Page Not Found!
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import "../scss/main.scss";
.not-found {
  line-height: 1.2;
  text-align: center;
  font-family: "Varela Round", sans-serif;
  padding: 80px 20px;
  .status {
    font-size: 130px;
    color: $primary;
  }
  .message {
    font-size: 40px;
  }
}

</style>
