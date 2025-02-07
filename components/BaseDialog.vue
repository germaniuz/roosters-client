<script lang="ts" setup>
type Modifier = 'p-sm' | 'bg-grey';
type Props = {
    isActive: boolean;
    modifiers?: Modifier[];
    sm?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits(['update:isActive', 'close']);

const dialog = ref<HTMLDialogElement>();
const dialogBody = ref<HTMLDialogElement>();

const modifiers = computed(() => {
    return props?.modifiers?.map((modifier) => 'dialog--' + modifier).join(' ') ?? '';
});

const closeDialog = () => {
    dialog.value?.close();
    emit('update:isActive', false);
    emit('close');
};

const showDialog = () => {
    dialog.value?.showModal();
};

watchEffect(() => {
    if (props.isActive) {
        showDialog();

        if (document) {
            document.body.classList.add('body--fixed');
        }
    } else {
        closeDialog();

        if (document) {
            document.body.classList.remove('body--fixed');
        }
    }
});

useClickOutside(dialogBody, closeDialog);
</script>

<template>
    <dialog ref="dialog" :class="`dialog ${modifiers} ${sm ? 'dialog--sm' : ''}`" @keydown.stop.esc="closeDialog">
        <div ref="dialogBody" class="dialog__body">
            <slot />
        </div>
        <button class="dialog__close-btn" @click.prevent="closeDialog"><i class="icon-close"></i></button>
    </dialog>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: var(--b-radius);
    background: var(--c-grey00);
    box-shadow: var(--shadow);
    overflow: initial;

    &::backdrop {
        background: color(from var(--c-grey90) srgb r g b / 0.8);
    }

    &--bg-grey {
        background: var(--c-grey10);
    }
}

.dialog__body {
    padding: 40px;

    @include media.md-up {
        padding: 65px;
    }

    .dialog--p-sm & {
        padding-block: 50px 20px;
        padding-inline: 20px;
    }

    .dialog--sm & {
        padding: 20px;
    }
}

.dialog__close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    color: var(--c-grey50);
    background: none;
    font-size: functions.rem(24);

    @include media.lg-up {
        top: -40px;
        right: 0;
        color: var(--c-grey00);
    }
}
</style>
