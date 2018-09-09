$(document).ready(function() {
    $('#appointmentForm').hide();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatter1 = new Intl.DateTimeFormat('en-us',options);
    
    //function for making Appointment
    $("#btnMakeApp").click(function(){
        var myDate = $("#datepicker").val();
        var myUsername = $("#myusername").val();
        $.ajax({
            url: ("http://localhost:8080/CarServices/api/client/makeApp/"+myUsername+"/"+myDate)
        }).then(function(result) {
            $("#appResult").html("Το ραντεβού σας καταχωρήθηκε");
        });           
    });
    
    //function for seeing Appointment
    $('#btnCheckApp').click(function () {
        var myUsername = $("#username").val();
        $.ajax({
            url: ("http://localhost:8080/CarServices/api/client/"+myUsername)
        }).then(function(data) {
            var myDate = new Date(data.appointment);
            $('.client-appointment').html(formatter1.format(myDate));
        });
    
    });

    //function for seeing KTEO
    $('#btnCheckKTEO').click(function(){
        var owner = $("#owner").val();
        $.ajax({
            url: ("http://localhost:8080/CarServices/api/client/all/"+owner)
        }).then(function(result) {
            var insert = '';
            for(var i = 0; i < result.carList.length ; i++) {
                var lastCheck = new Date(result.carList[i].last_check);
                var nextCheck = new Date(lastCheck);
                nextCheck.setFullYear(nextCheck.getFullYear() + 2);
                insert += '<tr><td>' + result.carList[i].owner + '</td><td>' + result.carList[i].plate + '</td><td>' + formatter1.format(lastCheck) + '</td><td>'+ formatter1.format(nextCheck) + '</td><td>';  
            }
            $('#kteoResult tr:last').after(insert);
        });
    });

    //function for checking plate in DB
    $('#btnCheckDB').click(function(){
        var plate = $("#plate").val();
        $.ajax({
            url: ("http://localhost:8080/CarServices/api/client/check/"+plate)
        }).then(function(result) {
            if (result.length === 0) {
                $('#appointmentForm').hide();
                $('#resultDB').html(plate+" does not exist in Car DB");
            } else {
                $('#resultDB').html(plate+" exists in Car DB");
                $('#appointmentForm').show(500);
            }
        });
    });
        
});

   