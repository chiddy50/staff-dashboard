<template>
    <div class="col-12" style="margin-bottom: 80px;"> 
        <div v-if="loading" class="flex justify-center my-5">
            <div style="width: 6rem; height: 6rem;" class="spinner-border text-dark"></div>        
        </div>
        <div v-else>    
            <div class="row">
                <div class="col-12 col-lg-12">
                    <div class="w-full mt-3">
                        <div class="input-group mb-3 input-group-sm">
                            <div class="input-group-prepend">
                            <span class="input-group-text">Week</span>
                            </div>
                            <select v-model="assignment_data.week" class="form-control">
                                <option v-for="week in all_weeks" :value="week.index" :key="week.index">{{ week.value }}</option>                   
                                <option :value="this.assignment_data.week" hidden>Choose week</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="form-group">
                            <label class='m-1'>Subject:</label>
                            <multiselect v-model="assignment_data.subject" tag-placeholder="Search & add Subject" 
                                placeholder="Choose Subject" label="subject" class="mb-3"
                                :custom-label="subjectLabel"
                                :hideSelected="false"
                                track-by="_id" :options="subjects">
                            </multiselect>	
                        </div>               
                    </div>
                    <div class="w-full">
                        <div class="form-group">
                            <label class='m-1'>Classes:</label>
                            <multiselect v-model="assignment_data.classValues" tag-placeholder="Search & add Classes" 
                                :custom-label="classesLabel"
                                placeholder="Choose Class" label="placeholder" class="mb-3"
                                :hideSelected="true"
                                track-by="tag" :options="classes" :multiple="true" :taggable="true" @select="tagClasses" @remove="untagClasses">
                            </multiselect>										                            
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

                    <div class="w-full">
                        <div class="form-group">
                            <label class='m-1'>Instructions:</label>
                            <textarea class='form-control' v-model="assignment_data.instruction" rows="3" placeholder="Instructions here..."></textarea>
                        </div>               
                    </div>

                    <div class="w-full mb-3">

                        <div class="col-lg-6 col-12 flex items-center">
                            <b-form-checkbox class="warning" v-model="assignment_data.isCBT" name="check-button" switch>
                                <span class="text-xs">CBT assignment</span>
                            </b-form-checkbox>                   
                        </div>
                    </div>

                    <div class="w-full">
                        <hr/>
                    </div>

                    <div v-if="assignment_data.isCBT" class="w-full">
                        <div class="mb-2">
                            <label>Duration:</label>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                                <div class="input-group mb-3">
                                    <input type="number" v-model="assignment_data.duration.hours" class="form-control" placeholder="00">
                                    <div class="input-group-append">
                                        <span class="input-group-text">Hour</span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" v-model="assignment_data.duration.minutes" placeholder="00">
                                    <div class="input-group-append">
                                        <span class="input-group-text">Minute</span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" v-model="assignment_data.duration.seconds" placeholder="00">
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
                                <input type="date" v-model="assignment_data.start_date" class="form-control" placeholder="00">
                                <div class="input-group-append">
                                    <span class="input-group-text">Start Date</span>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="date" v-model="assignment_data.end_date" class="form-control" placeholder="00">
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
                        <button class="link_btn flex items-center gap-1 mb-2">
                            <label @click="addLink" class="flex items-center m-0 cursor-pointer text-info text-sm">Click to add links</label>                       
                            <i @click="addLink" class="bx bx-link cursor-pointer" v-b-popover.hover.bottom="'Add link'"></i>                        
                        </button>

                        <div class="assignment_links mb-2" v-for="(link, index) in assignment_data.links" :key="index">
                            <input type="text" v-model="link.title" class="form-control form-control-sm" placeholder="Text" />
                            <input type="text" v-model="link.url" class="form-control form-control-sm" placeholder="URL" />
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

        <b-modal id="allQuestions"
          content-class="bg-gray-100"
          size="lg"
          centered
          hide-footer
          hide-header
          :no-close-on-backdrop="false"
        >
          <!-- title="All Questions" -->
            <questions
                @update-option="update_option" 
                :questions="assignment_data.questions"
                @update-question="updateQuestion"
                @update-instruction="updateInstruction"
                @update-answer="updateAnswer"
                @update-options="updateOptions"
                :assignment="assignment"
                @remove-option="removeOption"
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
            <question-form @send-question="add_question" :isObjective="isObjective"></question-form>
         </b-modal>

        <b-modal id="summary"
          content-class="bg-gray-100"
          size="xl"
          centered
          hide-footer
          hide-header
          :no-close-on-backdrop="false"
        >
            <Summary @proceed="create_assignment()"
                    :assignment_data="assignment_data"
                    :edit="edit"                    
                    />
        </b-modal>


        <div class="footer p-4 shadow z-10">
            <div class="w-full flex justify-center">
                <button :disabled='loading || add_loading' v-b-modal.addQuestion class="btn btn-outline-primary btn-sm">Add Question</button>
                <button :disabled='loading || add_loading' v-b-modal.allQuestions class="btn btn-outline-secondary mx-3 btn-sm">View Questions</button>
                <button :disabled='loading || add_loading' @click="viewSummary" style="display: flex;" class="btn btn-success flex items-center">                    
                    <div v-if="add_loading" class="spinner-border spinner-border-sm mr-2"></div>
                    Summary
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import QuestionForm from './QuestionForm.vue'
import Questions from './Questions.vue'
import Summary from './Summary.vue'
import Helper from "@/helpers/functions";
import { DateTime } from "luxon";

export default {
    name: 'assignmentForm',
    components: {
        QuestionForm,
        Questions,
        Summary
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
            active_term_weeks: null,
            send_notication: false,
            subject: null,
            classes: [],  
            subjects: [], 
            step: 1,
            isObjective: true,
            assignment_data: {
                isCBT: true,
                week:'',
                description: '',
                due_date: null,
                title: '',
                subject: null,
                classValues: null,
                send_notification: false,
                links: [
                    // { title: '', url: '', _id: Math.floor(Math.random() * 9999999999999) } 
                ],
                duration: {
                    minutes: '00',
                    hours: '00',
                    seconds: '00'
                },
                questions: [],
                start_date: null,
                end_date: null,
                instruction: null,
                attachment: null
            },
            staff_data: [],
            loading: false,
            add_loading: false,
            assignments: [],
            first_edit_has_occured: false   
        }
    },
    computed: {
        all_weeks(){
            let weeks = [];
            for (let i = 0; i < this.active_term_weeks; i++) {
                let index = i + 1;
                weeks.push({ index, value: `Week ${index}` });
            }
            return weeks;
        },
        edit(){
            return this.assignment === null ? true : false;
        }
        // subject_classes(){
        //     let subject_classes = [];
        //     // this.staff_data.forEach(item => {
        //     //     if (this.assignment_data.subject._id === item._id) {
        //     //         subject_classes = item;
        //     //     }
        //     // })
        //     return subject_classes;
        // }
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
            this.assignment_data.links = this.assignment_data.links.filter(link => link._id !== id)
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
        classesLabel ({ placeholder }) {
            return `${placeholder}`
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
            console.log(e.target.value, e.target.id);
            this.assignment_data.questions = this.assignment_data.questions.map(question => {
                let firstId = typeof question._id == "number" ? Number(question._id) : question._id 
                let secondId = typeof e.target.id == "number" ? Number(e.target.id) : e.target.id

                if (firstId === secondId) {
                    question.question = e.target.value;
                }
                return question;
            })
        },
        updateInstruction(e){
            this.assignment_data.questions = this.assignment_data.questions.map(question => {
                let firstId = typeof question._id == "number" ? Number(question._id) : question._id 
                let secondId = typeof e.target.id == "number" ? Number(e.target.id) : e.target.id

                if (firstId === secondId) {
                    question.instruction = e.target.value;
                }
                return question;
            })
        },
        updateAnswer({ answer, id }){
            this.assignment_data.questions = this.assignment_data.questions.map(question => {
                let firstId = typeof question._id == "number" ? Number(question._id) : question._id 
                let secondId = typeof id == "number" ? Number(id) : id

                if (firstId === secondId) {
                    question.correct_answer = answer;
                }
                return question;
            })
        },
        updateOptions({ option, id }){
            this.assignment_data.questions = this.assignment_data.questions.map(question => {
                let firstId = typeof question._id == "number" ? Number(question._id) : question._id 
                let secondId = typeof id == "number" ? Number(id) : id

                if (firstId === secondId) {
                    question.options.push(option);
                }
                return question;
            })
        },
        removeOption({ question_id, option_id }){
            console.log(question_id, option_id);
            this.assignment_data.questions = this.assignment_data.questions.map(question => {
                let questionID = typeof question_id == "number" ? Number(question_id) : question_id 
                let optionID = typeof option_id == "number" ? Number(option_id) : option_id

                if (questionID === question._id) {                    
                    question.options = question.options.filter(option => option._id !== optionID);
                }
                return question;
            })
        },
        async create_assignment(){
            let request = this.format_request();
            // console.log(request);
            // return;
            let url = this.assignment === null ? "school/add-assignment" : "school/update-assignment";
            let message = this.assignment === null ? 'created' : 'updated';
            try {
                this.add_loading = true;
                let auth = Helper.auth();
                let { data, status } = await this.$axios.post(
                    url,
                    request,
                    auth
                );
                this.add_loading = false;
                if (status == 200) {
                    console.log(data);
                    this.assignments = data.message;
                    this.$emit('set-assignments', data.message);
                    this.showError(`Successfully ${message} assignment`);
                    // this.set_all_assessments(data.data)
                    this.$bvModal.hide('summary');
                }
            } catch (error) {
                this.add_loading = false;
                console.log(error);
            }
        },
        format_request(){
            let request = {}

            request.instruction = this.assignment_data.instruction;
            request.assignment_id = this.assignment_data.assignment_id ? this.assignment_data.assignment_id : null ;
            request.assignment_week = this.assignment_data.week
            request.subject = this.assignment_data.subject.subject;
            request.classes = this.assignment_data.classValues.map(item => ({ class: item.class, subclass: item.subclass }) );

            request.title = this.assignment_data.title
            request.description = this.assignment_data.description
            request.is_cbt = this.assignment_data.isCBT;
            request.send_notification = this.assignment_data.send_notification;
            
            if (request.is_cbt) {                
                request.duration = this.assignment_data.duration;
                request.due_date = this.assignment_data.due_date;
            }else{
                request.start_date = this.assignment_data.start_date;
                request.end_date = this.assignment_data.end_date;
            }

            request.links = this.assignment_data.links.map(item => {
                return { title: item.title, url: item.url }
            });
            
            request.attachment = this.assignment_data.attachment;
            request.questions = this.assignment_data.questions.map(item => {
                let obj = {}

                if (item.isObjective) {                
                    obj.correct_answer = item.correct_answer.value;
                    obj.is_objective = item.isObjective;
                    obj.question = item.question;
                    obj.correct_answer = item.correct_answer.value;
                    obj.instruction = item.instruction;
                    obj.options = []
                    item.options.forEach(option => {
                        obj.options.push(option.value)
                    })
                }else{
                    obj.question = item.question;
                    obj.is_objective = item.isObjective;
                    obj.instruction = item.instruction;                
                }
                
                return obj;
            });
            return request;
        },  
        async get_teacher_details(){
            try {
                this.loading = true;
                let auth = Helper.auth();
                let { data, status } = await this.$axios.get(
                    "/school/staff-assignment-bio",
                    auth
                );
                this.loading = false;
                if (status == 200) {
                    this.active_term_weeks = data.weeks;
                    this.staff_data = data.maindata;
                    this.subjects = data.maindata.map(item => {
                        return { _id: item._id, subject: item.subject }
                    });

                    if (this.assignment !== null) {
                        this.setUpdateValue();
                        // this.first_edit_has_occured = true;
                    }
                }
            } catch (error) {
                console.log(error);
                console.log(error.response);
                this.loading = false;
            }
        },
        viewSummary(){
            this.$bvModal.show('summary');
            // this.create_assignment()
        },
        setUpdateValue(){
            this.assignment_data.week = this.assignment.assignment_week; // set week of  assignment
            this.assignment_data.assignment_id = this.assignment._id ? this.assignment._id : null ;
            
            let subject = this.assignment.subject;             
            this.assignment_data.subject = { // set subject of assignment
                subject: subject.charAt(0).toUpperCase() + subject.substring(1),
                _id: Math.floor(Math.random() * 999999999999999999999999999999999999999)
            }

            // set selected classes
            this.assignment_data.classValues = this.assignment.classes.map(item => {
                return {
                    class: item.class,
                    subclass: item.subclass,
                    tag: `${item.class.toUpperCase()} - ${item.subclass.toUpperCase()}`,
                    placeholder: `${item.class.toUpperCase()} - ${item.subclass.toUpperCase()}`,
                }
            });

            this.assignment_data.title = this.assignment.title; // set title of assignment
            this.assignment_data.description = this.assignment.description; // set description of assignment
            this.assignment_data.instruction = this.assignment.instruction; // set instruction of assignment            
            this.assignment_data.isCBT = this.assignment.is_cbt; // set if assignment is CBT

            if (this.assignment.is_cbt) {                
                this.assignment_data.duration = this.assignment.duration; // set duration            
                this.assignment_data.due_date = DateTime.fromISO(this.assignment.due_date).toFormat('yyyy-LL-dd'); 
            }else{
                this.assignment_data.start_date = DateTime.fromISO(this.assignment.start_date).toFormat('yyyy-LL-dd'); 
                this.assignment_data.end_date = DateTime.fromISO(this.assignment.end_date).toFormat('yyyy-LL-dd'); 
            }

            this.assignment_data.links = this.assignment.links || []; // set if assignment is CBT            
            this.assignment_data.send_notification = this.assignment.send_notification; // set if send_notification is CBT            

            this.assignment_data.questions = this.assignment.questions;
        },
        showError(message){
            this.$toast.success(message, {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        },
    },
    mounted() {
        this.get_teacher_details();
        // this.editedQuestions = this.assignment.questions;
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
    },
    watch: {
        'assignment_data.subject': function(subject) {
            console.log(subject);
            if (this.assignment == null) {
                this.assignment_data.classValues = []; // empty selected subclasses
                this.classes = []; // empty filtered classes
    
                this.staff_data.forEach(item => {
                    if (subject._id === item._id) {
                        item.classes.forEach(class_item => {
                            class_item.subclass.forEach(subclass => {
                                this.classes.push({
                                    class_id: class_item._id,
                                    class: class_item.desc,
                                    subclass: subclass.name,
                                    tag: `${class_item.desc.toUpperCase()} - ${subclass.name.toUpperCase()}`,
                                    placeholder: `${class_item.desc} - ${subclass.name.toUpperCase()}`,
                                    subclass_id: subclass._id
                                });                        
                            });                            
                            // console.log(class_item);
                        });
    
                    }
                });
                // console.log(this.classes);            
            }else{
                if (this.first_edit_has_occured === true) {
                    this.assignment_data.classValues = []; // empty selected subclasses  
                    this.classes = []; // empty filtered classes
                }

                this.staff_data.forEach(item => {
                    if (subject.subject.toLowerCase() === item.subject.toLowerCase()) {
                        item.classes.forEach(class_item => {
                            class_item.subclass.forEach(subclass => {
                                this.classes.push({
                                    class_id: class_item._id,
                                    class: class_item.desc,
                                    subclass: subclass.name,
                                    tag: `${class_item.desc.toUpperCase()} - ${subclass.name.toUpperCase()}`,
                                    placeholder: `${class_item.desc} - ${subclass.name.toUpperCase()}`,
                                    subclass_id: subclass._id
                                });                        
                            });
                            console.log(class_item);
                        });
                        console.log(this.classes);            
                        console.log(item);            
                    }
                });
                this.first_edit_has_occured = true;
            }
        }, 

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

.link_btn {
    border: 1px solid #17a2b8;
    padding: 4px 16px;
    border-radius: 6px;
}
</style>