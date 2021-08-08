<template>
    <div class="w-full py-2 mt-12 px-4">
        <div class="row px-3 pt-10 mb-4 flex items-center justify-between">
            <h1 class="text-3xl m-0 flex items-center">
                <i class="bx bx-hourglass mr-2"></i> <span class="font-bold">Manage Progress</span>
            </h1>            
        </div>
        <hr>

        <!-- <div class="">
            <p class='m-0 text-sm flex'>
                <span style="flex:7%;" class='text-gray-400'>Subject</span>
                <span style="flex: 93%;">{{assignment.subject || 'Mathematics' }}</span>
            </p> 
        </div> -->
        <!-- <div class="">
            <p class='m-0 text-sm flex'>
                <span style="flex:7%;" class='text-gray-400'>Title</span>
                <span style="flex: 93%;">{{assignment.title}}</span>                
            </p>
        </div> -->
        <!-- <div class="">
            <p class='m-0 text-sm flex'>
                <span style="flex:7%;" class='text-gray-400'> Due date</span>
                <span style="flex: 93%;"> 28 July, 2021</span>
            </p> 
        </div> -->

        <div class="progress_header my-4">

            <div class="row items-center">
                <div class="col-12 col-lg-4">
                    <multiselect v-model="selected_class" 
                                :options="classes" :searchable="false" 
                                :close-on-select="false" :show-labels="false"
                                @select="showStudents"
                                placeholder="Choose class to view students">
                    </multiselect>
                </div>
                <div class="col-12 col-lg-4 search_input">
                   
                    <div class="position-relative rounded-lg" style='border: 1px solid #ddd;'>
                        <i class="bx bx-search position-absolute position" style="left: 0.7rem; top: 0.7rem;"></i>
                        <input type="search" v-model="value" class="form-control text-indent-1 border-0"
                            placeholder="Search for student" style="text-indent: 1.5rem;"/>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <multiselect v-model="status_filter" 
                                :options="statuses" :searchable="false" 
                                :close-on-select="false" :show-labels="false"
                                placeholder="Choose Status">
                    </multiselect>
                </div>
            </div>
        </div>

        <div class="my-4" v-if="visibleStudents">
            <div class="grid grid-cols-2 mb-4">
                <h4 class='text-gray-500 flex items-center m-0'>SSS3A - Students</h4>

                <div class="status_box">
                    <!-- <div class="pending_status">Pending</div> -->
                    <div class="notdone_status">
                        <span class='text-xs'>Not Done</span>
                        <span class='text-2xl font-bold'>25</span>
                    </div>
                    <div class="done_status">
                        <span class='text-xs'>Done</span>
                        <span class='text-2xl font-bold'>6</span>
                    </div>
                </div>
            </div>

            <div class="students_list">
                <div v-for="i in 30" :key="i" class='student_item bg-white p-3 shadow-sm rounded'>
                    <div class="flex w-full">
                        <b-avatar
                        src="https://guardian.ng/wp-content/uploads/2018/07/unnamed-2-4.jpg"
                        class="mr-3"
                        ></b-avatar>
                        <div class="flex" style="flex-direction:column;">
                            <p class="m-0" style="font-size:13px;display:flex;flex-direction:column">                                 
                                <span>Samuel</span>
                                <span>Chukwuemekaeze</span>
                            </p>
                            <p class="m-0 text-gray-400" style="font-size:12px;">Status: Pending</p>
                        </div>
                    </div>
                    <div class="status_options">
                       <!-- <span class="pending">Pending</span> -->
                       <span class="done">Done</span>
                       <span class="not_done">Not Done</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'manageProgress',
    data() {
        return {
            assignment: {
                subject: null,
                title: null
            },
            value: null,
            options: [],
            selected_class: null,
            classes: ['SSS3A', 'SSS3B', 'SSS3C'],
            visibleStudents: false,
            status_filter: null,
            statuses: ['Pending', 'Done', 'Not Done']
        }
    },
    computed: mapState({
        storedAssignments: state => state.assignments,
    }),
    methods: {
        showStudents(){
            this.visibleStudents = true
        }
    },
    mounted(){
        this.assignment = this.storedAssignments.find(item => item._id == this.$route.params.id)
        console.log(this.$route.params.id);
        console.log(this.assignment);
    }
}
</script>

<style>
.student_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-direction: column;
}

.status_options {
    display: flex;
    /* flex-direction: column; */
    gap: 7px;
    /* justify-content: space-between; */
    width: 100%;
}

.status_options > span {
    padding: 2px 13px;
    font-size:12px;
    /* border: 1px solid teal; */
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    transition: all .2s;
    flex: 1;
}
.status_options > span:hover {
    color: #fff;
}
.pending {
    border: 2px solid#6c757d;
    color: #6c757d;
}

.pending:hover {
    background: #6c757d;
    color: #fff;
}

.done {
    border: 2px solid#28a745;
    color: #28a745;
}

.done:hover {
    background: #28a745;
    color: #fff;
}

.not_done {
    border: 2px solid#dc3545;
    color: #dc3545;
}

.not_done:hover {
    background: #dc3545;
    color: #fff;
}

.students_list {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
}

.progress_header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.outline-btn {
    font-size: 11px;
    padding: 3px 10px;
    border: 1px solid teal;
    border-radius: 5px;
}

.assignment_title{
    display: flex;
    gap: 1rem;
}

.status_box {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.status_box > div{
    font-size: 14px;
    padding: 3px 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

/* .pending_status {
    grid-column-start: 1;
    grid-column-end: 3;
    background: #0000ff2e;
    color: #0000ff73;
    border: 1px solid #0000ff73;
} */

.notdone_status {
    /* grid-column-start: 1;
    grid-column-end: 4; */
    background: #f3c6c6;
    color: #f33838;
    border: 1px solid #f33838;
}

.done_status {
    /* grid-column-start: 4;
    grid-column-end: 7; */
    background: #00800036;
    color: #008000ab;
    border: 1px solid #008000ab;
}

@media screen and (max-width: 90.625em) { /** 1450px */
    .students_list {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media screen and (max-width: 70.625em) { /** 1130px */
    .students_list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media screen and (max-width: 61.875em) { /** 990px */
    .search_input{
        margin: 1rem 0 1rem;
    }

    .assignment_title{
        flex-direction: column;
        gap: 0rem;
    }
}

@media screen and (max-width: 50.75em) { /** 812px */
    .students_list {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

@media screen and (max-width: 22.875em) { /** 366px */
    .status_options {
        flex-direction: column;
    }
}


</style>