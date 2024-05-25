<template lang="pug">
    profile-wrapper(title="Кассы")
        template(#header)
            v-button(
                type="outline"
                iconSrc="/icons/plus.svg"
            ) Добавить
</template>

<script>
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ProfileCashRegister',

    components: {
        ProfileWrapper,
        VButton,
    },
};
</script>
