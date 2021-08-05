<template>
    <div class="w-full py-2 mt-12 px-4">
        <div class="row px-3 pt-10 flex items-center justify-between">
            <h1 class="text-3xl m-0 flex items-center">
                <i class="bx bx-notepad mr-2"></i> <span>{{updatePlaceholder}} Assignment</span>
            </h1>
            <button v-if="assignmentView == 'assignments'" @click="assignmentView = 'add_assignment'" class="btn btn-info" style="font-size:13px;">Add Assignment</button>
            <button v-if="assignmentView == 'add_assignment'" @click="assignmentView = 'assignments'" class="btn btn-info" style="font-size:13px;">View Assignments</button>
        </div>
        <div class="row pr-3">
            <hr class="w-full" />
        </div>
        <div v-if="assignmentView == 'assignments'">
            <div v-if="storedAssignments.length > 0">
                <div v-for="(item, i) in storedAssignments" :key="i">
                
                    <div class="display-data bg-white pr-4">
                        <b-row class="px-2">
                            <b-col>
                                <span class="text-uppercase">{{ item.title }}</span><br />
                                <!-- <span class="text-gray-500 text-xs">{{ item.subject }}</span> -->
                            </b-col>
                            
                            <b-col cols="2" md="1" class="flex items-center justify-center">
                                <b-button-group>
                                    <b-dropdown right split text="Action" size="sm">
                                        <!-- <b-dropdown-item :to="`/viewsubclass/${i}`"> -->
                                        <b-dropdown-item @click="updateAssignment(item._id)">
                                            <i class="bx bx-edit mr-2"></i> Update
                                        </b-dropdown-item>
                                        <b-dropdown-item :to="`/manage-progress/${item._id}`">
                                            <i class="bx bx-loader-circle mr-2"></i> Manage Progress
                                        </b-dropdown-item>
                                        <b-dropdown-item v-b-modal="`delete${i}`">
                                            <i class="bx bx-trash mr-2"></i>Remove
                                        </b-dropdown-item>                                            
                                        <b-dropdown-item >
                                            <i class="bx bx-pin mr-2"></i>Manage Attachments
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </b-button-group>
                            </b-col>
                        </b-row>
                    </div>
                    
                </div>
            </div>

            <div v-else class="col-12">
                <h4 class="text-center my-4">No Assignments yet</h4>
            </div>
        </div>
        <div v-if="assignmentView == 'add_assignment'" class="row">
            <!-- <div class="col-12">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <div>										
                                <multiselect v-model="subjectValues" tag-placeholder="Search & add Subjects" 
                                    placeholder="Choose Subjects and Class" label="subject" class="mb-3"
                                    track-by="id" :options="subjects" :multiple="true" :taggable="true" @select="tagSubjects" @remove="untagSubject">
                                </multiselect>										
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">                    
                            <input type="text" class="form-control"  placeholder="Title" />
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <textarea class='form-control' rows="3" placeholder="Description"></textarea>
                </div>               
                
                <div class='mb-4'>
                    <div class="flex items-center gap-1 mb-2">
                        <label @click="addLink" class="flex items-center m-0 cursor-pointer text-info small">Add links</label>                       
                        <i @click="addLink" class="bx bx-link cursor-pointer" v-b-popover.hover.bottom="'Add link'"></i>                        
                    </div>

                    <div class="assignment_links mb-2" v-for="(link, index) in links" :key="index">
                        <input type="text" class="form-control" placeholder="Text" />
                        <input type="text" class="form-control" placeholder="URL" />
                        <i v-if="links.length > 1" class="bx bx-trash cursor-pointer" @click="removeLink(link.id)" v-b-popover.hover.bottom="'Remove link'"></i>
                        
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <div class="">
                                <label class='small m-1'>Type:</label>
                                <select class="form-control">
                                    <option value="">Select Option</option>
                                    <option value="">Essay</option>
                                    <option value="">Project</option>
                                    <option value="">Review</option>
                                    <option value="">Written</option>
                                </select>                        
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <div class="">
                                <label class='small m-1'>Due Date:</label>
                                <input type="date" class="form-control" />                      
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <div class="">
                                <label class='small m-1'>Mark Item:</label>
                                <select class="form-control">
                                    <option value="">None</option>
                                    <option value="">Quiz</option>
                                    <option value="">Presentation</option>
                                    <option value="">Homework</option>
                                    <option value="">Project</option>
                                    <option value="">Exam</option>                                    
                                </select>                        
                            </div>
                        </div>
                    </div>
                     <div class="col-6 flex items-center">
                        <b-form-checkbox class="warning" v-model="send_notication" name="check-button" switch>
                            <span class="text-xs">Send Notification</span>
                        </b-form-checkbox>
                    </div>
                </div>

                <div class="row mb-4">                    
                     <div class="col-6 flex items-center">
                        <button class="btn btn-outline-info flex items-center gap-2">Add Attachments
                            <i class="bx bx-pin"></i>
                        </button>                     
                    </div>
                </div>
                         
                <div class="mt-4">
                    <button class="btn btn-success flex items-center mr-3">                    
                    Create <i class="bx bx-check-circle text-white"></i>
                    </button>
                    <button class="btn btn-secondary flex items-center">
                    Cancel <i class="bx bx-x-circle text-white"></i>
                    </button>
                </div>
            </div> -->

            <assignmentForm></assignmentForm>
        </div>
        <div v-if="assignmentView == 'update_assignment'" class="row">
            <div class="col-12">
                <button @click="assignmentView = 'assignments'" class="btn btn-info mb-4" style="font-size:13px;">Back to Assignment</button>
            </div>

            <assignmentForm 
                :assignment="assignment"
                :returnText="'Back to Assignments'">
            </assignmentForm>
            
        </div>

        <b-modal id="addAssignment"
          content-class="bg-gray-100"
          size="md"
          centered
          hide-footer
          title="Add Assignment"
        >
          <div class="row">
            <div class="col-12">
                <!-- <div class="row"> -->
                <div class="form-group">
                    <select class="form-control">
                        <option value="">Choose Class</option>
                        <option value="">SSS1C</option>
                        <option value="">SSS2B</option>
                    </select>
                </div>
                <div class="form-group">                    
                    <input type="text" class="form-control"  placeholder="Title" />
                </div>
                <div class="form-group">
                    <textarea class='form-control' rows="5" placeholder="Description"></textarea>
                </div>
                <div>
                    <div class="">
                        <label class='small'>Links</label>
                        <input type="text" class="form-control mb-2" placeholder="Text" />
                        <input type="text" class="form-control"  placeholder="URL" />

                    </div>
                </div>
                <!-- </div> -->
                <hr />

                <div class="col my-4">
                    <button class="btn btn-secondary btn-block">
                    Create
                    </button>
                </div>
            </div>
          </div>
        </b-modal>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'assignment',
    data(){
        return {
            send_notication: false,
            subjectValues: [],
            subjects: [
                {subject:'Math for SS1A',id:1},
                {subject:'Math for SSS3D',id:2},
            ],   
            links: [
                { title: '', url: '', id: Math.floor(Math.random() * 9999999999999) } 
            ],    
            viewAssignments: true,
            assignmentView: 'assignments',
            assignments: [],     
            assignment: null,     
        }
    },
    computed: mapState({
        // arrow functions can make the code very succinct!
        storedAssignments: state => state.assignments,

        // // passing the string value 'count' is same as `state => state.count`
        // countAlias: 'count',

        // to access local state with `this`, a normal function must be used
        updatePlaceholder () {
            return this.assignmentView == 'update_assignment' ? 'Update' : ''        
        }
    }),
    methods :{
        addLink(){
            this.links.push({ title: '', url: '', id: Math.floor(Math.random() * 9999999999999) })
        },
        removeLink(id){
            if(this.links.length !== 1){
                this.links = this.links.filter(link => link.id !== id)
            }
        },
        tagSubjects(newTag) {  
            // this.personnel_details.subjectIds.push(newTag.id)
        },
        untagSubject(){

        },
        updateAssignment(id){
            this.assignment = this.storedAssignments.find(item => item._id === id);
            console.log(this.assignment);
            this.assignmentView = 'update_assignment'
        }
    },
    watch: {
        
    }
}
</script>

<style>

.assignment_links {
    display: flex;
    gap: 1rem;
    align-items: center;
}
</style>