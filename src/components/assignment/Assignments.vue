<template>
    <div>
        <div v-if="loading" class="flex justify-center my-5">
            <div style="width: 6rem; height: 6rem;" class="spinner-border text-dark"></div>        
        </div>
        <div v-else class="grid grid-cols-3 gap-6">
            <div class="col-span-1 bg-white rounded-sm p-4 shadow-sm" v-for="assignment in assignments" :key="assignment._id">
                
                <div class="flex justify-between relative">
                    <h5 class='text-lg font-bold m-0 text-capitalize'>{{ assignment.subject }}</h5>
                    <span @click="showDropdown" class="border dropdown_btn rounded flex justify-center px-2 cursor-pointer items-center">
                        <i class='bx bx-dots-horizontal-rounded dropdown_btninner text-gray-500 text-lg'></i>
                    </span>

                    <div class="dropdown_content shadow-md">
                        <div @click="updateAssignment(assignment._id)" class="flex items-center text-gray-400 dropdown_option">
                            <i class="bx bx-edit mr-1"></i>
                            <span class="text-xs">Edit</span>
                        </div>
                        <div v-b-modal="`delete_assignment_${assignment._id}`" class="flex items-center text-gray-400 dropdown_option">
                            <i class="bx bx-trash mr-1"></i>
                            <span class="text-xs">Delete</span>
                        </div>
                        <router-link :to="`/manage-progress/${assignment._id}`" class="flex items-center text-gray-400 dropdown_option">
                            <i class="bx bx-loader mr-1"></i>
                            <span class="text-xs">Progress</span>
                        </router-link>
                        <!-- manage-progress/:id -->
                        <div class="flex items-center text-gray-400 dropdown_option">
                            <i class="bx bx-pin mr-1"></i>
                            <span class="text-xs">Attachments</span>
                        </div>
                    </div>
                </div>                   
                
                <div class="mt-2">
                    <div class="flex flex-col">
                        <!-- <span class="text-gray-600 font-bold text-xs">TITLE:</span> -->
                        <span class="text-gray-400 text-xs text-capitalize">{{ assignment.title }}</span> 
                    </div>
                </div>

                <div class="mt-2">
                    <span class="text-gray-500 text-sm">Week {{ assignment.assignment_week }}</span>
                </div>

                <div class="mt-2">
                    <span class="text-gray-400 text-xs font-italic">Created: {{ formatDate(assignment.created_at) }}</span>
                </div>

                <div class="mt-1" v-if="assignment.is_cbt">
                    <span class="px-3 py-1 rounded-lg bg-purple-200" style="font-size:10px;">CBT</span>
                </div>

                <b-modal content-class="bg-grey-200 " :id="`delete_assignment_${assignment._id}`" hide-footer centered
                :title="`Delete ${assignment.subject} assignment`">
                    <p class="text-danger bg-gray-100 p-3 rounded text-xs text-center mb-3">
                        Please note by clicking delete the assignment will no longer exist in our database
                    </p>

                    <b-btn variant="danger" class="w-100" @click.prevent="deleteAssignment(assignment._id)">
                        <span v-if="delete_loading">
                        <b-spinner small></b-spinner> Please Wait...
                        </span>
                        <span v-else><i class="fal fa-trash"></i> Delete</span>
                    </b-btn>
                </b-modal>
                
            </div>
            
        </div>
    </div>
</template>

<script>
import Helper from "@/helpers/functions";
import moment from "moment";

export default {
    name: 'Assignments',
    data() {
        return {
            assignments: [],
            loading: false,
            delete_loading: false

        }
    },
    methods: {
        async getAssignments(){
            try {
                this.loading = true;
                let auth = Helper.auth();

                let { data, status } = await this.$axios.get( "school/get-assignment", auth );
                this.loading = false;
                if (status == 200) {
                    console.log(data);
                    this.assignments = data.message;
                    this.$emit('set-assignments', data.message);
                }
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        formatDate(date){
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        },
        showDropdown(e){
            if (e.target.classList.contains('bx')) {
                e.target.parentElement.nextElementSibling.classList.toggle('show_element');
            }else if (e.target.classList.contains('dropdown_btn')){
                e.target.nextElementSibling.classList.toggle('show_element');
            }
        },
        async deleteAssignment(assignment_id){
            try {
                this.delete_loading = true;
                let auth = Helper.auth();
                let { data, status } = await this.$axios.post(
                    'school/delete-assignment',
                    { assignment_id },
                    auth
                );
                this.delete_loading = false;
                if (status == 200) {
                    console.log(data);
                    this.assignments = data.message;
                    this.$emit('set-assignments', data.message);
                    this.$bvModal.hide(`delete_assignment_${assignment_id}`);
                }
            } catch (error) {
                this.delete_loading = false;
            }
        },
        updateAssignment(id){
            this.$emit('update-assignments', id);
        }
    },
    mounted(){       
        this.getAssignments();
        window.onclick = function(event) {
            if (!event.target.matches('.dropdown_btninner') && !event.target.matches('.dropdown_btn')) {
                let dropdowns = document.getElementsByClassName("dropdown_content");
                for (let i = 0; i < dropdowns.length; i++) {
                    if (dropdowns[i].classList.contains('show_element')) {
                        dropdowns[i].classList.remove('show_element');
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>