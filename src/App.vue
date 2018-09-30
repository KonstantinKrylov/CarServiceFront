<template>
    <v-app>
        <v-layout class="pa-3">
            <search/>
        </v-layout>
    </v-app>
</template>

<script>

    import Search from "./components/Search";

    export default {
        name: 'App',
        components: {
            Search

        },
    }
</script>
