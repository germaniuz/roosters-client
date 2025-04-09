<script setup lang="ts">
const router = useRouter();
const { logout } = useProfileStore();

onMounted(() => {
    logout();
    router.push({ path: '/' });
});

definePageMeta({
    title: 'Выход',
});
</script>

<template>
    <h1 class="h1 text-center">Выход...</h1>
</template>
