<template>
  <div class="w-full pl-2 mt-12">
    <div class="row px-3 pt-10 flex items-center justify-between">
      <div class="flex items-center">
        <h1 class="text-3xl m-0 flex items-center">
           <span class='text-capitalize'>{{ $route.params.desc }} - {{ $route.params.subclass }}</span>
        </h1>
      </div>
    </div>

    <div v-if="getstudent_loading" class="flex items-center flex-col justify-center py-5">
      <div style="width: 5rem; height: 5rem;" class="spinner-border text-dark"></div>   
    </div>
    <div v-else class="my-4">
        <div class="flex items-center justify-center mt-5 flex-col" v-if="!students.length">
            <img src="../../assets/img/noitem.png" width="18%" alt="no student found" />
            <h5>No students</h5>
        </div>
        <div v-else>
            <div v-for="student in students" :key="student._id" class="displaystyle bg-white">
                <b-row class='pr-4'>											
                    <b-col>
                        <span class="text-capitalize">
                            {{ student.first_name }} {{ student.middle_name }} {{ student.last_name }}
                        </span>
                        <br><span class="text-xs text-capitalize text-gray-500">{{ student.gender }}</span>
                    </b-col>

                    <b-col cols="2" md="1" class="flex items-center justify-center">
                        <b-button-group>
                            <b-dropdown right split text="Action" size="sm">
                                <b-dropdown-item
                                    :to="`/viewsubclass/${234}/${234}`">
                                    <i class='bx bx-expand mr-2' ></i> View
                                </b-dropdown-item>
                                <b-dropdown-item v-b-modal="`delete${234}`"><i
                                        class="bx bx-trash mr-2"></i>
                                    Delete
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-button-group>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import Helper from "@/helpers/functions.js";

export default {
    name: "subclass_students",
    data() {
        return {
            students: [],
            getstudent_loading: []
        }
    },
    mounted() {
        this.getStudents()
    },
    methods: {
        async getStudents(){
            // console.log(class_name);
            try {
                this.getstudent_loading = true;
                let auth = Helper.auth();
                const request = {
                    class_name: this.$route.params.class,
                    subclass_name: this.$route.params.subclass,
                } 
                let { data, status } = await this.$axios.post("school/get-tutor-students", request,auth);

                if (status == 200) {
                    this.students = data.data;
                    console.log(data)
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.getstudent_loading = false;
            }
        },
    }
};
</script>

<style>
.displaystyle {
    background: #fafafa;
    border-left-width: 4px;
    padding-left: 1.2rem;
    padding-right: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    margin-bottom: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    border-color: orange;
}
</style>