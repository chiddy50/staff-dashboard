<template>
  <div class="w-full">
        <div v-if="editedQuestions.length" class=''>
            <div :key="i" v-for="(question, i) in filter_question.data" class="">
                <div class="flex justify-end">
                    <span class="px-3 py-1 text-xs bg-blue-300 text-light rounded-xl">
                        {{ is_objective(question) ? 'Objective' : 'Subjective' }}
                    </span>
                </div>
                <label style="font-size: 17px; font-weight: 600;">Question {{ currentPage }}</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" @change="toggleEditquestion($event, question._id)">
                        </div>
                    </div>
                    <textarea rows="4" :value="question.question" disabled :id="question._id" @keyup="$emit('update-question', $event)" class="form-control p-3" style="font-size:14px;"></textarea>
                </div>

                <div v-if="question.isObjective || question.is_objective">
                    <h4 style="font-size: 17px;" class="mb-2 font-bold">Options</h4>
                    <div v-for="(option, index) in question.options" :key="index"  class="input-group mb-1">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="checkbox" @change="toggleEditOption($event, option._id)">
                            </div>
                        </div>
                        <input type="text" :id="option._id" @keyup="updateOption($event)" disabled class="form-control form-control-sm" :value="option.value">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i @click="removeOption(question._id, option._id)" class="bx bx-trash cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                    <div class="row my-3">
                        <div class="col-12 col-sm-8 col-md-8 col-lg-4 col-xl-4">                                   
                            <span style="padding: 2px 12px; border: 1px solid; border-radius: 3px;"
                            class="flex items-center justify-center cursor-pointer font-bold text-blue-400" @click="addOption(question._id)">
                            Add more options <i class="ml-2 bx bx-plus"></i>
                            </span>                    
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='m-1 text-lg font-bold'>Answer:</label>
                            <!-- :custom-label="subjectLabel" -->
                        <multiselect v-model="question.correct_answer" tag-placeholder="Choose answer" 
                            placeholder="Choose Subject" label="placeholder" class="mb-3"
                            :hideSelected="false"
                            @select="updateAnswer($event,question._id)"
                            track-by="_id" :options="question.options">
                        </multiselect>	
                    </div> 
                </div>

                <div class="form-group">
                    <label class='m-1 text-lg font-bold'>Instruction:</label>
                    <textarea class='form-control'
                            style="font-size: 13px;"
                            :id="question._id"
                            @keyup="$emit('update-instruction', $event)" 
                            v-model="question.instruction" rows="3" 
                            placeholder="Instruction">
                    </textarea>
                </div>               
                <hr/>    
            </div>
            <div class="">                
                <b-pagination 
                v-model="currentPage" pills 
                :per-page="perpage" 
                :total-rows="filter_question.length" align="center"
                ></b-pagination>
            </div>
        </div>
        <div v-else class="my-4">
            <h6 class="text-center text-gray-500">No questions added</h6>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'questions',
    props: ['questions', 'assignment'],
    data(){
        return {
            currentPage: 1,
            perpage: 1,
            editedQuestions: []
        }
    },
    computed: {
        filter_question() {
            let start = this.currentPage * this.perpage - this.perpage;
            let end = this.currentPage * this.perpage;
            return {
                length: this.editedQuestions.length,
                data: this.editedQuestions.slice(start, end)
            };
        }
    },
    methods: {
        toggleEditOption(e, id){
            let option = document.getElementById(id);
            option.disabled = !option.disabled;
        },
        updateOption(e){
            this.$emit('update-option', e)
        },
        toggleEditquestion(e, id){
            let question = document.getElementById(id);
            question.disabled = !question.disabled;
        },
        addOption(question_id){
            let question = this.editedQuestions.find(question => question._id == question_id); // question to edit
            let option = {
                _id: Math.ceil(Math.random() * 99999999999439999999999),
                value: '',
                placeholder: `Option ${question.options.length + 1}`,
                edit: true 
            }
            this.$emit('update-options', {option, id: question_id});           
        },
        updateAnswer(e, id){
            console.log(e, id);
            this.$emit('update-answer', {answer: e, id})
        },
        is_objective(question){
            let value = question.isObjective || question.is_objective ? true : false;
            // console.log(value);
            return value;
        },
        removeOption(question_id, option_id){
            this.$emit('remove-option', {question_id, option_id})
        }
        
    },
    beforeMount(){
        this.editedQuestions = this.questions;
        // if (this.assignment !== null) {
        //     this.editedQuestions = this.editedQuestions.map((question, index) => {
        //         let obj = {
        //             _id: question._id,
        //             isObjective: question.is_objective,
        //             question: question.question,
        //             correct_answer: {
        //                 _id: Math.ceil(Math.random() * 99999999999999999999945439593499349),
        //                 value: question.correct_answer,
        //                 edit: false,
        //                 placeholder: `Option ${index}`
        //             },
        //             options: []
        //         }

        //         question.options.forEach(option => {
        //             obj.options.push({
        //                 _id: Math.ceil(Math.random() * 99999999999999999999945439593499349),
        //                 edit: false,
        //                 placeholder: `Option ${question.options.length + 1}`,
        //                 value: option
        //             })
        //         });

        //         return obj;
        //     }); 
        // }
    }
}
</script>

<style>

</style>