<script setup lang="ts">
</script>

<template>
  <footer class="footer">
      <div class="footer__contacts-block">
          <div class="footer__download-apps">
              <div class="footer__download-app">
                  <BaseIcon name="playmarket"/>
                  <span class="footer__download-app-text">Скачать из</span>
                  <span class="footer__download-app-title">Google Play</span>
              </div>
              <div class="footer__download-app">
                  <BaseIcon name="appstore"/>
                  <span class="footer__download-app-text">Загрузите в</span>
                  <span class="footer__download-app-title">App Store</span>
              </div>
              <div class="footer__download-app">
                  <BaseIcon name="huawei"/>
                  <span class="footer__download-app-text">Откройте в</span>
                  <span class="footer__download-app-title">AppGallery</span>
              </div>
          </div>
          <div class="footer__contacts">
              <div class="footer__contact">
                  <img src="/images/icons/phone.svg" alt="" class="footer__contact-image">
                  <a class="footer__contact-text" href="tel:8 (8442) 33-77-77">8 (8442) 33-77-77</a>
                  <div class="footer__contact-subtext">Бесплатный звонок</div>
              </div>
              <div class="footer__contact">
                  <img src="/images/icons/mail.svg" alt="" class="footer__contact-image">
                  <a class="footer__contact-text" href="mailto:roosters-pizza@yandex.ru">roosters-pizza@yandex.ru</a>
                  <div class="footer__contact-subtext">Для отзывов и предложений</div>
              </div>
          </div>
          <div class="footer__socials">
              <div class="footer__social">
                  <BaseIcon name="instagram"/>
              </div>
              <div class="footer__social">
                  <BaseIcon name="vk"/>
              </div>
          </div>
      </div>
      <div class="footer__nav">
          <div class="footer__nav-item">
              <a href="" class="footer__nav-item-title">Рустерс</a>
              <div class="footer__nav-subitems">
                  <a class="footer__nav-subitem" href="">О Нас</a>
                  <a class="footer__nav-subitem" href="">Новости</a>
                  <a class="footer__nav-subitem" href="">Вакансии</a>
                  <a class="footer__nav-subitem" href="">Контакты</a>
              </div>
          </div>
          <div class="footer__nav-item">
              <a href="" class="footer__nav-item-title">Покупателям</a>
              <div class="footer__nav-subitems">
                  <a class="footer__nav-subitem" href="">Отзывы</a>
                  <a class="footer__nav-subitem" href="">Качество</a>
                  <a class="footer__nav-subitem" href="">Доставка</a>
                  <a class="footer__nav-subitem" href="">Оплата</a>
              </div>
          </div>
          <div class="footer__nav-item">
              <a href="" class="footer__nav-item-title">Партнерам</a>
              <div class="footer__nav-subitems">
                  <a class="footer__nav-subitem" href="">Услуги</a>
                  <a class="footer__nav-subitem" href="">Франшиза</a>
              </div>
          </div>
      </div>
      <div class="footer__dev">
          <div class="footer__dev-copyright">Разработка сайта</div>
          <a href="https://studio-aw.ru/" target="_blank" class="footer__dev-info">Digital студия A&W</a>
      </div>
      <div class="footer__bottom">

      </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/mixins';

.footer__contacts-block {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.footer__download-apps {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
    margin-right: auto;
}

.footer__download-app {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(2, auto);
    align-items: center;
    column-gap: 8px;
    border: 1px solid var(--c-grey70);
    padding: 7px 10px;
    border-radius: var(--b-radius-md);
    color: var(--c-grey70);

    i {
        font-size: functions.rem(25);
        grid-row: 1/-1;

        &:before {
            margin: unset;
        }
    }

    span {
        grid-column: 2;
    }
}

.footer__download-app-text {
    font-size: functions.rem(8);
    line-height: 1;
    text-transform: uppercase;
}

.footer__download-app-title {
    font-size: functions.rem(18);
    line-height: 1;
}

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

.footer__contacts {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.footer__contact {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-template-rows: repeat(2, auto);
    align-items: center;
    grid-column-gap: 10px;
    grid-row-gap: 2px;

    img {
        grid-column: 1;
        grid-row: 1/-1;
        width: 100%;
        height: 100%;
    }
}

.footer__contact-text {
    color: var(--c-grey70);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 600;
    line-height: normal;
    transition: all .2s linear;

    &:hover {
        color: var(--c-grey50);
    }
}

.footer__contact-subtext {
    color: var(--c-grey40);
    font-family: var(--f-base);
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: normal;
}

.footer__socials {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.footer__social {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    align-items: center;
    border-radius: var(--b-radius-round);
    color: var(--c-grey00);
    cursor: pointer;
    transition: all .2s linear;

    &:has(> .icon-instagram) {
        @include mixins.gradient-hover(var(--c-instagram), var(--c-instagram-hover));

    }

    &:has(> .icon-vk) {
        background: var(--c-vk);

        &:hover {
            background: var(--c-vk-hover);
        }
    }

    i {
        font-size: functions.rem(18);

    }

    .icon-vk {
        font-size: functions.rem(20);
        margin-top: 3px;
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
