<template>
    <div class="w-full py-2 mt-12 px-4">
        <div class="row pt-10 flex items-center justify-between">
            <h1 class="text-3xl m-0 flex items-center">
                <i class="bx bx-message-rounded-detail mr-2"></i> <span class="font-bold">Communication</span>
            </h1>          


            <div>
                <button v-if="view === 'message_list'" @click="view = 'new_message'" class="btn btn-sm btn-secondary">
                    <i class="bx bx-mail-send"></i>
                    Send Message
                </button>
                <button v-if="view === 'new_message'" @click="view = 'message_list'" class="btn btn-sm btn-secondary">
                    <i class="bx bx-message-square-detail"></i>
                    View Messages
                </button>
            </div>  
        </div>

        <div class="w-full">
            <hr>
        </div>

        <div class="">
            <div v-if="view == 'message_list'" class="mt-4" id="message_list">
                <h5 class="text-gray-500 my-4 text-lg">All Messages</h5>
                <div v-for="i in 8" :key="i" class="message_item mb-3 bg-white p-3 rounded-md shadow-sm">  
  
                    <div class="flex">
                        <div>
                            <b-avatar
                            src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2506%2FPNG%2F512%2Fuser_icon_150670.png&imgrefurl=https%3A%2F%2Ficon-icons.com%2Ficon%2Fuser%2F150670&tbnid=d3I4eWd0_7nWxM&vet=12ahUKEwjA6Pm255TyAhVWQUIHHRCcCi8QMygKegUIARDdAQ..i&docid=opuRBsoMwQk5mM&w=512&h=512&q=user%20icon%20image&ved=2ahUKEwjA6Pm255TyAhVWQUIHHRCcCi8QMygKegUIARDdAQ"
                            class="mr-3"
                            ></b-avatar> 
                        </div>
                        <div class="w-full">
                            <div class="flex justify-between items-center">
                                <p class="m-0 flex gap-8">
                                    <span class="guardian_name">Jeremy Okafor</span>
                                    <span class="guardian_title">Guardian</span>
                                    <span class="guardian_title">08164193502</span>
                                </p>
                                <!-- <span class='created_date'>29 July 2021, 14:23</span> -->
                                <span class="message_status rounded-md">Pending</span>
                            </div>
                            <div class="message">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab quibusdam repudiandae officia, tenetur quas quasi voluptate rerum iste mollitia modi doloremque vero impedit. Amet facilis ratione itaque alias distinctio. Sed?</p>
                            </div>
                            <p class="message_footer text-gray-400 mt-3 mb-0">
                                <span>Scheduled Delivery Time: 05 August 2021, 12:35pm</span>
                                <span>Created on 25 July 2021, 14:23</span>
                            </p>
                        </div>
                    </div>
                
                </div>
            </div>

            <div v-if="view == 'new_message'" id="new_message">

                <div class="flex justify-between mt-5 mb-4">
                    <!-- <h5 class="text-gray-500 text-lg">New Message</h5> -->
                    <div class="flex gap-4">

                        <button @click="send_to_individuals = true" :disabled="send_to_individuals" class="btn btn-sm btn-success flex items-center">
                            <i class='bx bx-message'></i>
                            Send to individuals
                        </button>
                        <button @click="send_to_individuals = false" :disabled="!send_to_individuals" class="btn btn-sm btn-success flex items-center">
                            <i class='bx bxs-chat'></i>
                            Send to all
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="form-group" v-if="send_to_individuals">
                            <div>										
                                <multiselect v-model="subjectValues" tag-placeholder="Search & add Subjects" 
                                    placeholder="Choose Receipients" label="subject" class="mb-3"
                                    :hideSelected="true"
                                    track-by="id" :options="subjects" :multiple="true" :taggable="true" @select="tagSubjects" @remove="untagSubject">
                                </multiselect>										
                            </div>
                        </div>
                        <div class="mb-3" v-else>
                            <div class="form-group">
                                <input type="text" disabled style="font-size: 13px;" value="Message would be sent to all guardians" class="form-control">
                            </div>
                            <!-- <h6 class="text-md m-0">Message would be sent to all guardians</h6> -->
                        </div>
                    </div>
                    <div class="col-12">                    
                        <div class="form-group">
                            <textarea class='form-control' rows="3" placeholder="Message"></textarea>
                        </div>   
                    </div>

                    <div class="col-12">
                        <div class="form-group">                    
                            <!-- <input type="text" class="form-control"  placeholder="Title" /> -->
                            <multiselect 
                                v-model="method" 
                                :options="delivery_methods" 
                                :searchable="false" 
                                :close-on-select="false" 
                                :show-labels="false" 
                                @select="checkDeliveryMethod"
                                placeholder="Delivery Method"></multiselect>
                        </div>
                    </div>

                    <div v-if="showDateTime" class="col-12 col-lg-6">
                        <date-picker v-model="time2" style="width: 100%" type="datetime"></date-picker>
                    </div>

                    <div class="col-12 mt-4">
                        <button class="btn btn-success flex items-center mr-3">                    
                        <i class="bx bx-check-circle text-white"></i> Send 
                        </button>
                        <button class="btn btn-danger flex items-center">
                        <i class="bx bx-reset text-white"></i> Reset 
                        </button>
                    </div>
                    
                    
                </div>

            </div>
        </div>



    </div>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: 'communication',
    components: { DatePicker },
    data() {
        return {
            time2: null,
            showDateTime: false,
            send_to_individuals: true,
            view: 'message_list',
            subjectValues: null,
            subjects: [
                {subject:'Father - John Chukwuebuka',id:1},
                {subject:'Mother - John Chukwuebuka',id:2},
                {subject:'Guardian - John Chukwuebuka',id:3},
                {subject:'Father - John Chukwuebuka',id:4}
            ],
            method: '',
            delivery_methods: ['Immediate Delivery', 'Timed Delivery']
        }
    },
    methods: {
        checkDeliveryMethod(value){
            console.log(value);
            if (value === 'Timed Delivery') {
                this.showDateTime = true
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

<style scoped>
.message_item {
    display: flex;
    flex-direction: column;
    position: relative;
}

.guardian {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.guardian_name{
    font-size: 13px;
    font-weight: 600;
}
.guardian_title{
    font-size: 11px;
    color: #aaa;
    background: #ededed;
    padding: 1px 7px;
    border-radius: 6px;
    display: flex;
    align-items: center;
}
.guardian_phone{
    font-size: 12px;
    color: #aaa;
}

.message_status{
    padding: 3px 10px;
    background: #eee;
    color: #ff5a5a;
    font-size: 11px;
    /* position: absolute;
    bottom: 15px;
    right: 15px; */
}

.message p {
    font-size: 13px;
    margin: 8px 0;
    font-style: italic;
    color: #555;
}

.created_date{
    font-size: 12px;
}

.message_footer {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
}
</style>