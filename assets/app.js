
var welcome = new Audio("assets/audio/steamTrain.mp3");
var successT = new Audio("assets/audio/TaDa.mp3");
var audio3 = new Audio("assets/audio/TrainWhistle.mp3");
var denied = new Audio("assets/audio/Denied.mp3");
var name;
var destination;
var firstArrival;
var frequency;
var database;
var trainFirebaseData;
var newFirebaseData;
var time;
var clock;
$(document).ready(function () {

    function runningClock() {
        time = moment().format("hh:mm:ss A");
        $("#time").text(time);
    }

    clock = setInterval(runningClock, 1000);



    var config = {
        apiKey: "AIzaSyDKKfbR5QgBi6gbPbkh4AMSvQcLROaCpms",
        authDomain: "fir-test-6ea0e.firebaseapp.com",
        databaseURL: "https://fir-test-6ea0e.firebaseio.com",
        projectId: "fir-test-6ea0e",
        storageBucket: "fir-test-6ea0e.appspot.com",
        messagingSenderId: "797168127670",
        appId: "1:797168127670:web:43620d11febd422bd06017"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    $("#submitButton").on("click", function (event) {

        event.preventDefault();

        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstArrival = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        trainFirebaseData = {
            DatatrainName: name,
            Datadest: destination,
            DatafirstArrival: firstArrival,
            Datafrequency: frequency,
            TimeStamp: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(trainFirebaseData);

        clear();

    });

    database.ref().on("child_added", function (childSnapshot) {

        var snapName = childSnapshot.val().DatatrainName;
        var snapDest = childSnapshot.val().Datadest;
        var snapFreq = childSnapshot.val().Datafrequency;
        var snapArrival = childSnapshot.val().DatafirstArrival;


        var timeIs = moment();

        var firstArrivalConverted = moment(snapArrival, "HH:mm A").subtract(1, "years");

        var diff = moment().diff(moment(firstArrivalConverted), "minutes");
        var left = diff % snapFreq;

        var timeLeft = snapFreq - left;
        var newArrival = moment().add(timeLeft, "m").format("HH:mm: A");

        $("#table-info").append("<tr><td>" + snapName + "</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" +
        newArrival + "</td><td>" + timeLeft + "</td></tr>");

    });

    function clear() {
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    }

});
