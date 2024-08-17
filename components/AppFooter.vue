<script setup lang="ts">
</script>

<template>
  <footer class="footer">
      <div class="footer__contacts-block">
          <div class="footer__apps"></div>
          <div class="footer__contacts"></div>
          <div class="footer__socials"></div>
      </div>
      <div class="footer__nav">

      </div>
      <div class="">
          <div class="footer__dev">
              <div class="footer__dev-copyright">Разработка сайта</div>
              <a href="https://studio-aw.ru/" target="_blank" class="footer__dev-info">Digital студия A&W</a>
          </div>
      </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.footer__dev {
    display: flex;
    gap: 5px;
    align-items: baseline;
    flex-wrap: wrap;

    &:hover {
        &::before {
            transition: border 0.5s;
            border: 1px solid #fff;
        }
    }

    &::before {
        content: "";
        position: relative;
        top: 1px;
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 8px;
        transition: border 0.5s;
        border: 1px solid transparent;
        background: var(--c-aw-color);
    }
}

.footer__dev-copyright {
    color: var(--c-grey-00);
    font-weight: 300;
    font-size: functions.rem(12);
}

.footer__dev-info {
    text-decoration: none;
    color: var(--c-grey-00);
    font-weight: 300;
    font-size: functions.rem(14);
}
</style>
