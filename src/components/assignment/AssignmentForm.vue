<template>
    <div class="col-12">        

        <div class="row">
            <div class="col-12 col-lg-4">
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
            <div class="col-12 col-lg-4">
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
            <div class="col-12 col-lg-4">
                <div class="form-group">
                    <div>										
                        <multiselect v-model="assignment_data.type" tag-placeholder="Search & add Subjects" 
                            placeholder="Choose Type" class="mb-3"
                            :hideSelected="false"
                            @select="toggleType"
                            :options="assignment_types">
                        </multiselect>										
                    </div>
                </div>               
            </div>
        </div>
        
        <div v-if="assignment_data.type" class="w-full">
            <hr/>
        </div>

        <div class="row">
            <div class="col-12 col-lg-12">                
                <objective v-if="assignmentTypeView === 'Objective'"></objective>
                <subjective v-if="assignmentTypeView === 'Subjective'"></subjective>

            </div>
        </div>

        <div v-if="assignment_data.type" class="w-full">
            <hr/>
        </div>

        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="form-group">
                    <textarea class='form-control' v-model="assignment_data.description" rows="3" placeholder="Add description here..."></textarea>
                </div>               
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="form-group">            
                    <label class='small m-1'>Title:</label>
                    <input v-model="assignment_data.title" type="text" class="form-control"  placeholder="Assignment title" />
                </div>
            </div>
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
        </div>
        
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class='mb-4'>
                    <div class="flex items-center gap-1 mb-2">
                        <label @click="addLink" class="flex items-center m-0 cursor-pointer text-info text-sm">Click to add links</label>                       
                        <i @click="addLink" class="bx bx-link cursor-pointer" v-b-popover.hover.bottom="'Add link'"></i>                        
                    </div>

                    <div class="assignment_links mb-2" v-for="(link, index) in assignment_data.links" :key="index">
                        <input type="text" v-model="link.text" class="form-control" placeholder="Text" />
                        <input type="text" v-model="link.link" class="form-control" placeholder="URL" />
                        <i v-if="assignment_data.links.length > 1" class="bx bx-trash text-xl cursor-pointer" @click="removeLink(link._id)" v-b-popover.hover.bottom="'Remove link'"></i>
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
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
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <div class="">
                        <label class='small m-1'>Due Date:</label>
                        <input type="date" v-model="assignment_data.due_date" class="form-control" />                      
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-2">                    
            <div class="col-lg-6 col-12 flex items-center">
                <button class="btn btn-outline-info flex items-center gap-2">Add Attachments
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
                    
        <div class="mt-3">
            <button class="btn btn-success flex items-center mr-3">                    
            <i class="bx bx-check-circle text-white"></i> {{ assignment == null ? 'Create' : 'Update' }}
            </button>
            <button class="btn btn-secondary flex items-center">
            <i class="bx bx-x-circle text-white"></i> {{ returnText }} 
            </button>
        </div>
    </div>
</template>

<script>
import Objective from './Objective.vue'
import Subjective from './Subjective.vue'

export default {
    name: 'assignmentForm',
    components: {
        Objective,
        Subjective
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
            assignmentTypeView: '',
            assignment_data: {
                description: '',
                due_date: null,
                type: '',
                title: '',
                subjectValues: null,
                classValues: null,
                send_notification: false,
                links: [
                    { title: '', url: '', _id: Math.floor(Math.random() * 9999999999999) } 
                ]
            }   
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
        toggleType(value){
            this.assignmentTypeView = value;
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

</style>