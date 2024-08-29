<script setup lang="ts">
import BaseAppStoreButton from '~/components/BaseAppStoreButton.vue';
</script>

<template>
    <footer class="footer">
        <div class="footer__top container">
            <div class="footer__contacts-block">
                <div class="footer__download-apps">
                    <BaseAppStoreButton icon="playmarket" download-text="Скачать из" store-name="Google Play"/>
                    <BaseAppStoreButton icon="appstore" download-text="Загрузите в" store-name="App Store"/>
                    <BaseAppStoreButton icon="huawei" download-text="Откройте в" store-name="AppGallery"/>
                </div>
                <div class="footer__contacts">
                    <div class="footer__contact">
                        <img src="/images/icons/phone.svg" alt="" class="footer__contact-image">
                        <a class="footer__contact-text" href="tel:8 (8442) 33-77-77">8 (8442) 33-77-77</a>
                        <div class="footer__contact-subtext">Бесплатный звонок</div>
                    </div>
                    <div class="footer__contact">
                        <img src="/images/icons/mail.svg" alt="" class="footer__contact-image">
                        <a class="footer__contact-text"
                           href="mailto:roosters-pizza@yandex.ru">roosters-pizza@yandex.ru</a>
                        <div class="footer__contact-subtext">Для отзывов и предложений</div>
                    </div>
                </div>
                <div class="footer__socials">
                    <a href="#" class="footer__social">
                        <BaseIcon name="instagram"/>
                    </a>
                    <a href="#" class="footer__social">
                        <BaseIcon name="vk"/>
                    </a>
                </div>
            </div>
            <div class="footer__nav">
                <div class="footer__nav-item">
                    <a href="#" class="footer__nav-item-title">Рустерс</a>
                    <div class="footer__nav-subitems">
                        <a class="footer__nav-subitem" href="#">О Нас</a>
                        <a class="footer__nav-subitem" href="#">Новости</a>
                        <a class="footer__nav-subitem" href="#">Вакансии</a>
                        <a class="footer__nav-subitem" href="#">Контакты</a>
                    </div>
                </div>
                <div class="footer__nav-item">
                    <a href="#" class="footer__nav-item-title">Покупателям</a>
                    <div class="footer__nav-subitems">
                        <a class="footer__nav-subitem" href="#">Отзывы</a>
                        <a class="footer__nav-subitem" href="#">Качество</a>
                        <a class="footer__nav-subitem" href="#">Доставка</a>
                        <a class="footer__nav-subitem" href="#">Оплата</a>
                    </div>
                </div>
                <div class="footer__nav-item">
                    <a href="#" class="footer__nav-item-title">Партнерам</a>
                    <div class="footer__nav-subitems">
                        <a class="footer__nav-subitem" href="#">Услуги</a>
                    </div>
                </div>
            </div>
            <div class="footer__dev">
                <div class="footer__dev-copyright">Разработка сайта</div>
                <a href="https://studio-aw.ru/" target="_blank" class="footer__dev-info">Digital студия A&W</a>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="container footer__bottom-container">
                <BaseLogo class="footer__logo" :is-colored="false"/>
                <div class="footer__bottom-text">
                    <div>* Запрещен на территории РФ</div>
                    <div>Внешний вид продукции может отличаться от изображений на сайте</div>
                    <div>© ИП Ярембаш С.В, ИНН 502713354360.</div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/mixins';

.footer {
    position: relative;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 70%;
        bottom: 0;
        z-index: -1;
        background: var(--c-footer-gradient);
    }

    @include media.xl-up {
        &::before {
            height: 100%;
        }
    }
}

.footer__top {
    @include media.md-up {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas:
            "nav contacts"
            "nav dev";
        grid-column-gap: 77px;
    }
}

.footer__contacts-block {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 60px;
    grid-area: contacts;

    @include media.md-up {
        margin-bottom: 40px;

    }
}

.footer__download-apps {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(2, auto);
    margin-right: auto;
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
    gap: 22px;
}

.footer__social {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    position: relative;
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

    .icon-instagram {
        &::after {
            content: '*';
            font-size: functions.rem(26);
            position: absolute;
            color: var(--c-primary);
            right: -8px;
            top: 2px;
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

.footer__nav {
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 60px;
    grid-area: nav;

    @include media.sm-down {
        margin-bottom: 60px;
    }

    @include media.lg-up {
        gap: 40px;
    }
}

.footer__nav-item-title {
    display: block;
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(18);
    font-weight: 600;
    line-height: normal;
    margin-bottom: 30px;
    transition: all .15s linear;

    &:hover {
        color: var(--c-secondary)
    }
}

.footer__nav-subitems {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 140px;

    @include media.lg-up {
        min-width: 130px;
    }

    * {
        padding-block: 5px;

        &:last-child {
            padding-bottom: 0;
        }

        &:first-child {
            padding-top: 0;
        }
    }
}

.footer__nav-subitem {
    color: var(--c-grey60);
    font-family: var(--c-grey60);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    transition: all .15s linear;

    &:hover {
        color: var(--c-secondary)
    }
}

.footer__dev {
    display: flex;
    gap: 5px;
    align-items: baseline;
    flex-wrap: wrap;
    grid-area: dev;

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
    color: var(--c-grey80);
    font-weight: 400;
    font-size: functions.rem(12);
}

.footer__dev-info {
    text-decoration: none;
    color: var(--c-grey80);
    font-weight: 400;
    font-size: functions.rem(14);
    transition: all .2s linear;

    &:hover {
        color: var(--c-grey100);
    }
}

.footer__bottom {
    background: url("/images/footer/footer-bottom-sm.webp") no-repeat;
    background-size: 100% 100%;
    padding-top: 66px;
    margin-top: 60px;
    padding-bottom: 23px;
    position: relative;
    overflow: hidden;

    @include media.md-up {
        background: url("/images/footer/footer-bottom-md.webp") no-repeat;
        background-size: 100% 100%;
        margin-top: 40px;
        padding-top: 80px;
        padding-bottom: 30px;
    }

    @include media.lg-up {
        background: url("/images/footer/footer-bottom-lg.webp") no-repeat;
        background-size: 250% 100%;
        background-position: 50%;
        margin-top: 40px;
        padding-top: 100px;
        padding-bottom: 30px;
    }

    @include media.xl-up {
        background: url("/images/footer/footer-bottom-lg.webp") no-repeat;
        background-size: 3700px calc(100% - 20px);
        background-position: 50% 20px;
        margin-top: 30px;
        padding-top: 153px;
        padding-bottom: 40px;
    }

    //&::before {
    //    content: '';
    //    display: block;
    //    position: absolute;
    //    width: 100%;
    //    height: 110%;
    //    top: -100px;
    //    background: var(--c-footer-gradient);
    //}
}

.footer__bottom-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;

    @include media.md-up {
        flex-direction: row;
        justify-content: space-between;
        padding-inline: 40px;
        align-items: flex-end;
    }

    @include media.lg-up {
        padding-right: 95px;
    }

    @include media.xl-up {
        &::after {
            content: '';
            position: absolute;
            width: 135px;
            height: 135px;
            background: url("/images/footer/footer-bottom-sun.webp") no-repeat;
            background-size: 100%;
            top: -150px;
            right: -50px;
        }
    }
}

.footer__logo {
    max-width: 200px;
    position: relative;

    @include media.xl-up {
        &::after {
            content: '';
            position: absolute;
            background: url("/images/footer/footer-bottom-line.webp") no-repeat;
            background-size: 100%;
            width: 650px;
            height: 80px;
            left: -530px;
            top: -60px;
        }
    }
}

.footer__bottom-text {
    color: var(--c-grey00);
    font-family: var(--f-base);
    font-size: functions.rem(12);
    font-weight: 300;
    line-height: normal;
    display: flex;
    flex-direction: column;
    gap: 15px;

    @include media.md-up {
        max-width: 250px;
    }
}
</style>
