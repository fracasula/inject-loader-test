<template>
    <div>
        <div id="app">
            <router-view></router-view>
        </div>
        <div id="loader" class="loader">
            <div class="spinner">
                <i class="fa fa-cog fa-spin fa-5x fa-fw"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import router from './modules/router';

    export default {
        name: 'app',
        router
    };
</script>
