<template>
    <div class="p-3">
        <h2 class="font-bold text-3xl m-0">Summary</h2>
        <p class='text-xs my-2'>You are about to {{ edit == true ? 'update' : 'create' }} an assignment. Please review the summary below before proceeding.</p>
        <hr class="m-0"/>
        <div class="grid grid-cols-2 py-3 gap-4">
            <div class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Subject</span>
                <span class="text-gray-400 text-xs">{{ assignment_data.subject.subject }}</span>
            </div>
            <div class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Classes</span>
                <div class="flex flex-wrap mt-1 gap-1">
                    <span v-for="(assignment, index) in assignment_data.classValues" :key="index"
                    class="text-white bg-blue-300 rounded-xl px-3 py-1 text-xs">{{ assignment.placeholder }}</span>
                </div>
            </div>
            <div class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Descripton</span>
                <span class="text-gray-400 text-xs text-capitalize">{{ assignment_data.description }}</span>
            </div>
            <div class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Title</span>
                <span class="text-gray-400 text-xs text-capitalize">{{ assignment_data.title }}</span>
            </div>
            <div class="col-span-2 flex flex-col">
                <span class="font-bold text-sm">Instruction</span>
                <span class="text-gray-400 text-xs text-capitalize">{{ assignment_data.instruction }}</span>
            </div>
            
        </div>
        <div class="grid grid-cols-3 pb-3 pt-2 gap-4">
            <div class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Week</span>
                <span class="text-gray-400 text-xs">{{ assignment_data.week }}</span>
            </div>
            <div class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Is CBT?</span>
                <span class="text-gray-400 text-xs">{{ assignment_data.isCBT ? 'True' : 'False' }}</span>
            </div>
            <div class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Send Notification?</span>
                <span class="text-gray-400 text-xs">{{ assignment_data.send_notification ? 'True' : 'False' }}</span>
            </div>
        </div>
        
        <hr class="m-0"/>

        <div v-if="assignment_data.isCBT">
            <div>
                <h3 class="text-base m-0 mt-2 text-gray-400">Duration:</h3>
            </div>
            <div class="grid grid-cols-3 pb-3 pt-2 gap-4">
                <div class="col-span-1 flex flex-col">
                    <span class="font-bold text-sm">Hours</span>
                    <span class="text-gray-400 text-xs">
                        {{ formatHour(assignment_data.duration.hours) }}
                    </span>
                </div>
                <div class="col-span-1 flex flex-col">
                    <span class="font-bold text-sm">Minutes</span>
                    <span class="text-gray-400 text-xs">
                        {{ formatMin(assignment_data.duration.minutes) }}                    
                    </span>
                </div>
                <div class="col-span-1 flex flex-col">
                    <span class="font-bold text-sm">Seconds</span>
                    <span class="text-gray-400 text-xs">
                        {{ formatSec(assignment_data.duration.seconds) }}                                    
                    </span>
                </div>
            </div>
        </div>
        <!-- <hr class="m-0"/> -->
        <div class="grid grid-cols-3 py-3 gap-4">
            <div v-if="assignment_data.isCBT" class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Due Date</span>
                <span class="text-gray-400 text-xs">
                    {{ formatDate(assignment_data.due_date) }}</span>
            </div>
            <div v-if="!assignment_data.isCBT" class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">Start Date</span>
                <span class="text-gray-400 text-xs">
                    {{ formatDate(assignment_data.start_date) }}</span>
            </div>
            <div v-if="!assignment_data.isCBT" class="col-span-1 flex flex-col">
                <span class="font-bold text-sm">End Date</span>
                <span class="text-gray-400 text-xs">
                    {{ formatDate(assignment_data.end_date) }}
                </span>
            </div>
        </div>
        <hr class="m-0"/>
        <div>
            <h3 class="text-base m-0 mt-3 text-gray-400">Links:</h3>
        </div>
        <div v-if="assignment_data.links.length">
            <div class="grid grid-cols-1 pb-3 pt-2 gap-4">
                <div v-for="(link, index) in assignment_data.links" :key="index" class="col-span-1 flex flex-col">
                    <span class="font-bold text-sm">{{link.title}}</span>
                    <span class="text-gray-400 text-xs">{{link.url}}</span>
                </div>            
            </div>
        </div>
        <div v-else class="text-xs mb-3">
            No links added
        </div>
        <div class="">
            <button @click="$emit('proceed')" class="btn-sm btn btn-success">
                {{ edit === true ? 'Update' : 'Create' }}
            </button>
        </div>
    </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
    name: 'summary',
    props: ['edit', 'assignment_data'],
    methods: {
        proceed(){
            this.$emit('proceed')
        },
        formatHour(value) {
            let hour = Number(value);
            return hour < 2 ? `${hour} hour` : `${hour} hours`;
        },
        formatMin(value) {
            let minute = Number(value);
            return minute < 2 ? `${minute} minute` : `${minute} minutes`;
        },
        formatSec(value) {
            let second = Number(value);
            return second < 2 ? `${second} second` : `${second} seconds`;
        },
        formatDate(value) {
            return DateTime.fromISO(value).toFormat('yyyy LLL dd'); 
        }
    }
}
</script>

<style>

</style>