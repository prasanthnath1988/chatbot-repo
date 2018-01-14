var botui = new BotUI('api-bot');
//var socket = io.connect('https://chatapisocket.herokuapp.com/');
var socket = io.connect('https://cromptonsocket.herokuapp.com/');



var d = new Date();
var time = d.getHours();
console.log(time);

if (time < 12) {
    responsiveVoice.speak("Good Morning", "US English Female");
} else if (time >= 12 && time < 16) {
    responsiveVoice.speak("Good afternoon!", "US English Female");
} else if (time >= 16) {
    responsiveVoice.speak("Good Evening!", "US English Female");
}

responsiveVoice.speak("Welcome to Crompton Greaves. I can help you with travel related queries. Please select a quick link below or type in the space provided.", "US English Female");
botui.message
    .bot({
        cssClass: 'promessage',
        delay: 1000,
        loading: true,
        content: 'Welcome to Crompton Greaves. I can help you with travel related queries.  Please select a quick link below or type in the space provided.'
    }).then(function() {
        return botui.action.button({
            cssClass: 'promessage',
            delay: 1000,
            loading: true,
            action: [{
                    text: 'Lodging Entitlements',
                    value: 'LODGING ENTITLEMENTS'
                },
                {
                    text: 'Meal Entitlements',
                    value: 'MEAL ENTITLEMENTS'
                },
                {
                    text: 'Outstation travel',
                    value: 'OUTSTATION TRAVEL'
                },
                {
                    text: 'Conveyance',
                    value: 'Conveyance'
                },
                {
                    text: 'Others',
                    value: 'Others'
                },
            ]
        })

    }).then(function(res) {

        if (res.value == 'Conveyance Entitlements') {
            conveyance();
        } else if (res.value == 'OUTSTATIONdddd TRAVEL') {
            outstation();
        } else if (res.value == 'Gurgaon') {
            Gurgaon();
        } else if (res.value == 'mobile') {
            mobile();
        }

        socket.emit('fromClient', {
            client: res.value
        }); // sends the message typed to server
        console.log(res.value); // will print whatever was typed in the field.


    })



var Conveyance = function() {
    botui.action.button({
        delay: 500,
        loading: true,
        action: [{
                text: 'Conveyance within India',
                value: 'Punch-in not Mapped'
            },
            {
                text: 'Foreign Conveyance',
                value: 'Location issue'
            },
            
        ]

    }).then(function(res) {
        socket.emit('fromClient', {
            client: res.value
        }); // sends the message typed to server
        console.log(res.value); // will print whatever was typed in the field.

    });
    // loop to initial state
}


var Outstation = function() {
    botui.action.button({
        delay: 500,
        loading: true,
        action: [{
                text: 'Apply claim',
                value: 'Apply claim'
            },

        ]

    }).then(function(res) {
        socket.emit('fromClient', {
            client: res.value
        }); // sends the message typed to server
        console.log(res.value); // will print whatever was typed in the field.

    });
    // loop to initial state
}


var leaves = function() {
    botui.action.button({
        delay: 500,
        loading: true,
        action: [{
                text: 'How to apply leaves',
                value: 'How to apply leaves'
            },
            {
                text: 'Leave tab not visible',
                value: 'Leave tab not visible'
            },

        ]

    }).then(function(res) {
        socket.emit('fromClient', {
            client: res.value
        }); // sends the message typed to server
        console.log(res.value); // will print whatever was typed in the field.

    });
    // loop to initial state
}


var mobile = function() {
    botui.action.button({
        delay: 500,
        loading: true,
        action: [{
                text: 'Something technically wrong',
                value: 'Something technically wrong'
            },
            {
                text: 'Unable to fetch location',
                value: 'Unable to fetch location'
            },
            {
                text: 'App is not working',
                value: 'App is not working'
            },


        ]

    }).then(function(res) {
        socket.emit('fromClient', {
            client: res.value
        }); // sends the message typed to server
        console.log(res.value); // will print whatever was typed in the field.

    });
    // loop to initial state
}


socket.on('fromServer', function(data) { // recieveing a reply from server.
    console.log(data.server.fulfillment.speech);
    var lang = data.server.fulfillment.speech;
    var para = data.server.actionIncomplete;
    var intent = data.server.metadata.intentName;

    if (lang != "") {
            botui.message.add({
            content: lang,
            delay: 1000,
            loading: true,
        });
        // var langh=lang.split('[');
        // langh=langh[0];
        // langh=langh.toLocaleLowerCase();
        // langh=langh.replace(/zinghr/g,"Zing HR");
         responsiveVoice.speak(lang,"US English Female");
        if (intent === 'LODGING ENTITLEMENTS') {

            if (para == false) {
                var grade = (data.server.parameters.Grade).toLocaleLowerCase();
                var city = (data.server.parameters["geo-city"]).toLocaleLowerCase();


                if (grade == "l3") {
                    botui.message.add({
                        content: 'Actuals ',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("Actuals","US English Female");
                    botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                } else if (grade == 'l2') {
                    if (city == 'delhi' || city == 'gurgaon' || city == 'noida' || city == 'lucknow' || city == 'kolkata' || city == 'mumbai' || city == 'Pune' || city == 'bangalore' || city == 'chennai' || city == 'secunderabad' || city == 'hyderabad') {

                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 6500',
                            delay: 2000,
                            loading: true,
                        });
                        responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 6500","US English Female");
                        botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }else if (city == 'chandigarh' || city == 'dehradun' || city == 'jaipur' || city == 'jammu' || city == 'udaipur' || city == 'bhubaneshwar' || city == 'kathmandu' || city == 'shillong' || city == 'ahmedabad' || city == 'baroda' || city == 'bhopal' || city == 'raipur' || city == 'coimbatore' || city == 'cochin' || city == 'visakhapatnam' || city == 'patna' || city == 'shimla' || city == 'srinagar' || city == 'jalandhar' || city == 'goa' || city == 'nagpur' || city == 'indore' || city == 'aurangabad' || city == 'pondicherry' || city == 'mangalore' || city == 'trivandrum') {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 5800',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 5800","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                } else {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 4400',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 4400","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }

                } else if (grade == 'l1') {
                    if (city == 'delhi' || city == 'gurgaon' || city == 'noida' || city == 'lucknow' || city == 'kolkata' || city == 'mumbai' || city == 'Pune' || city == 'bangalore' || city == 'chennai' || city == 'secunderabad' || city == 'hyderabad') {

                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 5100',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 5100","US English Female");
                              botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                } else if (city == 'chandigarh' || city == 'dehradun' || city == 'jaipur' || city == 'jammu' || city == 'udaipur' || city == 'bhubaneshwar' || city == 'kathmandu' || city == 'shillong' || city == 'ahmedabad' || city == 'baroda' || city == 'bhopal' || city == 'raipur' || city == 'coimbatore' || city == 'cochin' || city == 'visakhapatnam' || city == 'patna' || city == 'shimla' || city == 'srinagar' || city == 'jalandhar' || city == 'goa' || city == 'nagpur' || city == 'indore' || city == 'aurangabad' || city == 'pondicherry' || city == 'mangalore' || city == 'trivandrum') {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 4400',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 4400","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }else {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 3500',
                            delay: 2000,
                            loading: true,
                        });
                           responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 3500","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }

                } else if (grade == 'm3') {
                    if (city == 'delhi' || city == 'gurgaon' || city == 'noida' || city == 'lucknow' || city == 'kolkata' || city == 'mumbai' || city == 'Pune' || city == 'bangalore' || city == 'chennai' || city == 'secunderabad' || city == 'hyderabad') {

                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 4100',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 4100","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                } else if (city == 'chandigarh' || city == 'dehradun' || city == 'jaipur' || city == 'jammu' || city == 'udaipur' || city == 'bhubaneshwar' || city == 'kathmandu' || city == 'shillong' || city == 'ahmedabad' || city == 'baroda' || city == 'bhopal' || city == 'raipur' || city == 'coimbatore' || city == 'cochin' || city == 'visakhapatnam' || city == 'patna' || city == 'shimla' || city == 'srinagar' || city == 'jalandhar' || city == 'goa' || city == 'nagpur' || city == 'indore' || city == 'aurangabad' || city == 'pondicherry' || city == 'mangalore' || city == 'trivandrum') {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 3500',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 3500","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }else {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 2900',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 2900","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }

                } else if (grade == 'm1' || grade == 'm2') {
                    if (city == 'delhi' || city == 'gurgaon' || city == 'noida' || city == 'lucknow' || city == 'kolkata' || city == 'mumbai' || city == 'Pune' || city == 'bangalore' || city == 'chennai' || city == 'secunderabad' || city == 'hyderabad') {

                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 3300',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 3300","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                } else if (city == 'chandigarh' || city == 'dehradun' || city == 'jaipur' || city == 'jammu' || city == 'udaipur' || city == 'bhubaneshwar' || city == 'kathmandu' || city == 'shillong' || city == 'ahmedabad' || city == 'baroda' || city == 'bhopal' || city == 'raipur' || city == 'coimbatore' || city == 'cochin' || city == 'visakhapatnam' || city == 'patna' || city == 'shimla' || city == 'srinagar' || city == 'jalandhar' || city == 'goa' || city == 'nagpur' || city == 'indore' || city == 'aurangabad' || city == 'pondicherry' || city == 'mangalore' || city == 'trivandrum') {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 2600',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 2600","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }else {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 2200',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 2200","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }

                } else if (grade == 'e1' || grade == 'e2' || grade == 'gt' || grade == 'mt') {
                    if (city == 'delhi' || city == 'gurgaon' || city == 'noida' || city == 'lucknow' || city == 'kolkata' || city == 'mumbai' || city == 'Pune' || city == 'bangalore' || city == 'chennai' || city == 'secunderabad' || city == 'hyderabad') {

                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 2900',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 2900","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                } else if (city == 'chandigarh' || city == 'dehradun' || city == 'jaipur' || city == 'jammu' || city == 'udaipur' || city == 'bhubaneshwar' || city == 'kathmandu' || city == 'shillong' || city == 'ahmedabad' || city == 'baroda' || city == 'bhopal' || city == 'raipur' || city == 'coimbatore' || city == 'cochin' || city == 'visakhapatnam' || city == 'patna' || city == 'shimla' || city == 'srinagar' || city == 'jalandhar' || city == 'goa' || city == 'nagpur' || city == 'indore' || city == 'aurangabad' || city == 'pondicherry' || city == 'mangalore' || city == 'trivandrum') {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 2200',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 2200","US English Female");
                             botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }else {
                        botui.message.add({
                            content: 'Actual Lodging expenses with supporting bills are reimbursable upto 1700 ',
                            delay: 2000,
                            loading: true,
                        });
                         responsiveVoice.speak("Actual Lodging expenses with supporting bills are reimbursable upto 1700","US English Female");
                        botui.message.add({
                        content: 'This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.',
                        delay: 1000,
                        loading: true,
                    });
                    responsiveVoice.speak("This reimbursement is applicable for stay requiring lodging arrangements on  official  business,  at  locations  other  than  the Executive’s  residence  or  usual  place  of  work.  The  entitlements are inclusive of service charges, taxes, surcharges, laundry and tips.","US English Female");
                    botui.message.add({
                        content: 'It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("It is expected that all Executives who are entitled to Transit House accommodation  as per the facilities at respective locations will, in the first instance, use the  Company’s Transit Houses for lodging. Hotel accommodation  and also  the facility of Ad Hoc Comprehensive Reimbursement indicated in Section 9 should be availed  only if Transit House accommodation is not available.","US English Female");
                    botui.message.add({
                        content: 'If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.',
                         delay: 2000,
                        loading: true,
                    });
                    responsiveVoice.speak("If an Executive avails of Transit House accommodation, tips and laundry expenses are reimbursable at reasonable actuals.","US English Female");  
                }

                }


            }
        }
        //MEAL ENTITLEMENTS
        else if (intent === 'MEAL ENTITLEMENTS') {
            if (para === false) {
                var grade = (data.server.parameters.Grade).toLocaleLowerCase();
               // var city = (data.server.parameters["geo-city"]).toLocaleLowerCase();
                var withbills = (data.server.parameters.withbills).toLocaleLowerCase();
                
                  if(withbills=="with")
                  {
                    if (grade == "l3") {
                        botui.message.add({
                            content: 'Breakfast Actuals, Lunch Actuals, Dinner Actuals, Total Actuals.  expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed ',
                            delay: 2000,
                            loading: true,
                        });
                        responsiveVoice.speak("Breakfast Actuals, Lunch Actuals, Dinner Actuals, Total Actuals.  expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed","US English Female");
                       
                        botui.message.add({
                            content: 'The reimbursement  for  meals  is  uniform  on  an  All India  basis, irrespective of whether  the  category  of  location  is  A+,  A  or  B.  Expenses  for  Morning  Tea  andAfternoon/Evening  Tea  or  Snacks  are  not  separately  reimbursable  and  are included in the above entitlements. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Reimbursement of expenses on alcohol is not permitted.       Reimbursement  of  Breakfast  and  Dinn  er  Expenses  are  permissible,  whether   locally or outstation, if the Executive is required to leave his/her residence before   7.00  a.m.  or  it  would  not  be  possible  for  the  Executive  to  reach  his/her  residence  earlier  than  9.00  p.m.  respectively.'
                        });
                         responsiveVoice.speak("The reimbursement  for  meals  is  uniform  on  an  All India  basis, irrespective of whether  the  category  of  location  is  A+,  A  or  B.  Expenses  for  Morning  Tea  andAfternoon/Evening  Tea  or  Snacks  are  not  separately  reimbursable  and  are included in the above entitlements. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Reimbursement of expenses on alcohol is not permitted.       Reimbursement  of  Breakfast  and  Dinn  er  Expenses  are  permissible,  whether   locally or outstation, if the Executive is required to leave his/her residence before   7.00  a.m.  or  it  would  not  be  possible  for  the  Executive  to  reach  his/her  residence  earlier  than  9.00  p.m.  respectively.","US English Female");
                    } 
                    else if (grade == 'l2') {
                       

                            botui.message.add({
                            content: 'Breakfast 220, Lunch 450, Dinner 580, Total 1250  expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed',
                            delay: 2000,
                            loading: true,
                        });
                       
                        botui.message.add({
                            content: 'The reimbursement  for  meals  is  uniform  on  an  All India  basis, irrespective of whether  the  category  of  location  is  A+,  A  or  B.  Expenses  for  Morning  Tea  andAfternoon/Evening  Tea  or  Snacks  are  not  separately  reimbursable  and  are included in the above entitlements. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Reimbursement of expenses on alcohol is not permitted.       Reimbursement  of  Breakfast  and  Dinn  er  Expenses  are  permissible,  whether   locally or outstation, if the Executive is required to leave his/her residence before   7.00  a.m.  or  it  would  not  be  possible  for  the  Executive  to  reach  his/her  residence  earlier  than  9.00  p.m.  respectively.'
                        });
                   } else if (grade == 'l1') {
                            botui.message.add({
                                content: 'Breakfast 170, Lunch 350, Dinner 530, Total 1050 Lodging expenses with supporting bills are reimbursable upto 5100',
                                delay: 2000,
                                loading: true,
                            });

                            
                        botui.message.add({
                            content: 'The reimbursement  for  meals  is  uniform  on  an  All India  basis, irrespective of whether  the  category  of  location  is  A+,  A  or  B.  Expenses  for  Morning  Tea  andAfternoon/Evening  Tea  or  Snacks  are  not  separately  reimbursable  and  are included in the above entitlements. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Reimbursement of expenses on alcohol is not permitted.       Reimbursement  of  Breakfast  and  Dinn  er  Expenses  are  permissible,  whether   locally or outstation, if the Executive is required to leave his/her residence before   7.00  a.m.  or  it  would  not  be  possible  for  the  Executive  to  reach  his/her  residence  earlier  than  9.00  p.m.  respectively.'
                        });
                         

                    } else if (grade == 'm3'){

                            botui.message.add({
                                content: 'Breakfast 170, Lunch 300, Dinner 430, Total 900 Lodging expenses with supporting bills are reimbursable upto 4100',
                                delay: 2000,
                                loading: true,
                            });
                            
                        botui.message.add({
                            content: 'The reimbursement  for  meals  is  uniform  on  an  All India  basis, irrespective of whether  the  category  of  location  is  A+,  A  or  B.  Expenses  for  Morning  Tea  andAfternoon/Evening  Tea  or  Snacks  are  not  separately  reimbursable  and  are included in the above entitlements. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Reimbursement of expenses on alcohol is not permitted.       Reimbursement  of  Breakfast  and  Dinn  er  Expenses  are  permissible,  whether   locally or outstation, if the Executive is required to leave his/her residence before   7.00  a.m.  or  it  would  not  be  possible  for  the  Executive  to  reach  his/her  residence  earlier  than  9.00  p.m.  respectively.'
                        });
                       

                    } else if (grade == 'm1' || grade == 'm2')
                    {
                            botui.message.add({
                                content: 'Breakfast 150, Lunch 250, Dinner 350, Total 750 Lodging expenses with supporting bills are reimbursable upto 3300',
                                delay: 2000,
                                loading: true,
                            });
                            
                        botui.message.add({
                            content: 'The reimbursement  for  meals  is  uniform  on  an  All India  basis, irrespective of whether  the  category  of  location  is  A+,  A  or  B.  Expenses  for  Morning  Tea  andAfternoon/Evening  Tea  or  Snacks  are  not  separately  reimbursable  and  are included in the above entitlements. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Reimbursement of expenses on alcohol is not permitted.       Reimbursement  of  Breakfast  and  Dinn  er  Expenses  are  permissible,  whether   locally or outstation, if the Executive is required to leave his/her residence before   7.00  a.m.  or  it  would  not  be  possible  for  the  Executive  to  reach  his/her  residence  earlier  than  9.00  p.m.  respectively.'
                        });
                        

                    } else if (grade == 'e1' || grade == 'e2' || grade == 'gt' || grade == 'mt')
                    {

                            botui.message.add({
                                content: 'Breakfast 150, Lunch 250, Dinner 300, Total 700 Lodging expenses with supporting bills are reimbursable upto 2900',
                                delay: 2000,
                                loading: true,
                            });
                            
                        botui.message.add({
                            content: 'The reimbursement  for  meals  is  uniform  on  an  All India  basis, irrespective of whether  the  category  of  location  is  A+,  A  or  B.  Expenses  for  Morning  Tea  andAfternoon/Evening  Tea  or  Snacks  are  not  separately  reimbursable  and  are included in the above entitlements. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Most  hotels  provide  breakfast  as  a  part  of  the  room  tariff.  In  such  cases,  an Executive will not be entitled to reimbursement of breakfast expenses. Reimbursement of expenses on alcohol is not permitted.       Reimbursement  of  Breakfast  and  Dinn  er  Expenses  are  permissible,  whether   locally or outstation, if the Executive is required to leave his/her residence before   7.00  a.m.  or  it  would  not  be  possible  for  the  Executive  to  reach  his/her  residence  earlier  than  9.00  p.m.  respectively.'
                        });
                      }
                    }
                    else
                    {

                  
                    if (grade == "l3") {
                        botui.message.add({
                            content: 'Breakfast 150, Lunch 300, Dinner 450, Total 900.  expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed ',
                            delay: 2000,
                            loading: true,
                        });
                        responsiveVoice.speak("Breakfast Actuals, Lunch Actuals, Dinner Actuals, Total Actuals.  expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed","US English Female");
                       
                    } 
                    else if (grade == 'l2') {
                        botui.message.add({
                            content: 'Breakfast 130, Lunch 220, Dinner 250, Total 600  expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed',
                            delay: 2000,
                            loading: true,
                        });
                        responsiveVoice.speak("Breakfast 130, Lunch 220, Dinner 250, Total 600  expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed","US English Female");
                       
                   } else if (grade == 'l1') {
                            botui.message.add({
                                content: 'Breakfast 100, Lunch 150, Dinner 200, Total 450 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed',
                                delay: 2000,
                                loading: true,
                            });
                             responsiveVoice.speak("Breakfast 100, Lunch 150, Dinner 200, Total 450 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed","US English Female");
                     } else if (grade == 'm3'){

                            botui.message.add({
                                content: 'Breakfast 100, Lunch 130, Dinner 150, Total 380 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed',
                                delay: 2000,
                                loading: true,
                            });
                             responsiveVoice.speak("Breakfast 100, Lunch 150, Dinner 200, Total 450 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed","US English Female");
                        
                    } else if (grade == 'm1' || grade == 'm2')
                    {
                            botui.message.add({
                                content: 'Breakfast 70, Lunch 100, Dinner 150, Total 300 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed',
                                delay: 2000,
                                loading: true,
                            });
                             responsiveVoice.speak("Breakfast 70, Lunch 100, Dinner 150, Total 300 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed");
                        
                    } else if (grade == 'e1' || grade == 'e2' || grade == 'gt' || grade == 'mt')
                    {

                            botui.message.add({
                                content: 'Breakfast 70, Lunch 80, Dinner 150, Total 300 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed',
                                delay: 2000,
                                loading: true,
                            });
                             responsiveVoice.speak("Breakfast 70, Lunch 80, Dinner 150, Total 300 expenses  with  supporting  bills,  for  breakfast,  lunch  and  dinner  (meals) will be reimbursed");
                        
                      }
                    }
                 }
         }
        //Outstation
         else if(intent === 'OUTSTATION TRAVEL'){
                  if (para == false) {
                   var grade = (data.server.parameters.Grade).toLocaleLowerCase();
                     if (grade == "l3") {
                        botui.message.add({
                        content: 'Air travel (economy) 2nd/1st AC (Train). Air Travel (business) incase of  flights exceeding 9 hours of  flying subject to prior CEO approval .',
                        delay: 1000,
                        loading: true,
                        });
                         responsiveVoice.speak("Air travel (economy) 2nd /1st AC (Train). Air Travel (business) incase of  flights exceeding 9 hours of  flying subject to prior CEO approval.","US English Female");
                      }
                      else if(grade=="m3" || grade =="l2")
                      {
                        botui.message.add({
                        content: 'Air travel (economy) 2nd AC (Train)',
                        delay: 1000,
                        loading: true,
                        });
                        responsiveVoice.speak("Air travel (economy) 2nd AC (Train)","US English Female");
                      }
                      else if(grade=="m2" || grade =="m1" || grade =="e2" || grade =="e1")
                      {
                        botui.message.add({
                        content: '2nd AC (Train), Air travel (economy) in case the distance  (direct route) between base city and destination city (single  way) is more than 500 kms. and/or the duration  of rail journey  exceeds 12 hours by the fastest train OR exigency of service  requires Air Travel. Prior approval of approving authority (at the  level of Unit Head or above) is required',
                        delay: 1000,
                        loading: true,
                        });
                        responsiveVoice.speak("2nd AC (Train), Air travel (economy) in case the distance  (direct route) between base city and destination city (single  way) is more than 500 kms. and/or the duration  of rail journey  exceeds 12 hours by the fastest train OR exigency of service  requires Air Travel. Prior approval of approving authority (at the  level of Unit Head or above) is required");
                      }


                
             }
        }
 
  }else {
        //responsiveVoice.speak(data.server);
        botui.message.add({
            content: 'Sometimes, I may not have the information you need. I am just a virtual assistant who can help you with HR related queries.',
            delay: 1000,
            loading: true,
        });
        responsiveVoice.speak('Sometimes, I may not have the information you need. I am just a virtual assistant who can help you with HR related queries.', "US English Female");
    }

});