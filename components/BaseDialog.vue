<script lang="ts" setup>
type Props = {
    isActive: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(['update:isActive']);

const dialog = ref<HTMLDialogElement>();

const closeDialog = () => {
    dialog.value?.close();
    emit('update:isActive', false);
};
const showDialog = () => {
    dialog.value?.showModal();
};

watchEffect(() => {
    if (props.isActive) {
        showDialog();
    } else {
        closeDialog();
    }
});
</script>

<template>
    <dialog class="dialog" ref="dialog" @keydown.stop.esc="closeDialog">
        <div class="dialog__body">
            <slot />
        </div>
        <button class="dialog__close-btn" @click.prevent="closeDialog"><i class="icon-close"></i></button>
    </dialog>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    padding: 20px;
    border-radius: var(--b-radius-xs);
    background: var(--c-paper);
    box-shadow: var(--shadow-md);

    @include media.md-up {
        padding: 65px;
    }

    &::backdrop {
        background: var(--c-backdrop-overlay);
    }
}

.dialog__close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    color: var(--c-text-secondary);
    background: none;
    font-size: functions.rem(18);

    @include media.md-up {
        top: 20px;
        right: 20px;
    }
}
</style>
