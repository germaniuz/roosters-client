<script lang="ts" setup></script>

<template>
    <div class="default-layout">
        <AppHeader />
        <div class="app">
            <AppToastNotification />
            <main class="main">
                <slot />
            </main>
        </div>
        <AppFooter />
    </div>
</template>
