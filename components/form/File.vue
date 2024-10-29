<script setup lang="ts">
import type { CommonFile } from '~/types/Form';

type Props = {
    image?: CommonFile | null;
    name: string;
    errors?: string[] | undefined;
};

const props = defineProps<Props>();
const emit = defineEmits(['change']);

const file = ref('');
const inputField = ref<HTMLInputElement>();

onMounted(() => {
    file.value = props.image?.url ?? '';
});

const fileHandler = ($event: Event) => {
    const fileInput = $event.currentTarget as HTMLInputElement;
    if (fileInput.files?.length) {
        file.value = URL.createObjectURL(fileInput.files[0]);
        emit('change', fileInput.files[0]);
    }
};

const removeFile = () => {
    file.value = '';
    emit('change', null);
    if (inputField.value) {
        inputField.value.value = '';
    }
};
</script>

<template>
    <div class="form-file">
        <div class="single-file-input">
            <img class="single-file-input__preview" v-if="file" :src="file" :alt="name" />
            <label :for="name" v-else class="single-file-input__add-btn" :style="`background: url(${file})`"
                >+ Добавить изображение</label
            >
            <input
                class="single-file-input__input"
                ref="inputField"
                :id="name"
                :name="name"
                type="file"
                @change="fileHandler"
            />
        </div>
        <span class="form-control__error" v-if="errors?.length">{{ errors[0] }}</span>
        <BaseButton v-if="file" :modifiers="['outline']" btn-type="button" @click="removeFile">
            <BaseIcon name="close" />
            <span>Удалить</span>
        </BaseButton>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.form-file {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 190px;

    @include media.md-up {
        margin-bottom: 0;
    }

    .form-control__error {
        text-align: center;
    }
}

.single-file-input {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    margin-inline: auto;

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }
}

.single-file-input__preview {
    width: 100%;
    aspect-ratio: 1;
    border-radius: var(--b-radius);
    border: 1px solid var(--c-grey30);
}

.single-file-input__remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--c-grey60);
    font-size: functions.rem(20);
    cursor: pointer;
}

.single-file-input__add-btn {
    width: 100%;
    aspect-ratio: 1;
    padding: 20px;
    text-align: center;
    font-size: functions.rem(12);
    border: 1px dashed var(--c-grey30);
    border-radius: var(--b-radius);
    display: grid;
    place-items: center;
    color: var(--c-grey50);
    background: var(--c-grey00);
    cursor: pointer;
}

.single-file-input__input {
    display: none;
}
</style>
