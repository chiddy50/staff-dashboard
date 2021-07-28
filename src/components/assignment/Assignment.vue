<template>
    <div class="w-full py-2 mt-12 px-4">
        <div class="row px-3 pt-10 flex items-center justify-between">
            <h1 class="text-3xl m-0 flex items-center">
                <i class="bx bx-notepad mr-2"></i> <span>Assignment</span>
            </h1>
            <button v-if="viewAssignments" @click="viewAssignments = false" class="btn btn-info" style="font-size:13px;">Add Assignment</button>
            <button v-else @click="viewAssignments = true" class="btn btn-info" style="font-size:13px;">View Assignment</button>
        </div>
        <div class="row pr-3">
            <hr class="w-full" />
        </div>
        <div v-if="viewAssignments" class="row">
           <div class="col-12">
               <h4 class="texxt-center my-4">No Assignments yet</h4>
           </div>
        </div>
        <div v-else class="row">
            <div class="col-12">
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
                        <!-- <label class='small m-0'>Link 1:</label> -->
                        <input type="text" class="form-control" placeholder="Text" />
                        <input type="text" class="form-control" placeholder="URL" />
                        <i class="bx bx-trash cursor-pointer" @click="removeLink(link.id)" v-b-popover.hover.bottom="'Remove link'"></i>
                        
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
            </div>
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
            viewAssignments: false     
        }
    },
    methods :{
        addLink(){
            this.links.push({ title: '', url: '', id: Math.floor(Math.random() * 9999999999999) })
        },
        removeLink(id){
            this.links = this.links.filter(link => link.id !== id)
        },
        tagSubjects(newTag) {  
            // this.personnel_details.subjectIds.push(newTag.id)
        },
        untagSubject(){

        }
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