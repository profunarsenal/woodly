<template lang="pug">
    profile-wrapper(:title="$lang.statistics")
</template>

<script>
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';

export default {
    name: 'ProfileStatistics',

    components: {
        ProfileWrapper,
    },
};
</script>
