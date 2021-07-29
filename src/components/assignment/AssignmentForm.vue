<template>
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
    </div>
</template>

<script>
export default {
    name: 'assignmentForm',
    data(){
        return {
            send_notication: false,
            subjectValues: null,
            subjects: [
                {subject:'Math for SS1A',id:1},
                {subject:'Math for SSS3D',id:2},
            ],   
            links: [
                { title: '', url: '', id: Math.floor(Math.random() * 9999999999999) } 
            ],    
            viewAssignments: true,
            assignments: [
                
            ]     
        }
    },
    methods: {
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

        }
    }
}
</script>

<style>

</style>