<template>
    <div>
        <div class="u-flex">
            <div class="text-center">
                <div class="text-9xl font-bold mb-4 text-primary-500">
                    <slot name="header"></slot>
                </div>

                <div class="mb-2"><slot name="body"></slot></div>

                <div>
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
