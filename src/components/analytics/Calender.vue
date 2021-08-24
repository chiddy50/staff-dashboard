
<template>
    <div id="container">
        <i id='calenderPrev' @click="callPrev" disabled class='calender_nav bx bx-chevron-left'></i>    
        <i id='calenderNext' @click="callNext" class='calender_nav bx bx-chevron-right'></i>    
        <!-- <div class='calenderBtns mb-2'>
            <i id='calenderPrev' @click="callPrev" disabled class='bx bx-chevron-left'></i>    
            <i id='calenderNext' @click="callNext" class='bx bx-chevron-right'></i>    
        </div> -->
        <div id="calender" ref="calender"></div>
    </div>
</template>

<script>
// import eventData from '../eventData';
export default {
    data() {
        return {
            calenderShow: 1,
            
            events:[
                {
                    date: '08/20/2021',
                    activity: [
                        {
                            subject: 'Mathematics',
                            description: '',
                            starts: '9:00am',
                            ends: '10:00am'
                        },
                        {
                            subject: 'English',
                            description: '',
                            starts: '10:00am',
                            ends: '11:00am'
                        }
                    ]
                },
                {
                    date: '08/21/2021',
                    activity: [
                        {
                            subject: 'Chemistry',
                            description: '',
                            starts: '9:00am',
                            ends: '11:00am'
                        },
                        {
                            subject: 'Physics',
                            description: '',
                            starts: '11:00am',
                            ends: '12:30pm'
                        }
                    ]
                }
            ]            
        }   
    },
    mounted(){
        let date = new Date();
        let { newMonth, newDate } = this.formatDate(date);
        let calender = `${date.getFullYear()}/${newMonth}/${newDate}`;

        this.loadCalender(calender, "2023/01/01");
    },
    methods: {
        loadCalender(start, end){
            let content = this.getDatesBetween(start, end);
            this.$refs.calender.innerHTML = content;

            let allTd = document.getElementsByClassName('allTd');
            for(let i = 0; i < allTd.length; i++){
                allTd[i].addEventListener('click', (event) => {                    
                    this.selectDay(event)
                });
            }
        },
        callPrev(){
            let allTable = document.getElementsByClassName('calendarWrapper');    
            document.getElementById('calenderNext').disabled = false;
            this.calenderShow--;
            if(this.calenderShow >= 1){
                for(let i = 0; i < allTable.length; i++){
                    allTable[i].style.display = 'none';
                }        
                document.getElementById("calenderTable_"+this.calenderShow).style.display = "block";
                if(this.calenderShow == 1){
                    document.getElementById('calenderPrev').disabled = true;
                }
            }
        },
        callNext(){
            let allTable = document.getElementsByClassName('calendarWrapper');    
            document.getElementById('calenderPrev').disabled = false;
            this.calenderShow++;
            if(this.calenderShow <= allTable.length){
                for(let i = 0; i < allTable.length; i++){
                    allTable[i].style.display = 'none';
                }        
                document.getElementById("calenderTable_"+this.calenderShow).style.display = "block";
                if(this.calenderShow == allTable.length){
                    document.getElementById('calenderNext').disabled = true;
                }
            }
        },

        formatDate(date){
            let formatMonth = date.getMonth()+1;
            let newMonth = formatMonth < 10 ? "0"+formatMonth : formatMonth;

            let formatDate = date.getDate();
            let newDate = formatDate < 10 ? "0"+formatDate : formatDate;
            return { newMonth, newDate }
        },

        addActivity(events){
            let content = '';
            content += `<ul>`;
            events.forEach(event => {
                content += `<li><span class='eventName'>${event.subject}</span><span class='eventTime'><span class='eventItem eventStart'>Starts: ${event.starts}</span><span class='eventItem eventEnd'>Ends: ${event.ends}</span></span></li>`;
            });
            content += `</ul>`;
            return content;
        },

        selectDay(elem){
            let el = elem.target.localName == 'span' ? elem.target.parentElement : elem.target;
            
            let allCell = document.querySelectorAll('.calenderTable tbody td');
            allCell.forEach(cell => cell.classList.remove('activeDay') );
            el.classList.add('activeDay');
            
            let { day, month, year } = el.dataset
            let date = new Date();
            date.setDate(day);
            date.setMonth(month);
            date.setYear(year); 

            let { newMonth, newDate } = this.formatDate(date);

            let dateAppend = `${newMonth}/${newDate}/${date.getFullYear()}`;
            
            console.log(new Date(dateAppend));
            this.$emit('get-activties')
            // this.events.forEach(event => {
            //     if(dateAppend == event.date){
            //         // console.log(event.activity);
            //         let eventBox = document.querySelector('.eventBox');
            //         eventBox.innerHTML = this.addActivity(event.activity);
            //     }
            // })
        },

        getDatesBetween(startDate, endDate){
            let startRange = new Date(startDate);
            let endRange = new Date(endDate);
            
            startDate = this.settingDate(startDate, 31);
            endDate = this.settingDate(endDate, 31);
            
            let temp;
            let dates = [];
            while(startDate <= endDate){
                if(startDate.getDate() != 31){
                    temp = this.settingDate(startDate, 0);
                    if(temp >= startRange && temp <= endRange) dates.push(temp);
                    startDate = this.settingDate(startDate, 31)
                }else{
                    temp = new Date(startDate);
                    if(temp >= startRange && temp <= endRange) dates.push(temp);
                    startDate.setMonth(startDate.getMonth() + 1);
                }
            }
            // console.log(dates);
            // let content = "<div class='calenderBtns'><button id='calenderPrev' onclick='callPrev()' disabled>Prev</button> | <button id='calenderNext' onclick='callNext()'>Next</button></div>";
            let content = "";

            let weekdays = [
                { shortDay:'Mon', fullDay:'Monday' }, 
                { shortDay:'Tue', fullDay:'Tuesday' }, 
                { shortDay:'Wed', fullDay:'Wednesday' }, 
                { shortDay:'Thu', fullDay:'Thursday' }, 
                { shortDay:'Fri', fullDay:'Friday' },
                { shortDay:'Sat', fullDay:'Saturday' },
                { shortDay:'Sun', fullDay:'Sunday' }
            ];

            let lastDate; // array of last day of each month 
            let firstDate; // array of first day of each month
            let test = [];
            content += `<div class='calenderHolder'>`;

            for(let i = 0; i < dates.length; i++){
                lastDate = dates[i]; //Each last date of each month
                let currYear = dates[i].getFullYear();
                let currMonth = dates[i].getMonth();

                firstDate = new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
                content += `<div class='calendarWrapper' data-year='${currYear}' data-month='${currMonth}' id='calenderTable_${i+1}'>`;
                    
                content += `<h2> ${firstDate.toString().split(" ")[1]} - ${firstDate.getFullYear()}</h2>`;
                content += `<table class='calenderTable'>`;
                content += `<thead>`;
                content += `<tr>`;

                weekdays.map(item => {
                    content += `<th>${item.shortDay}</th>`;
                });
                content += `</tr>`;
                content += `</thead>`;
                content += `<tbody>`;
                
                let j = 1;
                let displayNum, idMonth;
                while(j <= lastDate.getDate()){
                    content += `<tr>`;
                        for(let k = 0; k < 7; k++){
                            displayNum = j < 10 ? "0"+j : j;
                            if(j==1){
                                if(firstDate.toString().split(" ")[0] == weekdays[k].shortDay){                            
                                    content += `<td class='allTd' data-year='${currYear}' data-month='${currMonth}' data-day='${displayNum}'><span class='day_text'>${displayNum}</span></td>`;
                                    j++;
                                }else{
                                    content += `<td class='empty_cell'></td>`;
                                }
                            }else if(j > lastDate.getDate()){
                                content += `<td class='empty_cell'></td>`;
                            }else{
                                content += `<td class='allTd' data-year='${currYear}' data-month='${currMonth}' data-day='${displayNum}'><span class='day_text'>${displayNum}</span></td>`;
                                j++;
                            }
                        }
                    content += `</tr>`;
                }
                content += `</tbody>`;
                content += `</table>`;
                content += `</div>`;
            }

            content += `</div>`;

            // content += `<div class='eventBox'>`;
            // content += `<ul>`;
            // content += `<li><span class='eventName'>Adele</span><span class='eventTime'><span class='eventItem eventStart'>Starts: 9:00am</span><span class='eventItem eventEnd'>Ends: 10:00am</span></span></li>`;
            // content += `</ul>`;
            // content += `</div>`;

            // console.log(content);
            return content;
        },

        settingDate(date, day){
            date = new Date(date);
            date.setDate(day);
            date.setHours(23);

            return date;
        },

        
        
    }
}
</script>

<style>
 .calenderTable tbody tr td.empty_cell {
    background-color: #eee;
    border: 1px solid #eee;
 }

 .allTd {
    border: .1px solid #eee;
 }

  .day_text {
      font-size: 14px;
  }


.calender_nav {
    position: absolute;
    top: 15px;
    font-size: 34px;
    cursor: pointer;
}

#calenderPrev {
    left: 10px;
}
  
#calenderNext {
    right: 10px;
}  

.calendarWrapper{
    overflow-x: auto;
    display: none;
    /* margin-right: 25px; */
}

.calendarWrapper h2{
    padding: 0px 10px 15px;
    /* background-color: #eee; */
    text-align: center;
    border: none;
    margin-bottom: 0;
    font-size: 17px;
    font-weight: 600;
}
#calenderTable_1 {
    display: block;
}

#calender {
    /* display: flex; */
    /* border-bottom: 1px solid; */
    /* padding: 23px; */
}

.calenderHolder{
    /* flex: 1; */
}

.eventBox {
    /* border: 1px dashed; */
    flex: 2;
}

.calenderTable{
    width: 100%;
    /* border: 1px solid #000; */
    border-collapse: collapse;
}

.calenderTable thead tr th {
    background-color: #333;
    color: #fff;
    border: 1px solid #333;
    padding: 20px 0;
    font-size: 13px;
    text-align: center;
}

.calenderTable tbody tr td {
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    background-color: #fff;
    /* border-radius: 50%; */
    width: 14.3%;
}

.calenderTable tbody tr td.allTd:hover {
    background-color: #999999;
    color: #fff;
}

td.activeDay{
    background-color: #969696 !important;
    color: #fff;
}

/* BUTTONS STYLE */

.calenderBtns {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.calenderBtns i {
    font-size: 30px;
    cursor: pointer;
}

</style>