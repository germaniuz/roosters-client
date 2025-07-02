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
const wheelRadius = ref(140);
const rimRadius = ref(160);
const centerX = ref(175);
const centerY = ref(175);
const centerCircleRadius = ref(30);

// Spinning state
const isSpinning = ref(false);
const currentRotation = ref(0);
const targetRotation = ref(0);
const startRotation = ref(0);
const animationFrame = ref<number>();
const spinStartTime = ref(0);
const spinDuration = ref(4000); // 4 seconds

// Mascot SVG
const mascotImage = ref<HTMLImageElement | null>(null);

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

// Wheel colors - uniform beige segments with themed colors
const segmentColor = ref('#F5F0E8'); // Beige/cream for segments
const rimColor = ref('#3498db'); // Secondary color for rim
const centerColor = ref('#E53E3E'); // Red for center circle
const pointerColor = ref('#8B4513'); // Brown for pointer
const dotColor = ref('#FFFFFF'); // White for decorative dots

// Get CSS custom property values
const getCSSColors = () => {
    if (typeof window === 'undefined') return;

    const computedStyle = getComputedStyle(document.documentElement);
    // Use CSS custom properties or fallback to theme colors
    segmentColor.value = computedStyle.getPropertyValue('--c-grey-10').trim() || '#F5F0E8';
    rimColor.value = computedStyle.getPropertyValue('--c-secondary').trim() || '#3498db';
    centerColor.value = computedStyle.getPropertyValue('--c-primary').trim() || '#E53E3E';
    pointerColor.value = '#8B4513'; // Keep brown for pointer
    dotColor.value = '#FFFFFF'; // Keep white for dots
};

// Initialize canvas
const initCanvas = () => {
    if (!canvas.value) return;

    ctx.value = canvas.value.getContext('2d');

    // Set canvas size based on screen size
    const isMobile = window.innerWidth < 992; // lg breakpoint
    const size = isMobile ? 290 : 420;
    canvas.value.width = size;
    canvas.value.height = size;

    // Update sizing - make wheel fill the canvas with minimal gap
    wheelRadius.value = size * 0.45;
    rimRadius.value = size * 0.49;
    centerX.value = size / 2;
    centerY.value = size / 2;
    centerCircleRadius.value = size * 0.085;

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
    const canvasSize = canvas.value?.width || 350;
    ctx.value.clearRect(0, 0, canvasSize, canvasSize);

    // If no slots, draw a placeholder wheel
    if (!slots.value.length) {
        drawPlaceholderWheel();
        return;
    }

    // Draw outer rim with decorative dots first
    drawRimWithDots();

    const slotAngle = (2 * Math.PI) / slots.value.length;

    ctx.value.save();
    ctx.value.translate(centerX.value, centerY.value);
    ctx.value.rotate(currentRotation.value);

    // Draw segments with alternating colors and shadow
    slots.value.forEach((slot: FortuneWheelSlot, index: number) => {
        const startAngle = index * slotAngle;
        const endAngle = (index + 1) * slotAngle;

        // Alternate between two colors
        const slotBgColor = index % 2 === 0 ? '#FCEBD4' : '#FFF7EC';

        // Draw segment
        ctx.value!.beginPath();
        ctx.value!.arc(0, 0, wheelRadius.value, startAngle, endAngle);
        ctx.value!.lineTo(0, 0);
        ctx.value!.fillStyle = slotBgColor;
        ctx.value!.fill();

        // Draw slot border first (under shadow)
        ctx.value!.strokeStyle = '#ffffff';
        ctx.value!.lineWidth = 1;
        ctx.value!.stroke();

        // Draw shadow gradient over the segment
        const segmentGradient = ctx.value!.createRadialGradient(0, 0, wheelRadius.value * 0.3, 0, 0, wheelRadius.value);
        segmentGradient.addColorStop(0, 'rgba(212, 190, 154, 0)'); // Transparent light beige
        segmentGradient.addColorStop(0.92, 'rgba(212, 190, 154, 0)'); // Transparent light beige
        segmentGradient.addColorStop(0.98, 'rgba(212, 190, 154, 0.7)'); // Light beige shadow
        segmentGradient.addColorStop(1, 'rgba(212, 190, 154, 0.7)'); // Stronger beige shadow

        ctx.value!.beginPath();
        ctx.value!.arc(0, 0, wheelRadius.value, startAngle, endAngle);
        ctx.value!.lineTo(0, 0);
        ctx.value!.fillStyle = segmentGradient;
        ctx.value!.fill();

        // Draw text
        ctx.value!.save();
        ctx.value!.rotate(startAngle + slotAngle / 2);
        ctx.value!.textAlign = 'center';
        ctx.value!.fillStyle = '#8B4513';
        ctx.value!.font = 'bold 16px Arial, sans-serif';

        // Slot title - positioned closer to center
        ctx.value!.fillText(slot.title || '', wheelRadius.value * 0.55, -5);

        // Slot value
        if (slot.cashback_value) {
            ctx.value!.font = '14px Arial, sans-serif';
            ctx.value!.fillText(`${slot.cashback_value}₽`, wheelRadius.value * 0.55, 12);
        }

        ctx.value!.restore();
    });

    ctx.value.restore();

    // Draw center circle with mascot
    drawCenterCircle();

    // Draw pointer
    drawPointer();
};

// Draw outer rim with decorative dots
const drawRimWithDots = () => {
    if (!ctx.value) return;

    ctx.value.save();
    ctx.value.translate(centerX.value, centerY.value);

    // Draw outer rim (solid color, no gradient)
    ctx.value.beginPath();
    ctx.value.arc(0, 0, rimRadius.value, 0, 2 * Math.PI);
    ctx.value.fillStyle = rimColor.value;
    ctx.value.fill();

    // Draw inner wheel surface with shadow from rim
    ctx.value.beginPath();
    ctx.value.arc(0, 0, wheelRadius.value, 0, 2 * Math.PI);
    ctx.value.fillStyle = '#FFFFFF'; // Base white for wheel surface
    ctx.value.fill();

    // Draw decorative dots around the rim
    const dotCount = 16;
    const dotRadius = 4;
    const dotCircleRadius = (rimRadius.value + wheelRadius.value) / 2;

    for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * 2 * Math.PI;
        const x = Math.cos(angle) * dotCircleRadius;
        const y = Math.sin(angle) * dotCircleRadius;

        // Main dot
        ctx.value.beginPath();
        ctx.value.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.value.fillStyle = dotColor.value;
        ctx.value.fill();
    }

    ctx.value.restore();
};

// Load mascot SVG as image
const loadMascotImage = () => {
    if (typeof window === 'undefined') return;

    const img = new Image();
    img.src = '/images/maskot.svg';
    img.onload = () => {
        mascotImage.value = img;
        drawWheel(); // Redraw when image loads
    };
};

// Draw center circle with mascot
const drawCenterCircle = () => {
    if (!ctx.value) return;

    ctx.value.save();
    ctx.value.translate(centerX.value, centerY.value);

    // Add shadow for center circle
    ctx.value.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.value.shadowBlur = 6;
    ctx.value.shadowOffsetX = 1;
    ctx.value.shadowOffsetY = 1;

    // Draw center circle with white background
    ctx.value.beginPath();
    ctx.value.arc(0, 0, centerCircleRadius.value, 0, 2 * Math.PI);
    ctx.value.fillStyle = '#FFFFFF'; // White background
    ctx.value.fill();

    // Reset shadow for stroke
    ctx.value.shadowColor = 'transparent';
    ctx.value.shadowBlur = 0;
    ctx.value.shadowOffsetX = 0;
    ctx.value.shadowOffsetY = 0;

    // Draw red border
    ctx.value.strokeStyle = centerColor.value; // Red border
    ctx.value.lineWidth = 3;
    ctx.value.stroke();

    // Draw mascot image if loaded
    if (mascotImage.value) {
        const imgSize = centerCircleRadius.value * 1.4;
        ctx.value.drawImage(mascotImage.value, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
    } else {
        // Fallback: draw placeholder
        ctx.value.fillStyle = '#333333';
        ctx.value.font = 'bold 14px Arial, sans-serif';
        ctx.value.textAlign = 'center';
        ctx.value.fillText('🐓', 0, 5);
    }

    ctx.value.restore();
};

// Draw pointer/indicator
const drawPointer = () => {
    if (!ctx.value) return;

    ctx.value.save();
    ctx.value.translate(centerX.value, centerY.value);

    // Add shadow for pointer
    ctx.value.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.value.shadowBlur = 6;
    ctx.value.shadowOffsetX = 2;
    ctx.value.shadowOffsetY = 3;

    // Draw pointer as shield/badge shape
    const pointerWidth = 20;
    const pointerHeight = 35;
    const pointerTop = -rimRadius.value - 8;

    // Create shield/badge path
    ctx.value.beginPath();
    ctx.value.moveTo(0, pointerTop + pointerHeight); // Bottom point
    ctx.value.lineTo(-pointerWidth / 2, pointerTop + pointerHeight - 8); // Bottom left
    ctx.value.lineTo(-pointerWidth / 2, pointerTop + 8); // Left side
    ctx.value.quadraticCurveTo(-pointerWidth / 2, pointerTop, 0, pointerTop); // Top left curve
    ctx.value.quadraticCurveTo(pointerWidth / 2, pointerTop, pointerWidth / 2, pointerTop + 8); // Top right curve
    ctx.value.lineTo(pointerWidth / 2, pointerTop + pointerHeight - 8); // Right side
    ctx.value.closePath();

    // Fill with red gradient
    const pointerGradient = ctx.value.createLinearGradient(0, pointerTop, 0, pointerTop + pointerHeight);
    pointerGradient.addColorStop(0, '#E53E3E'); // Primary red at top
    pointerGradient.addColorStop(0.5, '#DC143C'); // Slightly darker in middle
    pointerGradient.addColorStop(1, '#B91C1C'); // Darker red at bottom

    ctx.value.fillStyle = pointerGradient;
    ctx.value.fill();

    // Reset shadow for stroke
    ctx.value.shadowColor = 'transparent';
    ctx.value.shadowBlur = 0;
    ctx.value.shadowOffsetX = 0;
    ctx.value.shadowOffsetY = 0;

    // Add white stroke
    ctx.value.strokeStyle = '#ffffff';
    ctx.value.lineWidth = 2;
    ctx.value.stroke();

    // Add highlight on top part
    ctx.value.beginPath();
    ctx.value.moveTo(-8, pointerTop + 5);
    ctx.value.quadraticCurveTo(-8, pointerTop + 2, 0, pointerTop + 2);
    ctx.value.quadraticCurveTo(8, pointerTop + 2, 8, pointerTop + 5);
    ctx.value.lineTo(8, pointerTop + 12);
    ctx.value.lineTo(-8, pointerTop + 12);
    ctx.value.closePath();
    ctx.value.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.value.fill();

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

// Handle window resize
const handleResize = () => {
    nextTick(() => {
        initCanvas();
    });
};

// Watch for canvas changes
watch([slots], () => {
    nextTick(() => {
        initCanvas();
    });
});

onMounted(() => {
    loadMascotImage();
    initCanvas();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value);
    }
    window.removeEventListener('resize', handleResize);
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
    max-width: functions.rem(290);
    cursor: pointer;

    @include media.lg-up {
        max-width: functions.rem(420);
    }

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
