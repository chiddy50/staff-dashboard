<template>
    <div>
        <label class="text-xl font-bold">Question</label>
        <wysiwyg v-model="question" />
    </div>
</template>

<script>
export default {
    name: 'subjective',
    data() {
        return {
            question: ''
        }
    }
}
</script>

<style>

</style>