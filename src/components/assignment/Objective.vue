<template>
    <div>
        <div>
            <label class="text-xl font-bold">Question</label>
            <wysiwyg v-model="question" />
        </div>

        <div class="row my-3">
            <div class="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-6">                                   
                <span style="padding: 2px 12px; border: 1px solid; border-radius: 3px;"
                class="flex items-center justify-center cursor-pointer font-bold text-blue-400" @click="addOption">
                Click to add option <i class="ml-2 bx bx-plus"></i>
                </span>                    
            </div>
        </div>

        <div class="row my-3">
            <div v-for="(option, index) in options" :key="index" class="col-12">                                   
                <div class="form-group flex items-center">
                    <!-- <span class="text-lg text-gray-400 mr-2">{{ `${index+1}` }}</span> -->
                    <input type="text" class="form-control" @keyup="set_option_text" :id="option._id" ref="options" :placeholder='`Option ${index+1}`'>
                    <i v-if="options.length > 1" class="bx bx-trash cursor-pointer ml-2 text-xl text-red-300" @click="removeOption(option._id)" v-b-popover.hover.bottom="'Remove option'"></i>
                </div>
            </div>
        </div>

        <div class="row my-3">
            <div class="col-12 col-md-12 col-xl-12">
                <multiselect v-model="correct_answer" 
                    placeholder="Choose correct answer" class="mb-3"
                    :hideSelected="false"
                    track-by="_id"
                    label="placeholder"
                    :options="optionsList">
                </multiselect>	
            </div>
        </div>

        <div class="row my-3">
            <div class="col-12">
                <div class="form-group">
                    <textarea class='form-control' v-model="instruction" rows="3" placeholder="Instruction"></textarea>
                </div>               
            </div>
        </div>       

        <div class="">
            <button @click="sendQuestion" class="btn btn-success btn-block">Add</button>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'objective',
    data(){
        return {
            question: null,
            options: [],
            number_of_options: 0,
            correct_answer: null,
            instruction: ''
        }
    },
    methods: {
        addOption(){
            this.options.push({
                _id: Math.ceil(Math.random() * 9999999999999999),
                value: '',
                placeholder: `Option ${this.options.length + 1}`,
                edit: false
            })
        },
        removeOption(id){
            if (this.correct_answer !== null) {
                if (this.correct_answer._id === id) {
                    this.correct_answer = null
                }
            }
            this.options = this.options.filter(option => option._id !== id)
            this.options = this.options.map((option, index) => {
                option.placeholder = `Option ${index + 1}`;
                return option;
            })
        },

        sendQuestion(){
            let question = {};
            question.name = this.question; 
            question.instruction = this.instruction; 
            question.correct_answer = this.correct_answer; 
            question.options = this.options; 
            question._id = Math.ceil(Math.random() * 9999999999999999)

            console.log(question);
            this.$emit('send-question', question);
            this.resetForm()
        },

        set_option_text(e){
            this.options = this.options.map(option => {
                if (option._id === Number(e.target.id)) option.value = e.target.value;
                return option;
            }) 

        },

        resetForm() {
            this.question = null; 
            this.instruction = null; 
            this.correct_answer = null; 
            this.options = []; 
        }
    }, 
    computed: {
        optionsList(){
            let correct_options = [];
            for (let i = 0; i < this.options.length; i++) {
                // const element = this.options[i];
                correct_options.push(this.options[i])
            }
            return correct_options;
        }
    },

    watch: {
        
    }
}
</script>

<style>
.editr--toolbar, .editr {
    background: #fff;
}
</style>