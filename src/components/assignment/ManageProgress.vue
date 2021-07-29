<template>
    <div class="w-full py-2 mt-12 px-4">
        <div class="row px-3 pt-10 flex items-center justify-between">
            <h1 class="text-3xl m-0 flex items-center">
                <i class="bx bx-loader-circle mr-2"></i> <span>Manage Progress</span>
            </h1>            
        </div>

        <div class="row my-4">
            <div class="flex gap-4 items-center p-3 bg-white" style='border: 1px solid #ddd; border-radius:7px'>
                <p class='m-0 text-gray-400 text-uppercase'>{{assignment.subject}}</p> - 
                <p class='m-0 small'>{{assignment.title}}</p>
            </div>
        </div>
        <div class=" my-4">
            <h3 class='mb-4'>Students</h3>
            <div class="students_list">
                <div class="card" v-for="(i) in 6" :key="i">
                    <div class="flex items-center pt-2 justify-center">
                        <i class='bx bxs-user-circle' style="font-size: 5rem;"></i>
                    </div>
                    <div class="card-body">
                    <h5 class="card-title flex text-center small flex-col">
                        <span>John</span>
                        <span>Chukwuemekaeze</span>
                    </h5>
                    <div class="card-title flex text-center flex-col">
                       <span class="assignment_status">Pending</span>
                    </div>
                    <div class="btn-group w-full">
                        <button type="button" class="btn btn-info btn-sm small_text dropdown-toggle" data-toggle="dropdown">
                        Action
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item small" href="#">Pending</a>
                            <a class="dropdown-item small" href="#">Done</a>
                            <a class="dropdown-item small" href="#">Not Done</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="students_list2 mt-5">
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
            assignment: null
        }
    },
    computed: mapState({
        storedAssignments: state => state.assignments,
    }),
    mounted(){
        this.assignment = this.storedAssignments.find(item => item._id == this.$route.params.id)
        console.log(this.$route.params.id);
        console.log(this.assignment);
    }
}
</script>

<style>
.students_list {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1rem;
}

.assignment_status {
    font-size: 10px;
    padding: 2px;
    border: 1px solid teal;
    border-radius: 4px;
}

.small_text {
    font-size: 12px;
}

.medium_text {
    font-size: 15px;
}

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

.students_list2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}
</style>