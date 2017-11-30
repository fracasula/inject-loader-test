<template>
    <div>
        <p>Just a test {{ myVariable }}</p>
        <p>Here the error {{ myError }}</p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import http from './../modules/http';

    @Component()
    export default class Test extends Vue {
        myVariable = null;
        myError = null;

        fetch() {
            this.myError = null;

            http.get('/just_an_endpoint')
                .then(response => this.myVariable = response.data)
                .catch(e => this.myError = e);
        }

        mounted() {
            this.fetch();
        }
    }
</script>
