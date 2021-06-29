<template>
  <div class="not-found">
    {{ $t("common.notFound") }}（404）
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
$--color-primary: #D8BE33;
.not-found {
  text-align: center;
  margin-top: 250px;
  font-size: 35px;
  color: $--color-primary;
}
</style>
