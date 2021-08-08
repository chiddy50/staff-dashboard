<template>
    <div class="col-12">        

        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="form-group">
                    <div>										
                        <multiselect v-model="editAssignment.subjectValues" tag-placeholder="Search & add Subjects" 
                            placeholder="Choose Subjects and Class" label="subject" class="mb-3"
                            :custom-label="classesLabel"
                            :hideSelected="true"
                            track-by="_id" :options="subjects" :multiple="true" :taggable="true" @select="tagSubjects" @remove="untagSubject">
                        </multiselect>										
                    </div>
                </div>               
            </div>
        </div>
        
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="form-group">
                    <textarea class='form-control' v-model="editAssignment.description" rows="3" placeholder="Description"></textarea>
                </div>               
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="form-group">            
                    <label class='small m-1'>Title:</label>
                    <input v-model="editAssignment.title" type="text" class="form-control"  placeholder="Title" />
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label class='small m-1'>Mark Item:</label>
                    <select v-model="editAssignment.marked" class="form-control">
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
                        <label @click="addLink" class="flex items-center m-0 cursor-pointer text-info small">Add links</label>                       
                        <i @click="addLink" class="bx bx-link cursor-pointer" v-b-popover.hover.bottom="'Add link'"></i>                        
                    </div>

                    <div class="assignment_links mb-2" v-for="(link, index) in editAssignment.links" :key="index">
                        <!-- <label class='small m-0'>Link 1:</label> -->
                        <input type="text" v-model="link.text" class="form-control" placeholder="Text" />
                        <input type="text" v-model="link.link" class="form-control" placeholder="URL" />
                        <!-- <i v-if="editAssignment.links.length > 1" class="bx bx-trash cursor-pointer" @click="removeLink(link._id)" v-b-popover.hover.bottom="'Remove link'"></i> -->
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <div class="">
                        <label class='small m-1'>Type:</label>
                        <select v-model="editAssignment.type" class="form-control">
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
                        <input type="date" v-model="editAssignment.due_date" class="form-control" />                      
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
               <b-form-checkbox class="warning" v-model="editAssignment.send_notification" name="check-button" switch>
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
export default {
    name: 'assignmentForm',
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
            subjects: [
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
            viewAssignments: true,
            editAssignment: {
                description: '',
                due_date: null,
                title: '',
                subjectValues: null,
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
                this.editAssignment.links.push({ title: '', url: '', _id: Math.floor(Math.random() * 9999999999999) })
            }else{
                this.links.push({ title: '', url: '', _id: Math.floor(Math.random() * 9999999999999) })
            }
        },
        removeLink(id){
            if (this.assignment !== null) {
                // this.$store.commit('REMOVE_ASSIGNMENT', id)
                this.editAssignment.links = this.editAssignment.links.filter(link => link._id !== id)

            }else{
                if(this.links.length !== 1){
                    this.links = this.links.filter(link => link._id !== id)
                }
            }
        },
        tagSubjects(newTag) {  
            // this.personnel_details.subjectIds.push(newTag.id)
        },
        untagSubject(){

        },
        classesLabel ({ subject, class_name, subclass }) {
            return `${subject} for ${class_name} ${subclass}`
        },
    },
    mounted() {
        if (this.assignment !== null) {
            this.editAssignment.description = this.assignment.description;
            this.editAssignment.title = this.assignment.title;
            this.editAssignment.marked = this.assignment.marked;
            this.editAssignment.type = this.assignment.type;
            this.editAssignment.send_notification = this.assignment.send_notification;
            this.editAssignment.subjectValues = this.assignment.classes;
            this.editAssignment.links = this.assignment.links;
        
            // split date to format 
            let due_date = this.assignment.due_date.split('/');
            this.editAssignment.due_date = `${due_date[2]}-${due_date[0]}-${due_date[1]}`;
            
        }
    },
    watch: {
       
    }
}
</script>

<style>

</style>