<template>
    <div class="classification-container">
        <div v-for="(datum, index) in data"
             class="classification-item">
            {{index + 1}}.{{datum.classification}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: Array
        }
    }
</script>

<style>
    .classification-container {
        padding: 8px 15px;
        color: #666;
    }

    .classification-item {
        height: 25px;
        line-height: 25px;
        padding-left: 15px;
    }
</style>
