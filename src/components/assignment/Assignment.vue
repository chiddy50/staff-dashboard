<template>
    <div class="w-full py-2 mt-12 px-4">
        <div class="row px-3 pt-10 flex items-center justify-between">
            <h1 class="text-3xl m-0 flex items-center">
                <i class="bx bx-notepad mr-2"></i> <span class="font-bold">{{ titlePlaceholder }}</span>
            </h1>
            <button v-if="assignmentView == 'assignments'" @click="assignmentView = 'add_assignment'" class="btn btn-info" style="font-size:13px;">Add Assignment</button>
            <button v-if="assignmentView == 'add_assignment'" @click="assignmentView = 'assignments'" class="btn btn-info" style="font-size:13px;">View Assignments</button>
            <button v-if="assignmentView == 'update_assignment'" @click="assignmentView = 'assignments'" class="btn btn-info" style="font-size:13px;">View Assignments</button>
        </div>
        <div class="row pr-3">
            <hr class="w-full" />
        </div>
        <div v-if="assignmentView == 'assignments'">
            <!-- <div v-if="storedAssignments.length > 0">
             
                <div v-for="(item, i) in storedAssignments" :key="i" class="assignment_item bg-white p-4 rounded-md text-sm">
                    <div class="flex justify-between item-center">
                        <p><span> Due Date: 28th July, 2021</span></p>
                        <p>
                            <span class="rounded-md bg-red-100 text-red-600 p-1 text-xs">
                                Not Done
                            </span>
                        </p>
                    </div>
                    <div class="assignment_header">
                        <p class="flex items-center">Memorize the quadratic equation</p>
                    </div>
                    <div class="assignment_desc">
                        <span class="text-gray-400 flex items-center">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
                        dignissimos quisquam odit aliquam.
                        </span>
                    </div>
                    <hr class="w-100" />
                    <div class="assignment_body mt-2">
                        <div class="assignment_stats">Mathematics * Homework * Project</div>
                            <div class='flex justify-end'>
                                <b-button-group class='btn-sm'>
                                    <b-dropdown right split text="Action" size="sm">
                                        <b-dropdown-item>
                                            <i class="bx bx-book mr-2"></i> Classes
                                        </b-dropdown-item>
                                        <b-dropdown-item @click="updateAssignment(item._id)">
                                            <i class="bx bx-edit mr-2"></i> Update
                                        </b-dropdown-item>
                                        <b-dropdown-item :to="`/manage-progress/${item._id}`">
                                            <i class="bx bx-hourglass mr-2"></i> Manage Progress
                                        </b-dropdown-item>
                                        <b-dropdown-item v-b-modal="`delete${i}`">
                                            <i class="bx bx-trash mr-2"></i>Remove
                                        </b-dropdown-item>                                            
                                        <b-dropdown-item >
                                            <i class="bx bx-pin mr-2"></i>Manage Attachments
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </b-button-group>
                            </div>
                        </div>                    
                    </div>
                </div>

                <div v-else class="col-12">
                    <h4 class="text-center my-4">No Assignments yet</h4>
                </div>             -->


            <assignments @set-assignments="setAssignments"
                        @update-assignments="updateAssignment"
            ></assignments>
        </div>
        <div v-if="assignmentView == 'add_assignment'" class="row">
            <assignmentForm @set-assignments="setAssignments"></assignmentForm>
        </div>
        <div v-if="assignmentView == 'update_assignment'" class="row">
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
// import Helper from "@/helpers/functions";
// import moment from "moment";
import Assignments from './Assignments.vue'

export default {
    name: 'assignment',
    components: {
       Assignments
    },
    data(){
        return {
            send_notication: false,
            subjectValues: [],
            subjects: [],   
            links: [],    
            viewAssignments: true,
            assignmentView: 'assignments',
            assignments: [],     
            assignment: null,     
            myHTML: '',
            loading: false,
            // deleteprogress: false
        }
    },
    computed: mapState({
        // arrow functions can make the code very succinct!
        storedAssignments: state => state.assignments,

        // // passing the string value 'count' is same as `state => state.count`
        // countAlias: 'count',

        // to access local state with `this`, a normal function must be used
         titlePlaceholder  () {
            if (this.assignmentView === 'update_assignment') {
                return 'Update Assignment';
            }else if (this.assignmentView === 'add_assignment'){
                return 'Add Assignment';
            }else{
                return 'Assignments';
            }
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
            this.assignment = this.assignments.find(item => item._id === id);
            // console.log(this.assignment);
            this.assignmentView = 'update_assignment'
        },
        
        setAssignments(payload){
            this.assignments = payload;

            this.assignments = this.assignments.map((assignment, index) => {
                assignment.questions.map(question => {
                    question._id = question._id
                    question.isObjective = question.is_objective
                    question.question = question.question
                    

                    question.options = question.options.map((option, idx) => {
                        return {
                            _id: Math.ceil(Math.random() * 99999999999999999999945439593499349),
                            edit: false,
                            placeholder: `Option ${idx + 1}`,
                            value: option
                        }
                    });

                    question.options.forEach((option, correct_index) => {
                        if (option.value === question.correct_answer) {                            
                            question.correct_answer = option;
                        }
                    })

                });

                return assignment;
            }); 
        },
        
        
    },

}
</script>

<style>

.assignment_links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.assignment_header {
    display: flex;
    justify-content: space-between;
}

.assignment_header p {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
}

.assignment_header span {
    font-size: 11px;
    background: #ddd;
    color: tomato;
    padding: 3px 11px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.assignment_body {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.assignment_body p{
    display: flex;
    flex-direction: column;

    font-size: 12px;
    margin: 0;
}

.assignment_body p span:nth-child(1){
    font-weight: 600;
}

.assignment_body p span:nth-child(2){
    color: #444;
    font-weight: 600;
}

.view_classes span {
    font-size: 12px;
    color: rgb(64, 99, 214);
    font-weight: bold;
}

.text_gray{
    color: #c8c8c8;
}

.assignment_stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.assignment_desc{ 
    margin: 5px 0 0;
}   

.assignment_desc span {
    font-size: 13px;
}

.show_element {
    display: block !important;
}

.dropdown_content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 30%;
  overflow: auto;
  z-index: 1;
  right: 0;
}

.dropdown_option {
    padding: 10px;
    transition: all .4s;
    cursor: pointer;
}

.dropdown_option:hover {
    background-color: #eee;
}

.dropdown_option:not(:last-child) {
    /* border-bottom: 1px solid #ddd; */
    padding-bottom: 10px;
    /* margin-bottom: 8px; */
}
</style>