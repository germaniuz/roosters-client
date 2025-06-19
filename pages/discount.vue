<template>
    <div class="container discount-page">
        <h1 class="h1">Акции</h1>
        <div class="discount-page__content">
            <p>Здесь будут отображаться актуальные акции и предложения.</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/functions';

.discount-page {
    padding-block: 20px 40px;
}

.discount-page__content {
    margin-top: 30px;
    color: var(--c-grey80);
}
</style>
