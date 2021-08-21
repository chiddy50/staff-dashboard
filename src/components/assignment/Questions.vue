<template>
  <div class="w-full mb-5">
        <div v-if="questions.length" class=''>
            <div :key="i" v-for="(question, i) in questions" class="mb-5">
                <p class="text-gray-500 mb-2">{{ question.name }}</p>

                <div v-for="(option, index) in question.options" :key="index"  class="input-group mb-1">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" @change="toggleEditOption($event, option._id)">
                        </div>
                    </div>
                    <input type="text" :id="`option_${option._id}`" disabled class="form-control" :value="option.value">
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
            let option = document.getElementById(`option_${id}`);
            option.disabled = !option.disabled;
            console.log(option);
        }
    }
}
</script>

<style>

</style>