export default {
    student_token: null,
    userData: null,
    dataLoading: false,
    walletBalance: 0,

    // assignments: [
    //     { _id:1, title: 'Name the key signatures ', subject: 'Mathematics' },
    //     { _id:2, title: 'Memorize the periodic table', subject: 'Mathematics' },
    //     { _id:3, title: 'True or false equations', subject: 'Mathematics' },
    //     { _id:4, title: 'Quadratic equations', subject: 'Mathematics' }
    // ],
    assignments: [
        { 
            _id: 1, 
            title: 'Name the key signatures',
            description: 'Name the key signatures in the periiodic table',
            classes: [
                // {
                //     _id: 1,
                //     subject: 'Math',
                //     class_name: 'SSS1',
                //     subclass: 'B'
                // },
                { 
                    _id: 2,
                    subject: 'Math',
                    class_name: 'SSS1',
                    subclass: 'C'
                }
            ],
            marked: 'homework',
            type: 'review',
            due_date: '08/04/2021',
            attachments: [],
            send_notification: true,
            links: [
                {
                    _id: Math.floor(Math.random() * 9999999999999),
                    text: 'Periodic guide',
                    link: 'https://dribbble.com/shots/13339138-Edit-Profile'
                },
                {
                    _id: Math.floor(Math.random() * 9999999999999),
                    text: 'Math 101',
                    link: 'https://dribbble.com/shots/13339138-Edit-Profile'
                }
            ],


        }
    ]
}