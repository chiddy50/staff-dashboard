<template>
    <div class="col-12" style="margin-bottom: 80px;">     
        <!-- <div v-if="step === 1">
            <div class="row mb-3">
                <button class="btn btn-danger btn-sm">
                    <i class='bx bx-arrow-back bx-tada text-lg'></i>
                    Go Back
                </button>                
            </div> 
            <div class="choose_type_box">
                <div class="choose_type bg-white shadow-sm">
                    <div class="flex flex-col items-center p-3">
                        <span class="attention_icon">
                            <i class='bx bx-error-circle text-blue-300 '></i>
                        </span>
                        <span class='font-bold text-lg'>Choose Assignment Type</span>
                    </div>
                    <div class="choose_options">
                        <span @click="toggleAssignmentType('cbt')" class="cbt">CBT</span>
                        <span @click="toggleAssignmentType('normal')" class="normal">Normal</span>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- <div v-if="step === 2">            
            <div class="row mb-3">
                <button class="btn btn-danger btn-sm" @click="step = 1">
                    <i class='bx bx-arrow-back bx-tada text-lg'></i>
                    Go Back
                </button>                
            </div> 
            <div class="choose_type_box">
                <div class="choose_type bg-white shadow-sm">
                    <div class="flex flex-col items-center p-3">
                        <span class="attention_icon">
                            <i class='bx bx-check-square text-blue-300'></i>
                        </span>
                        <span class='font-bold text-lg'>Choose Type</span>
                    </div>
                    <div class="choose_options">
                        <span @click="toggle_subjective_objective('subjective')" class="subjective">Subjective</span>
                        <span @click="toggle_subjective_objective('objective')" class="objective">Objective</span>
                    </div>
                </div>
            </div>
        </div> -->


        <div>    
            <div class="row">
                <div class="col-12 col-lg-12">

                    <div class="w-full">
                        <div class="form-group">
                            <div>										
                                <multiselect v-model="assignment_data.subjectValues" tag-placeholder="Search & add Subject" 
                                    placeholder="Choose Subject" label="subject" class="mb-3"
                                    :custom-label="subjectLabel"
                                    :hideSelected="false"
                                    track-by="_id" :options="subjects">
                                </multiselect>										
                            </div>
                        </div>               
                    </div>
                    <div class="w-full">
                        <div class="form-group">
                            <div>										
                                <multiselect v-model="assignment_data.classValues" tag-placeholder="Search & add Classes" 
                                    placeholder="Choose Class" label="class" class="mb-3"
                                    :custom-label="classesLabel"
                                    :hideSelected="true"
                                    track-by="_id" :options="classes" :multiple="true" :taggable="true" @select="tagClasses" @remove="untagClasses">
                                </multiselect>										
                            </div>
                        </div>               
                    </div>

                    <div class="w-full">
                        <div class="form-group">            
                            <label class='m-1'>Title:</label>
                            <input v-model="assignment_data.title" type="text" class="form-control form-control-sm"  placeholder="Title" />
                        </div>
                    </div>

                    <div class="w-full">
                        <div class="form-group">
                            <label class='m-1'>Description:</label>
                            <textarea class='form-control' v-model="assignment_data.description" rows="3" placeholder="Description here..."></textarea>
                        </div>               
                    </div>

                    <div class="w-full mb-3">

                        <div class="col-lg-6 col-12 flex items-center">
                            <b-form-checkbox class="warning" v-model="isCBT" name="check-button" switch>
                                <span class="text-xs">CBT assignment</span>
                            </b-form-checkbox>                   
                        </div>
                    </div>

                    <div class="w-full">
                        <hr/>
                    </div>

                    <div v-if="isCBT" class="w-full">
                        <div class="mb-2">
                            <label>Duration:</label>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" placeholder="00" id="demo" name="email">
                                    <div class="input-group-append">
                                        <span class="input-group-text">Hour</span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" placeholder="00" id="demo" name="email">
                                    <div class="input-group-append">
                                        <span class="input-group-text">Minute</span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" placeholder="00" id="demo" name="email">
                                    <div class="input-group-append">
                                        <span class="input-group-text">Second</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="form-group">
                                <label class='m-1'>Due Date:</label>
                                <input type="date" v-model="assignment_data.due_date" class="form-control form-control-sm"/>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                            <div class="input-group mb-3">
                                <input type="date" class="form-control" placeholder="00" id="demo" name="email">
                                <div class="input-group-append">
                                    <span class="input-group-text">Start Date</span>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="date" class="form-control" placeholder="00" id="demo" name="email">
                                <div class="input-group-append">
                                    <span class="input-group-text">End Date</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <hr/>
                    </div>

                    <!-- <div class="w-full">
                        <button v-b-modal.addQuestion  class="btn btn-outline-info btn-sm mb-4">Add Objective Question</button>
                        <button v-b-modal.addQuestion  class="btn btn-outline-info btn-sm mb-4">Add Subjective Question</button>
                    </div> -->

                    <div class='mb-4'>
                        <div class="flex items-center gap-1 mb-2">
                            <label @click="addLink" class="flex items-center m-0 cursor-pointer text-info text-sm">Click to add links</label>                       
                            <i @click="addLink" class="bx bx-link cursor-pointer" v-b-popover.hover.bottom="'Add link'"></i>                        
                        </div>

                        <div class="assignment_links mb-2" v-for="(link, index) in assignment_data.links" :key="index">
                            <input type="text" v-model="link.text" class="form-control form-control-sm" placeholder="Text" />
                            <input type="text" v-model="link.link" class="form-control form-control-sm" placeholder="URL" />
                            <i v-if="assignment_data.links.length > 1" class="bx bx-trash text-xl cursor-pointer" @click="removeLink(link._id)" v-b-popover.hover.bottom="'Remove link'"></i>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-2">                    
                <div class="col-lg-6 col-12 flex items-center">
                    <button class="btn btn-outline-danger btn-sm flex items-center gap-2">Add Attachments
                        <i class="bx bx-pin"></i>
                    </button>                     
                </div>
            </div>

            <div class="row mb-4">                    
                <div class="col-lg-6 col-12 flex items-center">
                <b-form-checkbox class="warning" v-model="assignment_data.send_notification" name="check-button" switch>
                        <span class="text-xs">Send Notification</span>
                    </b-form-checkbox>                   
                </div>
            </div>
        </div>
        


        <!-- <div class="row">
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label class='small m-1'>Mark Item:</label>
                    <select v-model="assignment_data.marked" class="form-control">
                        <option value="none">None</option>
                        <option value="quiz">Quiz</option>
                        <option value="presentation">Presentation</option>
                        <option value="homework">Homework</option>
                        <option value="project">Project</option>
                        <option value="exam">Exam</option>                                    
                    </select>                        
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <div class="">
                        <label class='small m-1'>Type:</label>
                        <select v-model="assignment_data.type" class="form-control">
                            <option value="">Select Option</option>
                            <option value="essay">Essay</option>
                            <option value="project">Project</option>
                            <option value="review">Review</option>
                            <option value="written">Written</option>
                        </select>                        
                    </div>
                </div>
            </div>    
        </div> -->

        

        <!-- <div class="w-full mb-5">
            <h3 class="text-muted underline mb-4">Questions</h3>

            <div v-if="assignment_data.questions.length" class='bg-white p-4 rounded-lg shadow-sm'>
                <div :key="i" v-for="(question, i) in assignment_data.questions" class="mb-5">
                    <p class="text-gray-500 mb-2">{{ question.name }}</p>

                    <div v-for="(option, index) in question.options" :key="index"  class="input-group mb-1">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="checkbox">
                            </div>
                        </div>
                        <input type="text" disabled class="form-control" :value="option.value">
                    </div>
                </div>
            </div>
            <div v-else class="bg-white p-4 rounded-lg shadow-sm">
                <h6 class="text-center text-gray-500">No questions added</h6>
            </div>
            
        </div> -->
                    
        <!-- <div class="mt-3 flex justify-end">
            <button class="btn btn-success flex items-center mr-3">                    
            <i class="bx bx-check-circle text-white"></i> {{ assignment == null ? 'Create' : 'Update' }}
            </button>
        </div> -->

        <b-modal id="allQuestions"
          content-class="bg-gray-100"
          size="lg"
          centered
          hide-footer
          title="Questions"
          :no-close-on-backdrop="true"
        >
            <questions
                @update-option="update_option" 
                :questions="assignment_data.questions"
                @update-question="updateQuestion"
                >
            </questions>
        </b-modal>

         <b-modal id="addQuestion"
          content-class="bg-gray-100"
          size="lg"
          centered
          hide-footer
          title="Add Question"
          :no-close-on-backdrop="true"
        >
            <div class="w-full flex items-center mb-3">
                <b-form-checkbox class="warning" v-model="isObjective" name="check-button" switch>
                    <span class="text-xs">Objective</span>
                </b-form-checkbox>                   
            </div>
            <objective @send-question="add_question" v-if="isObjective"></objective>
            <subjective v-else></subjective>
         </b-modal>


        <div class="footer p-4 shadow z-10">
            <div class="w-full flex justify-center">
                <button v-b-modal.addQuestion class="btn btn-outline-primary btn-sm">Add Questions</button>
                <button v-b-modal.allQuestions class="btn btn-outline-secondary mx-3 btn-sm">View Questions</button>
                <button class="btn btn-success flex items-center">                    
                    {{ assignment == null ? 'Create' : 'Update' }}
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import Objective from './Objective.vue'
import Subjective from './Subjective.vue'
import Questions from './Questions.vue'

export default {
    name: 'assignmentForm',
    components: {
        Objective,
        Subjective,
        Questions
    },
    props: {
        returnText: {
            default: 'Cancel'
        },
        assignment: {
            default: null
        }
    },
    data(){
        return {
            send_notication: false,
            subjectValues: null,
            classes: [
                {
                    _id: 1,
                    subject: 'Math',
                    class_name: 'SSS1',
                    subclass: 'B'
                },
                { 
                    _id: 2,
                    subject: 'Math',
                    class_name: 'SSS1',
                    subclass: 'C'
                },
                { 
                    _id: 3,
                    subject: 'Math',
                    class_name: 'SSS2',
                    subclass: 'C'
                }
            ],  
            subjects: [ { _id:1, subject: 'Mathematics' }, { _id:2, subject: 'Further Mathematics' } ], 
            viewAssignments: true,
            assignment_types: ['Objective', 'Subjective'],
            // assignment_types: ['CBT', 'Normal'],
            isCBT: true,
            step: 1,
            assignment_data: {
                description: '',
                due_date: null,
                type: '',
                assignment_type: '',
                title: '',
                subjectValues: null,
                classValues: null,
                send_notification: false,
                links: [
                    { title: '', url: '', _id: Math.floor(Math.random() * 9999999999999) } 
                ],
                questions: []
            },
            isObjective: true   
        }
    },
    methods: {
        addLink(){
            if (this.assignment !== null) {
                this.assignment_data.links.push({ title: '', url: '', _id: Math.floor(Math.random() * 9999999999999) })
            }else{
                this.assignment_data.links.push({ title: '', url: '', _id: Math.floor(Math.random() * 9999999999999) })
            }
        },
        removeLink(id){
            // if (this.assignment !== null) {
            //     // this.$store.commit('REMOVE_ASSIGNMENT', id)
            //     this.assignment_data.links = this.assignment_data.links.filter(link => link._id !== id)

            // }else{
            //     if(this.links.length !== 1){
            //         this.links = this.links.filter(link => link._id !== id)
            //     }
            // }
            this.assignment_data.links = this.assignment_data.links.filter(link => link._id !== id)
        },
        toggle_subjective_objective(value){
            this.isObjective = value;
            this.step = 3;
        },
        toggleAssignmentType(view){
            this.isCBT = view;
            this.step = 2;
        },
        tagSubjects(newTag) {  
            // this.personnel_details.subjectIds.push(newTag.id)
        },
        untagSubject(){

        },
        tagClasses(newTag) {  
            // this.personnel_details.subjectIds.push(newTag.id)
        },
        untagClasses(){

        },
        classesLabel ({ class_name, subclass }) {
            return `${class_name} ${subclass}`
        },
        subjectLabel({ subject }) {
            return `${subject}`
        },
        add_question(question){
            this.assignment_data.questions.push(question);
        },
        update_option(e){
            let id = e.target.id;
            this.assignment_data.questions = this.assignment_data.questions.map(question => {
                question.options.forEach(option => {
                    if (option._id == id) {
                        option.value = e.target.value;
                    }
                })
                return question;
            });
        },
        
        updateQuestion(e){
            this.assignment_data.questions = this.assignment_data.questions.map(question => {
                if (Number(question._id) === Number(e.target.id)) {
                    question.name = e.target.value;
                }
                return question;
            })
        }
    },
    mounted() {
        if (this.assignment !== null) {
            this.assignment_data.description = this.assignment.description;
            this.assignment_data.title = this.assignment.title;
            this.assignment_data.marked = this.assignment.marked;
            this.assignment_data.type = this.assignment.type;
            this.assignment_data.send_notification = this.assignment.send_notification;
            this.assignment_data.subjectValues = this.assignment.classes;
            this.assignment_data.links = this.assignment.links;
        
            // split date to format 
            let due_date = this.assignment.due_date.split('/');
            this.assignment_data.due_date = `${due_date[2]}-${due_date[0]}-${due_date[1]}`;
            
        }
    },
    watch: {
       
    }
}
</script>

<style>
.choose_type_box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 4rem 0 0;
    align-items: center;
}

.choose_type {
    width: 400px;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
}

.attention_icon {
    font-size: 50px;
    display: flex;
    align-items: center;
}

.choose_options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.choose_options span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px;
    cursor: pointer;
    transition: all 0.2s;
}

.cbt {
    color: #fff;
    background: darkcyan
}

.normal {
    background: tomato;    
    color: #fff;    
}

.cbt:hover {
    background: #fff;
    color: darkcyan
}

.normal:hover {
    color: tomato;
    background: #fff
}

.back_to_type{
    display: flex;
    justify-content: center;
    padding: 0 0 10px;
}

.back_to_type span{
    background: #6f42c1;
    color: #fff;
}

.objective{
    background: #888;    
    color: #fff;  
}
.subjective {
    background: #6f42c1;    
    color: #fff; 
}

.objective:hover{
    color: #888;    
    background: #fff;  
}
.subjective:hover {
    color: #6f42c1;    
    background: #fff; 
}


.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background: #fff;
   text-align: center;
}
</style>