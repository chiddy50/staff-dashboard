<template>
    <div>
        <div>
            <label class="text-xl font-bold">Question</label>
            <wysiwyg v-model="myHTML" />
        </div>

        <div class="row my-3">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">                                   
                <span style="padding: 2px 12px; border: 1px solid; border-radius: 3px;"
                class="flex items-center justify-center cursor-pointer font-bold text-blue-400" @click="addOption">
                Click to add option <i class="ml-2 bx bx-plus"></i>
                </span>                    
            </div>
        </div>

        <div class="row my-3">
            <div v-for="(option, index) in options" :key="index" class="col-12 col-xl-6">                                   
                <div class="form-group flex items-center">
                    <!-- <span class="text-lg text-gray-400 mr-2">{{ `${index+1}` }}</span> -->
                    <input type="text" class="form-control"  :placeholder='`Option ${index+1}`'>
                    <i v-if="options.length > 1" class="bx bx-trash cursor-pointer ml-2 text-xl text-red-300" @click="removeOption(option._id)" v-b-popover.hover.bottom="'Remove option'"></i>
                </div>
            </div>
        </div>

        <div class="row my-3">
            <div class="col-12 col-md-6 col-lg-6 col-xl-6">
                <multiselect v-model="correct_answer" 
                    placeholder="Choose correct answer" class="mb-3"
                    :hideSelected="false"
                    :options="optionsList">
                </multiselect>	
            </div>
        </div>

        <div class="row my-3">
            <div class="col-12 col-md-6 col-lg-6 col-xl-6">
                <div class="form-group">
                    <textarea class='form-control' v-model="instruction" rows="3" placeholder="Instruction"></textarea>
                </div>               
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'objective',
    data(){
        return {
            myHTML: null,
            options: [
                {
                    _id: Math.ceil(Math.random() * 9999999999999999),
                    value: ''
                }
            ],
            number_of_options: 0,
            correct_answer: null,
            instruction: ''
        }
    },
    methods: {
        addOption(){
            this.options.push({
                _id: Math.ceil(Math.random() * 9999999999999999),
                value: ''
            })
        },
        removeOption(id){
           
            this.options = this.options.filter(option => option._id !== id)
        }
    }, 
    computed: {
        optionsList(){
            let correct_options = [];
            for (let i = 0; i < this.options.length; i++) {
                // const element = this.options[i];
                correct_options.push(`Option ${i+1}`)
            }
            return correct_options;
        }
    }
}
</script>

<style>
.editr--toolbar, .editr {
    background: #fff;
}
</style>