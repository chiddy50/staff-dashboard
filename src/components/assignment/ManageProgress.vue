<template>
    <div class="w-full py-2 mt-12 px-4">
        <div class="row px-3 pt-10 flex items-center justify-between">
            <h1 class="text-3xl m-0 flex items-center">
                <i class="bx bx-loader-circle mr-2"></i> <span>Manage Progress</span>
            </h1>            
        </div>

        <div class="progress_header my-4">
            <div class="flex gap-4 items-center">
                <p class='m-0 text-gray-400 text-uppercase'>{{assignment.subject}}</p> - 
                <p class='m-0 small'>{{assignment.title}}</p>
            </div>
            <div class="flex gap-4 items-center">
                <p class='m-0 text-gray-400'>Due on 28 July, 2021</p> 
                <!-- <p class='m-0 small'>28 July, 2021</p> -->
            </div>
            <div class="row items-center">
                <div class="col-12 col-lg-5">
                    <multiselect v-model="selected_class" 
                                :options="classes" :searchable="false" 
                                :close-on-select="false" :show-labels="false"
                                @select="showStudents"
                                placeholder="Choose class to view students">
                    </multiselect>
                </div>
                <div class="col-12 col-lg-5">
                    <!-- <multiselect v-model="value" 
                                :options="options" :searchable="true" 
                                :close-on-select="false" :show-labels="false"
                                @select="showStudents"
                                placeholder="Search for student">
                    </multiselect> -->
                    <div class="position-relative rounded-lg" style='border: 1px solid #ddd;'>
                        <i class="bx bx-search position-absolute position" style="left: 0.7rem; top: 0.7rem;"></i>
                        <input type="search" v-model="value" class="form-control text-indent-1 border-0"
                            placeholder="Search for student" style="text-indent: 1.5rem;"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-4" v-if="visibleStudents">
            <h4 class='text-gray-400 mt-10'>SSS3A - Students</h4>

            <div class="students_list">
                <div v-for="i in 30" :key="i" class='student_item bg-white p-3 shadow-sm rounded'>
                    <div class="flex">
                        <b-avatar
                        src="https://guardian.ng/wp-content/uploads/2018/07/unnamed-2-4.jpg"
                        class="mr-3"
                        ></b-avatar>
                        <div class="flex" style="flex-direction:column;">
                            <p class="m-0" style="font-size:14px;">John Chukwuemekaeze</p>
                            <p class="m-0 text-gray-400" style="font-size:12px;">Status: Pending</p>
                        </div>
                    </div>
                    <div class="status_options">
                       <span class="bg-secondary text-light">Pending</span>
                       <span class="bg-success text-light">Done</span>
                       <span class="bg-danger text-light">Not Done</span>
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
            assignment: null,
            value: null,
            options: [],
            selected_class: null,
            classes: ['SSS3A', 'SSS3B', 'SSS3C'],
            visibleStudents: false
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
}

.status_options {
    display: flex;
    /* flex-direction: column; */
    gap: 5px;
}

.status_options > span {
    padding: 2px 13px;
    font-size:12px;
    /* border: 1px solid teal; */
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
}

.students_list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

</style>