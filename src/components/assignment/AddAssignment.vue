<template>
    <div>
        <div class="row">
            <div class="col-12 col-lg-4">
                <div class="form-group">
                    <div>										
                        <multiselect v-model="assignment_data.subjectValues" tag-placeholder="Search & add Subject" 
                            placeholder="Choose Subject" label="subject" class="mb-3"
                            :custom-label="subjectLabel"
                            :hideSelected="false"
                            track-by="_id" :options="subjects">
                        </multiselect>										
                    </div>
                </div>               
            </div>
            <!-- <div class="col-12 col-lg-4">
                <div class="form-group">
                    <div>										
                        <multiselect v-model="assignment_data.classValues" tag-placeholder="Search & add Classes" 
                            placeholder="Choose Class" label="class" class="mb-3"
                            :custom-label="classesLabel"
                            :hideSelected="true"
                            track-by="_id" :options="classes" :multiple="true" :taggable="true" @select="tagClasses" @remove="untagClasses">
                        </multiselect>										
                    </div>
                </div>               
            </div> -->
        </div>


    </div>
</template>

<script>
export default {
    name: 'addAssignment',
    data(){
        return {
            assignment_data: {
                subjectValues: '', 
                classValues: [],
            },
            classes: [
                {
                    _id: 1,
                    class_name: 'SSS1',
                    subclass: 'B'
                },
                { 
                    _id: 2,
                    class_name: 'SSS1',
                    subclass: 'C'
                },
                { 
                    _id: 3,
                    class_name: 'SSS2',
                    subclass: 'C'
                }
            ],  
            subjects: [ 
                { _id:1, subject: 'Mathematics' }, 
                { _id:2, subject: 'Further Mathematics' }
            ]                             
        }
    },
    methods: {
        tagSubjects(newTag) {  
            // this.personnel_details.subjectIds.push(newTag.id)
        },
        untagSubject(){

        },
        tagClasses(newTag) {  
            // this.personnel_details.subjectIds.push(newTag.id)
        },
        untagClasses(){
        
        }
    },
    computed: {
        classesLabel ({ class_name, subclass }) {
            return `${class_name} ${subclass}`
        },
        subjectLabel({ subject }) {
            return `${subject}`
        }
    }
}
</script>

<style>

</style>