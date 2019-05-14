<template>
    <div>
        <component :is="this.templateComponent"/>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                menu: true,
                templateComponent: () => import('./templates/Default.vue'),
            };
        },
        watch: {
            '$route'(to, from) {
                if (to.meta.template === from.meta.template) {
                    return;
                }
                if (typeof to.meta.template !== 'undefined') {
                    return this.templateComponent = to.meta.template;
                }
                return this.templateComponent = () => import('./templates/Default.vue');

            }
        },
    };
</script>
