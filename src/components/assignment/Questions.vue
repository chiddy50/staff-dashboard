<template>
  <div class="w-full mb-5">
        <div v-if="questions.length" class=''>
            <div :key="i" v-for="(question, i) in questions" class="mb-5">
                <!-- <p class="text-gray-500 mb-2">{{ question.name }}</p> -->

                <label style="font-size: 17px; font-weight: 600;">Question {{(i+1)}}</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox">
                        </div>
                    </div>
                    <input type="text" disabled class="form-control form-control-lg" :value="question.name">
                </div>

                <div v-for="(option, index) in question.options" :key="index"  class="input-group mb-1">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" @change="toggleEditOption($event, option._id)">
                        </div>
                    </div>
                    <input type="text" :id="option._id" @keyup="updateOption($event)" disabled class="form-control form-control-sm" :value="option.value">
                </div>
            </div>
        </div>
        <div v-else class="">
            <h6 class="text-center text-gray-500">No questions added</h6>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'questions',
    props: ['questions'],
    methods: {
        toggleEditOption(e, id){
            console.log(e, id);
            let option = document.getElementById(id);
            option.disabled = !option.disabled;
            console.log(option);
        },
        updateOption(e){
            this.$emit('update-option', e)
        }
    }
}
</script>

<style>

</style>