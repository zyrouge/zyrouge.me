<template>
    <transition name="fade" mode="out-in">
        <slot></slot>
    </transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    @apply opacity-100 transition duration-300;
}

.fade-enter-from,
.fade-leave-to {
    @apply opacity-0;
}
</style>
