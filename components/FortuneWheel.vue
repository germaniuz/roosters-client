<script setup lang="ts">
import type { FortuneWheelSlot } from '~/types/FortuneWheel';
import { CLIENT_FORTUNE_WHEEL_QUERY } from '~/gql/queries/fortune';
import { SPIN_FORTUNE_WHEEL } from '~/gql/mutations/fortune';
import { useQuery, useMutation } from 'villus';

type Props = {
    orderId: number | null;
};

type Emits = {
    'spin-complete': [slot: FortuneWheelSlot];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Canvas setup
const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D | null>(null);
const wheelRadius = ref(150);
const centerX = ref(175);
const centerY = ref(175);

// Spinning state
const isSpinning = ref(false);
const currentRotation = ref(0);
const targetRotation = ref(0);
const startRotation = ref(0);
const animationFrame = ref<number>();
const spinStartTime = ref(0);
const spinDuration = ref(4000); // 4 seconds

// GraphQL
const { data: fortuneWheelData, isFetching: loadingSlots } = useQuery({ query: CLIENT_FORTUNE_WHEEL_QUERY });
const { execute: spinWheel, isFetching: loadingSpinning } = useMutation(SPIN_FORTUNE_WHEEL);

// Mock data for demo purposes
const mockSlots: FortuneWheelSlot[] = [
    { id: 1, title: '10% скидка', cashback_value: 0, promocode_id: 1, promocode: { code: 'DEMO10' } },
    { id: 2, title: '100₽ кэшбэк', cashback_value: 100, promocode_id: 0, promocode: { code: '' } },
    { id: 3, title: '5% скидка', cashback_value: 0, promocode_id: 2, promocode: { code: 'DEMO5' } },
    { id: 4, title: '50₽ кэшбэк', cashback_value: 50, promocode_id: 0, promocode: { code: '' } },
    { id: 5, title: '15% скидка', cashback_value: 0, promocode_id: 3, promocode: { code: 'DEMO15' } },
    { id: 6, title: '200₽ кэшбэк', cashback_value: 200, promocode_id: 0, promocode: { code: '' } },
];

// Computed
const slots = computed(() => {
    const apiSlots = fortuneWheelData.value?.clientFortuneWheel || [];
    return apiSlots.length > 0 ? apiSlots : mockSlots;
});
const isLoading = computed(() => loadingSlots.value || loadingSpinning.value);
const canSpin = computed(() => !isSpinning.value && !isLoading.value && slots.value.length > 0);

// Wheel colors - fallback colors that will be replaced with CSS custom properties
const wheelColors = ref([
    '#e74c3c', // Primary fallback
    '#3498db', // Secondary fallback
    '#e74c3c', // Danger fallback
    '#2ecc71', // Success fallback
    '#f39c12', // Warning fallback
    '#95a5a6', // Grey fallback
]);

// Get CSS custom property values
const getCSSColors = () => {
    if (typeof window === 'undefined') return;

    const computedStyle = getComputedStyle(document.documentElement);
    wheelColors.value = [
        computedStyle.getPropertyValue('--c-primary').trim() || '#e74c3c',
        computedStyle.getPropertyValue('--c-secondary').trim() || '#3498db',
        computedStyle.getPropertyValue('--c-danger').trim() || '#e74c3c',
        computedStyle.getPropertyValue('--c-success').trim() || '#2ecc71',
        computedStyle.getPropertyValue('--c-warning').trim() || '#f39c12',
        computedStyle.getPropertyValue('--c-grey-60').trim() || '#95a5a6',
    ];
};

// Initialize canvas
const initCanvas = () => {
    if (!canvas.value) return;

    ctx.value = canvas.value.getContext('2d');

    // Set canvas size
    const size = 350;
    canvas.value.width = size;
    canvas.value.height = size;

    // Update sizing
    wheelRadius.value = size * 0.4;
    centerX.value = size / 2;
    centerY.value = size / 2;

    // Get actual CSS colors
    getCSSColors();

    drawWheel();
};

// Draw placeholder wheel when no slots are available
const drawPlaceholderWheel = () => {
    if (!ctx.value) return;

    ctx.value.save();
    ctx.value.translate(centerX.value, centerY.value);

    // Draw a simple circle with message
    ctx.value.beginPath();
    ctx.value.arc(0, 0, wheelRadius.value, 0, 2 * Math.PI);
    ctx.value.fillStyle = '#f0f0f0';
    ctx.value.fill();
    ctx.value.strokeStyle = '#cccccc';
    ctx.value.lineWidth = 2;
    ctx.value.stroke();

    // Draw loading text
    ctx.value.fillStyle = '#666666';
    ctx.value.font = '16px Arial, sans-serif';
    ctx.value.textAlign = 'center';
    ctx.value.fillText('Загрузка...', 0, 0);

    ctx.value.restore();

    // Draw pointer anyway
    drawPointer();
};

// Draw wheel segments
const drawWheel = () => {
    if (!ctx.value) return;

    // Clear canvas
    ctx.value.clearRect(0, 0, 350, 350);

    // If no slots, draw a placeholder wheel
    if (!slots.value.length) {
        drawPlaceholderWheel();
        return;
    }

    const slotAngle = (2 * Math.PI) / slots.value.length;

    ctx.value.save();
    ctx.value.translate(centerX.value, centerY.value);
    ctx.value.rotate(currentRotation.value);

    // Draw segments
    slots.value.forEach((slot: FortuneWheelSlot, index: number) => {
        const startAngle = index * slotAngle;
        const endAngle = (index + 1) * slotAngle;
        const color = wheelColors.value[index % wheelColors.value.length];

        // Draw segment
        ctx.value!.beginPath();
        ctx.value!.arc(0, 0, wheelRadius.value, startAngle, endAngle);
        ctx.value!.lineTo(0, 0);
        ctx.value!.fillStyle = color;
        ctx.value!.fill();
        ctx.value!.strokeStyle = '#ffffff';
        ctx.value!.lineWidth = 2;
        ctx.value!.stroke();

        // Draw text
        ctx.value!.save();
        ctx.value!.rotate(startAngle + slotAngle / 2);
        ctx.value!.textAlign = 'center';
        ctx.value!.fillStyle = '#ffffff';
        ctx.value!.font = 'bold 14px Arial, sans-serif';

        // Slot title
        ctx.value!.fillText(slot.title || '', wheelRadius.value * 0.7, -5);

        // Slot value
        if (slot.cashback_value) {
            ctx.value!.font = '12px Arial, sans-serif';
            ctx.value!.fillText(`${slot.cashback_value}₽`, wheelRadius.value * 0.7, 10);
        }

        ctx.value!.restore();
    });

    ctx.value.restore();

    // Draw pointer
    drawPointer();
};

// Draw pointer/indicator
const drawPointer = () => {
    if (!ctx.value) return;

    ctx.value.save();
    ctx.value.translate(centerX.value, centerY.value);

    // Pointer triangle
    ctx.value.beginPath();
    ctx.value.moveTo(0, -wheelRadius.value - 10);
    ctx.value.lineTo(-15, -wheelRadius.value - 30);
    ctx.value.lineTo(15, -wheelRadius.value - 30);
    ctx.value.closePath();
    ctx.value.fillStyle = wheelColors.value[0]; // Use first color as primary
    ctx.value.fill();
    ctx.value.strokeStyle = '#ffffff';
    ctx.value.lineWidth = 2;
    ctx.value.stroke();

    ctx.value.restore();
};

// Easing function for smooth animation (ease-in-out)
const easeInOut = (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// Animation loop
const animate = () => {
    if (!isSpinning.value) return;

    const now = Date.now();
    const elapsed = now - spinStartTime.value;
    const progress = Math.min(elapsed / spinDuration.value, 1);

    // Apply easing function
    const easedProgress = easeInOut(progress);

    // Calculate current rotation based on eased progress
    const rotationDiff = targetRotation.value - startRotation.value;
    currentRotation.value = startRotation.value + rotationDiff * easedProgress;

    drawWheel();

    // Stop when animation is complete
    if (progress >= 1) {
        currentRotation.value = targetRotation.value;
        isSpinning.value = false;
        drawWheel();

        // Determine winning slot based on pointer position (top = angle 0)
        const normalizedRotation = ((currentRotation.value % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const slotAngle = (2 * Math.PI) / slots.value.length;

        // The pointer is at the top (angle 0), find which slot center is closest to that position
        const pointerAngle = 0;
        const adjustedAngle = (pointerAngle - normalizedRotation + 2 * Math.PI) % (2 * Math.PI);
        const winningIndex = Math.floor(adjustedAngle / slotAngle) % slots.value.length;
        const winningSlot = slots.value[winningIndex];

        if (winningSlot) {
            emit('spin-complete', winningSlot);
        }
    } else {
        animationFrame.value = requestAnimationFrame(animate);
    }
};

// Spin wheel function
const spin = async () => {
    if (!canSpin.value) return;

    try {
        isSpinning.value = true;

        let winningSlot: FortuneWheelSlot | null = null;

        // If we have an orderId, call the API
        if (props.orderId) {
            try {
                const result = await spinWheel({ order_id: props.orderId });
                winningSlot = result?.data?.spinClientFortuneWheelSpin;
            } catch (apiError) {
                console.error('Fortune wheel API error:', apiError);
                // Fall back to demo mode
            }
        }

        // If no API result, pick a random slot for demo
        if (!winningSlot && slots.value.length > 0) {
            const randomIndex = Math.floor(Math.random() * slots.value.length);
            winningSlot = slots.value[randomIndex];
        }

        if (winningSlot) {
            // Calculate target rotation for winning slot
            const slotIndex = slots.value.findIndex((slot: FortuneWheelSlot) => slot.id === winningSlot!.id);
            if (slotIndex !== -1) {
                const slotAngle = (2 * Math.PI) / slots.value.length;

                // Calculate the center of the winning slot
                // The pointer points up (angle 0), so we need to rotate the wheel
                // so that the center of the winning slot aligns with the pointer
                const slotCenterAngle = slotIndex * slotAngle + slotAngle / 2;

                // Target angle to align slot center with pointer (top)
                const targetAngle = -slotCenterAngle;

                // Normalize to ensure we spin in the positive direction
                const normalizedTarget = targetAngle + Math.ceil(Math.abs(targetAngle) / (2 * Math.PI)) * 2 * Math.PI;

                // Add multiple full rotations for visual effect
                const spins = 5 + Math.random() * 3; // 5-8 full rotations

                // Store the starting rotation
                startRotation.value = currentRotation.value;
                targetRotation.value = startRotation.value + spins * 2 * Math.PI + normalizedTarget;

                // Record animation start time
                spinStartTime.value = Date.now();

                animate();
            }
        } else {
            isSpinning.value = false;
        }
    } catch (error) {
        console.error('Fortune wheel spin error:', error);
        isSpinning.value = false;
    }
};

// Watch for canvas changes
watch([slots], () => {
    nextTick(() => {
        initCanvas();
    });
});

onMounted(() => {
    initCanvas();
});

onUnmounted(() => {
    if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value);
    }
});
</script>

<template>
    <div class="fortune-wheel">
        <div class="fortune-wheel__container">
            <div v-if="loadingSlots" class="fortune-wheel__loading">
                <p>Загрузка...</p>
            </div>

            <div v-else-if="!slots.length" class="fortune-wheel__empty">
                <p>Нет доступных призов</p>
            </div>

            <div v-else class="fortune-wheel__wheel">
                <canvas ref="canvas" class="fortune-wheel__canvas" @click="spin" />
            </div>
        </div>

        <div class="fortune-wheel__controls">
            <BaseButton :modifiers="['primary', 'lg']" :disabled="!canSpin" @click="spin">
                {{ isSpinning ? 'Крутится...' : 'Крутить' }}
            </BaseButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.fortune-wheel {
    text-align: center;
}

.fortune-wheel__container {
    margin-bottom: functions.rem(24);
    display: flex;
    justify-content: center;
}

.fortune-wheel__loading,
.fortune-wheel__empty {
    padding: functions.rem(40);
    color: var(--c-grey-60);
}

.fortune-wheel__wheel {
    position: relative;
}

.fortune-wheel__canvas {
    width: 100%;
    height: auto;
    max-width: 350px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.fortune-wheel__controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: functions.rem(12);
    margin-top: functions.rem(24);
}
</style>
