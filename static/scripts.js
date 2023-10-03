const socket = io();
var sortaccording;
var entered_city;


socket.on("connect", ()=> {
    console.log("You are connected")
    });




async function sortfunc() {
    var ele = document.getElementsByName("radio-group");
    ele.forEach((item)=>{
    if (item.checked) 
    {   sortaccording = item.value;
    }
});
}

// async function filterfunc() {
//     var formData = new FormData(document.getElementById("filter-form"));
//     var formdata = {};
//         formData.forEach(function(value, key) {
//                     formdata[key] = value;
//                     });
//         // console.log(formdata);
//         entered_city = formdata["entered_city"];
//         console.log(entered_city);
// }


window.addEventListener("load", load_and_change);
window.addEventListener("change", load_and_change);
window.addEventListener("keyup", load_and_change)

async function load_and_change() {
    await sortfunc();
    await filterfunc();
    
    function nextstep(){
        console.log(sortaccording)
        console.log(entered_city)

        // var filter = ""

        const additional_data = {
            "sortacc": sortaccording,
            "filteracc": entered_city,
        };
        socket.emit("update_data", additional_data)

        }
    nextstep()    

};

socket.on('update_data', async function(data) {

    //Update the displayed data in the HTML
                   
    await deleteTableData();
    insertTableData(data);
    console.log("in update_data js file")

});

async function deleteTableData() {
    var table = document.getElementById("table-body");
    var tbody = table.querySelector("tbody");
    tbody.innerHTML = ''
    }

async function insertTableData(data) {

    for (var i = 0; i < data.length; i++ ){
        currentRow = data[i];
        var newRow = document.getElementById("table-body").querySelector("tbody").insertRow(i);

        for (var j = 0; j < currentRow.length; j++ ){
            currentCol = currentRow[j];
            var newCol = newRow.insertCell(j);  
            newCol.innerHTML = currentCol            
        }
    }
}


// ////////////////////////////////////////////////////////////


// var formm = document.getElementById('filter-form');

// formm.addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the form from actually submitting

//     // Clear the form fields
//     formm.reset();
// })

async function filterfunc() {
    // var formData = new FormData(document.getElementById("filter-form"));

    data = document.getElementById("filter-input");
    // console.log(data.value);
    // var formdata = {};
    //     formData.forEach(function(value, key) {
    //                 formdata[key] = value;
    //                 });
    //     // console.log(formdata);
    entered_city = data.value;
        console.log(entered_city);
}
