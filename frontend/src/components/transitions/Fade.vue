<template>
    <transition name="fade" mode="out-in">
        <slot></slot>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
