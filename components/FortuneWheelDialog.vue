<script setup lang="ts">
import type { FortuneWheelSlot } from '~/types/FortuneWheel';

type Props = {
    isActive: boolean;
    orderId: number | null;
};

type Emits = {
    'update:isActive': [value: boolean];
    'spin-complete': [slot: FortuneWheelSlot];
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const winningSlot = ref<FortuneWheelSlot | null>(null);
const showResult = ref(false);

const handleSpinComplete = (slot: FortuneWheelSlot) => {
    winningSlot.value = slot;
    showResult.value = true;
    emit('spin-complete', slot);
};

const handleDialogClose = (value: boolean) => {
    emit('update:isActive', value);
    // Reset state when closing
    if (!value) {
        showResult.value = false;
        winningSlot.value = null;
    }
};

const goToHome = () => {
    handleDialogClose(false);
    navigateTo('/');
};
</script>

<template>
    <BaseDialog :is-active="isActive" :modifiers="['full-screen', 'no-padding']" @update:is-active="handleDialogClose">
        <div class="fortune-wheel-dialog">
            <!-- Mobile Layout -->
            <div class="fortune-wheel-dialog__mobile-layout">
                <!-- Title -->
                <div class="fortune-wheel-dialog__title">
                    <h2>
                        <span class="fortune-wheel-dialog__title-word fortune-wheel-dialog__title-word--first"
                            >Пицца</span
                        >
                        <span class="fortune-wheel-dialog__title-word fortune-wheel-dialog__title-word--second"
                            >Фортуны</span
                        >
                    </h2>
                </div>

                <!-- Wheel -->
                <div class="fortune-wheel-dialog__wheel-container">
                    <FortuneWheel :order-id="orderId" @spin-complete="handleSpinComplete" />
                </div>

                <!-- Call to Action -->
                <div class="fortune-wheel-dialog__cta">
                    <p>Крутите колесо и получите шанс выиграть приз!</p>
                </div>

                <!-- White Card -->
                <div class="fortune-wheel-dialog__info-card">
                    <div class="fortune-wheel-dialog__info-header">
                        <span class="fortune-wheel-dialog__info-title">Попыток</span>
                        <span class="fortune-wheel-dialog__info-count">x1</span>
                        <div class="fortune-wheel-dialog__info-icon">
                            <i class="icon-pizza"></i>
                        </div>
                    </div>
                    <div class="fortune-wheel-dialog__info-steps">
                        <div class="fortune-wheel-dialog__info-step">
                            Нажмите на кнопку и запустите наше яркое и красочное колесо.
                        </div>
                        <div class="fortune-wheel-dialog__info-step">
                            Когда колесо остановится, вы увидите, какой приз вам достался.
                        </div>
                    </div>
                    <BaseButton
                        class="fortune-wheel-dialog__spin-button"
                        :modifiers="['primary', 'lg']"
                        @click="() => {}"
                    >
                        Запустить колесо
                    </BaseButton>
                </div>
            </div>

            <!-- Desktop Layout -->
            <div class="fortune-wheel-dialog__desktop-layout">
                <div class="fortune-wheel-dialog__main-content">
                    <!-- Left side - Fortune Wheel -->
                    <div class="fortune-wheel-dialog__wheel-container">
                        <FortuneWheel :order-id="orderId" @spin-complete="handleSpinComplete" />
                    </div>

                    <!-- Right side -->
                    <div class="fortune-wheel-dialog__right-side">
                        <!-- Title -->
                        <div class="fortune-wheel-dialog__title">
                            <h2>
                                <span class="fortune-wheel-dialog__title-word fortune-wheel-dialog__title-word--first"
                                    >Пицца</span
                                >
                                <span class="fortune-wheel-dialog__title-word fortune-wheel-dialog__title-word--second"
                                    >Фортуны</span
                                >
                            </h2>
                        </div>

                        <!-- Call to Action -->
                        <div class="fortune-wheel-dialog__cta">
                            <p>Крутите колесо и получите шанс выиграть приз!</p>
                        </div>

                        <!-- White Card -->
                        <div class="fortune-wheel-dialog__info-card">
                            <div class="fortune-wheel-dialog__info-header">
                                <span class="fortune-wheel-dialog__info-title">Попыток</span>
                                <span class="fortune-wheel-dialog__info-count">x1</span>
                                <div class="fortune-wheel-dialog__info-icon">
                                    <i class="icon-pizza"></i>
                                </div>
                            </div>
                            <div class="fortune-wheel-dialog__info-steps">
                                <div class="fortune-wheel-dialog__info-step">
                                    Нажмите на кнопку и запустите наше яркое и красочное колесо.
                                </div>
                                <div class="fortune-wheel-dialog__info-step">
                                    Когда колесо остановится, вы увидите, какой приз вам достался.
                                </div>
                            </div>
                            <BaseButton
                                class="fortune-wheel-dialog__spin-button"
                                :modifiers="['primary', 'lg']"
                                @click="() => {}"
                            >
                                Запустить колесо
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer text -->
            <div class="fortune-wheel-dialog__footer">
                <p>
                    Жизнь оживает с пиццей Roosters! Наши двери никогда не закрываются для вас — круглосуточная доставка
                    любимых пицц прямо к вам домой! Независимо от дня и времени, вы всегда можете насладиться ароматной,
                    горячей пиццей. Наши операторы свяжутся с вами для подтверждения заказа и сообщат время доставки,
                    которое может немного превышать 60 минут, чтобы вы точно знали, когда ждать свой вкусный заказ.
                </p>
            </div>
        </div>
    </BaseDialog>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.fortune-wheel-dialog {
    position: relative;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    padding: functions.rem(40) functions.rem(20);
    color: var(--c-grey00);
    overflow-y: auto;
    background-image: url('/images/red-star-bg.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: var(--b-radius-lg);

    @include media.lg-up {
        padding: functions.rem(60) functions.rem(40);
    }
}

.fortune-wheel-dialog__title {
    text-align: center;
    margin-bottom: functions.rem(40);
    z-index: 1;
    position: relative;

    h2 {
        font-size: functions.rem(48);
        font-weight: 700;
        margin: 0;
        display: flex;
        flex-direction: column;
        line-height: 1;

        @include media.lg-up {
            font-size: functions.rem(64);
        }
    }
}

.fortune-wheel-dialog__title-word {
    background: transparent;
    color: var(--c-primary);
    padding: 10px 50px 10px 40px;
    position: relative;
    width: fit-content;
    font-weight: 700;
    font-style: italic;
    transform: rotate(-10deg);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--c-grey00);
        clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
        z-index: -2;
    }

    &::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        right: -4px;
        bottom: -4px;
        background: rgba(0, 0, 0, 0.3);
        z-index: -3;
        clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
    }

    &--second {
        margin-left: 60px;
        margin-top: -20px;

        &::before {
            clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
        }

        &::after {
            clip-path: polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%);
        }
    }
}

// Mobile Layout
.fortune-wheel-dialog__mobile-layout {
    display: flex;
    flex-direction: column;
    gap: functions.rem(24);
    flex: 1;

    @include media.lg-up {
        display: none;
    }
}

// Desktop Layout
.fortune-wheel-dialog__desktop-layout {
    display: none;
    flex: 1;

    @include media.lg-up {
        display: block;
    }
}

.fortune-wheel-dialog__main-content {
    display: flex;
    align-items: center;
    gap: functions.rem(60);
    margin-bottom: functions.rem(40);

    @include media.lg-up {
        display: grid;
        grid-template-columns: functions.rem(500) 1fr;
    }
}

.fortune-wheel-dialog__wheel-container {
    flex: 0 0 auto;

    @include media.lg-up {
        flex: 0 0 400px;
    }
}

.fortune-wheel-dialog__right-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: functions.rem(24);
}

.fortune-wheel-dialog__cta {
    text-align: center;

    p {
        font-size: functions.rem(18);
        color: var(--c-grey00);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        margin: 0;
        font-weight: 600;

        @include media.lg-up {
            font-size: functions.rem(20);
            text-align: left;
        }
    }
}

.fortune-wheel-dialog__info-card {
    background: var(--c-grey00);
    border-radius: functions.rem(20);
    padding: functions.rem(24);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.fortune-wheel-dialog__info-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: functions.rem(20);
    position: relative;
    background: var(--c-secondary-extra-light);
    border-radius: var(--b-radius-lg);
    padding: functions.rem(16);
}

.fortune-wheel-dialog__info-title {
    font-size: functions.rem(20);
    font-weight: 300;
    color: var(--c-secondary);
}

.fortune-wheel-dialog__info-count {
    font-size: functions.rem(24);
    font-weight: 700;
    color: var(--c-secondary);
    margin-left: auto;
}

.fortune-wheel-dialog__info-icon {
    width: functions.rem(40);
    height: functions.rem(40);
    background: var(--c-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
        font-size: functions.rem(20);
        color: var(--c-grey00);
    }
}

.fortune-wheel-dialog__info-steps {
    margin-bottom: functions.rem(24);
    counter-reset: step-counter;
}

.fortune-wheel-dialog__info-step {
    margin-bottom: functions.rem(12);
    font-size: functions.rem(14);
    color: var(--c-grey70);
    line-height: 1.4;
    position: relative;
    padding-left: functions.rem(24);
    counter-increment: step-counter;

    &:last-child {
        margin-bottom: 0;
    }

    &::before {
        content: counter(step-counter) '.';
        position: absolute;
        left: 0;
        top: 0;
        font-size: functions.rem(14);
        font-weight: 600;
        color: var(--c-grey70);
    }
}

.fortune-wheel-dialog__spin-button {
    width: 100%;
}

.fortune-wheel-dialog__footer {
    margin-top: functions.rem(40);
    text-align: center;

    p {
        font-size: functions.rem(12);
        color: var(--c-grey00);
        opacity: 0.7;
        line-height: 1.4;
        margin: 0;

        @include media.lg-up {
            font-size: functions.rem(14);
        }
    }
}
</style>
