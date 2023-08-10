"use strict";

/* ----------------------------------------------------------------------------- */
/* Loader ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

window.addEventListener("load",function(){
        
  $("#loaderDiv").fadeOut(1000,function(){

    $("#myLoading").remove()

    $("body").css("overflow-y","auto")

  })

}) 

/* ----------------------------------------------------------------------------- */
/* Sharding -------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function openLink(url){

  return   window.open(`https://${url}`,"_blank")
  
}

/* ----------------------------------------------------------------------------- */
/* CRUD ------------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------- */

let customerName        = document.getElementById('customerName');
let customerPhone       = document.getElementById('customerPhone');

let deviceReceipt      = document.getElementById('deviceReceipt');
let deviceCategory     = document.getElementById('deviceCategory');
let deviceSN           = document.getElementById('deviceSN');
let deviceDescription  = document.getElementById('deviceDescription');
let deviceCost         = document.getElementById('deviceCost');
let addBTN              = document.getElementById('addBTN');
let updateBTN           = document.getElementById("updateBTN");

let disableEnable = document.querySelectorAll('.disableEnable')

let allArBtn            = document.querySelectorAll(".arBTN");
let allEnBtn            = document.querySelectorAll(".enBTN");
let allText             = document.querySelectorAll(".textChangeDir")

let firstList           = [];
let secondList          = [];
let ArEn               = [];

let indexOfArray;
let deviceInfo;

//----------------------------------------------------------------------------------

if(localStorage.getItem('CRUD_List1') != null){

    firstList = JSON.parse(localStorage.getItem('CRUD_List1'));

    displayDevice(firstList,'tableData1',1);

}else{

    firstList = [];
    
}

//----------------------------------------------------------------------------------

if(localStorage.getItem('CRUD_List2') != null){

    secondList = JSON.parse(localStorage.getItem('CRUD_List2'));

    displayDevice(secondList,'tableData2',2);

}else{

    secondList = [];
}

//----------------------------------------------------------------------------------

if(localStorage.getItem('CRUD_ArEn') != null){

    ArEn = JSON.parse(localStorage.getItem('CRUD_ArEn'));

}else{

    ArEn = [];
}

//----------------------------------------------------------------------------------
    
function addDevice(){
    
    let dateTime = new Date();

    let getHours = dateTime.getHours();

    if (getHours == 0) {
        
        getHours = '00'

    }else if (getHours < 10) {

        getHours = `0${getHours}`
    }

    let getMinutes = dateTime.getMinutes();

    if (getMinutes == 0) {
        
        getMinutes = '00'

    }else if (getMinutes < 10) {

        getMinutes = `0${getHours}`
    }

    let getDay = dateTime.getDate()

    let getMonth = dateTime.getMonth() + 1

    let getYears = dateTime.getFullYear()

    let nightSun

    if ( getHours*1 < 12 || getHours == '00') {

        nightSun = 'AM'

    }else{

        nightSun = 'PM'
    }

    let device ={
        receipt:     deviceReceipt.value,
        name:        customerName.value,
        phone:       customerPhone.value,
        category:    deviceCategory.value,
        pSN:         deviceSN.value,
        description: deviceDescription.value,
        cost:        deviceCost.value,
        addDate:     `${getDay}/${getMonth}/${getYears}`,
        addTime:     `${getHours} : ${getMinutes} ${nightSun}`,
        info:        ""
    }

    firstList.push(device);

    setToLocalStorage('CRUD_List1',firstList)

    displayDevice(firstList,'tableData1',1);

    clearForm();

}

//----------------------------------------------------------------------------------

function setToLocalStorage(keyName,arrayName){

    localStorage.setItem(keyName,JSON.stringify(arrayName))

}

//----------------------------------------------------------------------------------

function displayDevice(arrayName,divID,key){

    let cartona = ``;


    if (key == 1) {

        for(let i = 0 ; i < arrayName.length ; i++ ){

            cartona +=
    
            `
            <tr>
                <th>${arrayName[i].receipt          }</th>
                <th>${arrayName[i].category         }</th>
                <th>${arrayName[i].pSN.toUpperCase()}</th>
                <th>${arrayName[i].cost             }</th>
                <th><button class="btn btn-outline-info"    onclick="openDescriptionDiv(${i},${key})">Info</button></th>
                <th><button class="btn btn-outline-warning" onclick="getDeviceForUpdate(${i},${key})">Update</button></th>
                <th><button class="btn btn-outline-danger"  onclick="openCloseReportDiv(${i},${key})">Remove</button></th>
            </tr>
            `
        }

    }else{

        for(let i = 0 ; i < arrayName.length ; i++ ){

            cartona +=
    
            `
            <tr>
                <th>${arrayName[i].receipt          }</th>
                <th>${arrayName[i].category         }</th>
                <th>${arrayName[i].pSN.toUpperCase()}</th>
                <th>${arrayName[i].cost             }</th>
                <th><button class="btn btn-outline-info"    onclick="openDescriptionDiv(${i},${key})">Info</button></th>
                <th><button class="btn btn-outline-warning" onclick="getDeviceForUpdate(${i},${key})">Restore</button></th>
                <th><button class="btn btn-outline-danger"  onclick="displayHiddenWarning(${i},1)">Remove</button></th>
            </tr>
            `
        }
    }

        

    
    document.getElementById(divID).innerHTML = cartona
}

//----------------------------------------------------------------------------------

function clearForm(flag){
    
    deviceReceipt.value     = flag? flag.receipt:""
    customerName.value      = flag? flag.name:"" 
    customerPhone.value     = flag? flag.phone:""
    deviceCategory.value    = flag? flag.category:""
    deviceSN.value          = flag? flag.pSN:""
    deviceDescription.value = flag? flag.description:""
    deviceCost.value        = flag? flag.cost:""

}

//----------------------------------------------------------------------------------

function openDescriptionDiv(i,key){
    
    for (let i = 0; i < disableEnable.length; i++) {
    
        disableEnable[i].classList.add('d-none')
    }

    indexOfArray = i

    if (key == 1) {

        document.getElementById("allInputs").classList.add("d-none")

        document.getElementById("table1").classList.add("d-none")

        document.getElementById("descriptionDiv1").classList.replace("d-none","d-block")
    
        document.getElementById("dateOfEnter1").innerHTML = firstList[i].addDate
    
        document.getElementById("timeOfEnter1").innerHTML = firstList[i].addTime
    
        document.getElementById("userName1").innerHTML = firstList[i].name;
    
        document.getElementById("userPhoneNumber1").innerHTML = firstList[i].phone;

        document.getElementById("userPhoneIcon1").setAttribute(`href`,`tel:+2${firstList[i].phone}`);

        document.getElementById("deviceType1").innerHTML = firstList[i].category;

        document.getElementById("deviceSN1").innerHTML = firstList[i].pSN.toUpperCase();

        document.getElementById("oldInfo").innerHTML = firstList[i].info;

        document.getElementById("contentOfDescriptionDiv1").innerHTML = firstList[i].description;
    

    }else if (key == 2) {

        document.getElementById("table2").classList.add("d-none")

        document.getElementById("descriptionDiv2").classList.replace("d-none","d-block")
    
        document.getElementById("dateOfEnter2").innerHTML = secondList[i].addDate
    
        document.getElementById("timeOfEnter2").innerHTML = secondList[i].addTime
    
        document.getElementById("userName2").innerHTML = secondList[i].name;
        
        document.getElementById("userPhoneNumber2").innerHTML = secondList[i].phone;
        
        document.getElementById("userPhoneIcon2").setAttribute(`href`,`tel:+2${secondList[i].phone}`);
    
        document.getElementById("deviceType2").innerHTML = secondList[i].category;

        document.getElementById("deviceSN2").innerHTML = secondList[i].pSN.toUpperCase();

        document.getElementById("contentOfDescriptionDiv2").innerHTML = secondList[i].description;
    
        document.getElementById("dateOfOut2").innerHTML = secondList[i].deliveryDate
    
        document.getElementById("timeOfOut2").innerHTML = secondList[i].deliveryTime

        document.getElementById("deviceStatus2").innerHTML = secondList[i].status

        document.getElementById("contentOfReportDiv2").innerHTML = secondList[i].report
    }

}

//----------------------------------------------------------------------------------

function openUserWhatsapp(key){

    if (key == 1) return window.open(`https://wa.me/+2${firstList[indexOfArray].phone}`,"_blank")


    window.open(`https://wa.me/+2${secondList[indexOfArray].phone}`,"_blank")
}

//----------------------------------------------------------------------------------

function closeDescriptionDiv(key){

    if (key == 1) {

        for (let i = 0; i < disableEnable.length; i++) {
    
            disableEnable[i].classList.replace('d-none','d-block')
            
        }

        document.getElementById("descriptionDiv1").classList.add("d-none")

        document.getElementById("allInputs").classList.replace("d-none","d-block")

        document.getElementById("table1").classList.replace("d-none","d-block")
    
    }else if (key == 2) {

        document.getElementById("descriptionDiv2").classList.add("d-none")

        document.getElementById("table2").classList.replace("d-none","d-block")

    }
}

//----------------------------------------------------------------------------------

function getDeviceForUpdate(i,key){

    indexOfArray = i

    if (key == 2) return restoreDevice(i)

    document.getElementById("table1").classList.add("d-none")

    clearForm(firstList[i])
    
    addBTN.classList.add("d-none")

    updateBTN.classList.replace("d-none","d-block")


    if (firstList[i].info) {

        deviceInfo = firstList[i].info

    }else{
        
        deviceInfo = null
    }

}

//----------------------------------------------------------------------------------

function updateTheDevice(date,time,deviceInfo){

    document.getElementById("table1").classList.replace("d-none","d-block")

    let device ={
        receipt:     deviceReceipt.value,
        name:        customerName.value,
        phone:       customerPhone.value,
        category:    deviceCategory.value,
        pSN:         deviceSN.value,
        description: deviceDescription.value,
        cost:        deviceCost.value,
        addDate:     date,
        addTime:     time,
        info:        deviceInfo
    }

    firstList.splice(indexOfArray,1,device);

    setToLocalStorage('CRUD_List1',firstList)

    displayDevice(firstList,'tableData1',1);

    clearForm();
}

//----------------------------------------------------------------------------------

function openCloseReportDiv(index,key){

    indexOfArray = index

    if (key == 1) {

            for (let i = 0; i < disableEnable.length; i++) {
    
            disableEnable[i].classList.add('d-none')
            
        }

        document.getElementById("allInputs").classList.add("d-none")

        document.getElementById("table1").classList.add("d-none")

        document.getElementById("reportDivForRemovedDevice").classList.replace("d-none","d-block")
    
    }else if (key == 2) {

        for (let i = 0; i < disableEnable.length; i++) {
    
            disableEnable[i].classList.replace('d-none','d-block')
            
        }
        
        document.getElementById("reportDivForRemovedDevice").classList.add("d-none")

        document.getElementById("table1").classList.replace("d-none","d-block")

        document.getElementById("allInputs").classList.replace("d-none","d-block")

    }
}

//----------------------------------------------------------------------------------

function moveToDoneList(i,status){

    let dateTime = new Date();

    let getHours = dateTime.getHours();

    if (getHours == 0) {
        
        getHours = '00'

    }else if (getHours < 10) {

        getHours = `0${getHours}`
    }

    let getMinutes = dateTime.getMinutes();

    if (getMinutes == 0) {
        
        getMinutes = '00'

    }else if (getMinutes < 10) {

        getMinutes = `0${getHours}`
    }

    let getDay = dateTime.getDate()

    let getMonth = dateTime.getMonth() + 1

    let getYears = dateTime.getFullYear()

    let repair = status;

    let nightSun

    if (getHours*1 < 12 || getHours == '00') {

        nightSun = 'AM'

    }else{
        
        nightSun = 'PM'
    }

    let device ={
        receipt:        firstList[i].receipt,
        name:           firstList[i].name,
        phone:          firstList[i].phone,
        category:       firstList[i].category,
        pSN:            firstList[i].pSN,
        description:    firstList[i].description,
        cost:           firstList[i].cost,
        addDate:        firstList[i].addDate,
        addTime:        firstList[i].addTime,
        deliveryDate:   `${getDay}/${getMonth}/${getYears}`,
        deliveryTime:   `${getHours} : ${getMinutes} ${nightSun}`,
        report:         document.getElementById("technicalReport").value,
        status:         repair
    }

    secondList.push(device)

    setToLocalStorage('CRUD_List2',secondList)

    displayDevice(secondList,'tableData2',2)

    firstList.splice(i,1)

    setToLocalStorage('CRUD_List1',firstList)

    displayDevice(firstList,'tableData1',1)

    openCloseReportDiv(i,2)

    document.getElementById("technicalReport").value = ""
}

//----------------------------------------------------------------------------------
//
function searchDB(searchKey,n){

    if (n == 1) {

        let searchList1 = []
        
        for (let i=0 ; i < firstList.length; i++){

            if(
                firstList[i].receipt.toLowerCase().includes(searchKey.toLowerCase())
                ||
                firstList[i].name.toLowerCase().includes(searchKey.toLowerCase())
                ||
                firstList[i].phone.toLowerCase().includes(searchKey.toLowerCase())
                ||
                firstList[i].category.toLowerCase().includes(searchKey.toLowerCase())
                ||
                firstList[i].pSN.toLowerCase().includes(searchKey.toLowerCase())
                ||
                firstList[i].description.toLowerCase().includes(searchKey.toLowerCase())  
                ||
                firstList[i].cost.toLowerCase().includes(searchKey.toLowerCase())
                ||
                firstList[i].addDate.toLowerCase().includes(searchKey.toLowerCase())  
                ||
                firstList[i].addTime.toLowerCase().includes(searchKey.toLowerCase())
            ){
                searchList1.push(firstList[i]);
            }
        }
    
        displayDevice(searchList1,'tableData1',1);

    }else if (n==2) {

        let searchList2 = []

        for (let i=0 ; i < secondList.length; i++){

            if(
                secondList[i].receipt.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].name.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].phone.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].category.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].pSN.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].description.toLowerCase().includes(searchKey.toLowerCase())  
                ||
                secondList[i].cost.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].addDate.toLowerCase().includes(searchKey.toLowerCase())  
                ||
                secondList[i].addTime.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].report.toLowerCase().includes(searchKey.toLowerCase())  
                ||
                secondList[i].status.toLowerCase().includes(searchKey.toLowerCase())
                ||
                secondList[i].deliveryDate.toLowerCase().includes(searchKey.toLowerCase())  
                ||
                secondList[i].deliveryTime.toLowerCase().includes(searchKey.toLowerCase())
            ){
                searchList2.push(secondList[i]);
            }
        }
    
        displayDevice(searchList2,'tableData2',2);

    }
}

//----------------------------------------------------------------------------------

if (ArEn[0] == 1){

    for (let i = 0; i < allArBtn.length; i++) {
        
        allEnBtn[i].classList.add("d-none")
        allArBtn[i].classList.replace("d-none","d-block")
    }

    for (let i = 0; i < allText.length; i++) {

        allText[i].setAttribute("style","direction: rtl;")
    }

}else{

    for (let i = 0; i < allArBtn.length; i++) {
        
        allArBtn[i].classList.add("d-none")
        allEnBtn[i].classList.replace("d-none","d-block")

    }

    for (let i = 0; i < allArBtn.length; i++) {
        
        allArBtn[i].classList.add("d-none")
        allEnBtn[i].classList.replace("d-none","d-block")

    }
}


function changeDir(key) {

    ArEn.splice(0,1,key);

    setToLocalStorage(3);


    if (key == 1) {

        for (let i = 0; i < allText.length; i++) {

            allText[i].setAttribute("style","direction: rtl;")
        }

        for (let i = 0; i < allArBtn.length; i++) {
        
            allEnBtn[i].classList.add("d-none")
            allArBtn[i].classList.replace("d-none","d-block")
        }

        

    }else if (key == 2) {
            
        for (let i = 0; i < allText.length; i++) {

            allText[i].removeAttribute("style")
        }

        for (let i = 0; i < allArBtn.length; i++) {
        
            allArBtn[i].classList.add("d-none")
            allEnBtn[i].classList.replace("d-none","d-block")
    
        }
            
    }

}

//----------------------------------------------------------------------------------

function openPage(key){

    if (key == 1) {

        for (let i = 0; i < disableEnable.length; i++) {
    
            disableEnable[i].classList.add('d-none')
            
        }

        document.getElementById("firstPage").classList.add("d-none")

        document.getElementById("secondPage").classList.replace("d-none","d-block")

        document.getElementById("sDB2_2").value = ""
    
    }else if (key == 2) {

        for (let i = 0; i < disableEnable.length; i++) {
    
            disableEnable[i].classList.replace('d-none','d-block')
            
        }
        
        document.getElementById("secondPage").classList.add("d-none")

        document.getElementById("firstPage").classList.replace("d-none","d-block")

        document.getElementById("sDB1_1").value = ""

    }
    

}

//----------------------------------------------------------------------------------

function restoreDevice(i){

    let dateTime = new Date();

    let getHours = dateTime.getHours();

    if (getHours == 0) {
        
        getHours == '00'
        
    }else if (getHours < 10) {

        getHours = `0${getHours}`
    }

    let getMinutes = dateTime.getMinutes();

    if (getMinutes == 0) {
        
        getMinutes == '00'

    }else if (getMinutes < 10) {

        getMinutes = `0${getHours}`
    }

    let getDay = dateTime.getDate()

    let getMonth = dateTime.getMonth() + 1

    let getYears = dateTime.getFullYear()

    let nightSun

    if (getHours*1 < 12 || getHours == '00') {

        nightSun = 'AM'

    }else{
        
        nightSun = 'PM'
    }

    let device ={
        receipt:     secondList[i].receipt,
        name:        secondList[i].name,
        phone:       secondList[i].phone,
        category:    secondList[i].category,
        pSN:         secondList[i].pSN,
        info:
`- Date Received : ${secondList[i].addDate}
- Date Delivery : ${secondList[i].deliveryDate}
- Status : ${secondList[i].status}
- Old Cost : ${secondList[i].cost}
`,
        description:
`* Old Technical Report *
------------------------
${secondList[i].report}
------------------------------------------------
`,

        cost:        0,
        addDate:     `${getDay}/${getMonth}/${getYears}`,
        addTime:     `${getHours} : ${getMinutes} ${nightSun}`
    }

    firstList.push(device)

    setToLocalStorage('CRUD_List1',firstList)

    displayDevice(firstList,'tableData1',1)

    secondList.splice(i,1)

    displayDevice(secondList,'tableData2',2)

    setToLocalStorage('CRUD_List2',secondList)

}

//----------------------------------------------------------------------------------

function displayHiddenWarning(i,n){

    if (n == 1) {
        
        for (let i = 0; i < disableEnable.length; i++) {
    
            disableEnable[i].classList.add('d-none')
            
        }

        document.getElementById("table2").classList.add("d-none")

        document.getElementById("warningDivForDeleteDevice").classList.replace("d-none","d-block")

        indexOfArray = i
    
    }else if (n == 2) {
        
        for (let i = 0; i < disableEnable.length; i++) {
    
            disableEnable[i].classList.replace('d-none','d-block')            
        }

        document.getElementById("warningDivForDeleteDevice").classList.add("d-none")

        document.getElementById("table2").classList.replace("d-none","d-block")

    }
    
}

//----------------------------------------------------------------------------------

function deleteDevice(){

    secondList.splice(indexOfArray,1)

    setToLocalStorage('CRUD_List2',secondList)

    displayDevice(secondList,'tableData2',2)
    
    displayHiddenWarning(1000000,2)

}

//----------------------------------------------------------------------------------

function createReport(){

    document.getElementById("firstPage").classList.add("d-none")
    document.getElementById("secondPage").classList.add("d-none")
    document.getElementById("contact").classList.add("d-none")

    document.getElementById("reportPage").classList.replace("d-none","d-block")

    //----------

    document.getElementById("userName3").innerHTML = secondList[indexOfArray].name;
    
    document.getElementById("userPhoneNumber3").innerHTML = secondList[indexOfArray].phone;

    document.getElementById("dateOfEnter3").innerHTML = secondList[indexOfArray].addDate

    document.getElementById("timeOfEnter3").innerHTML = secondList[indexOfArray].addTime

    document.getElementById("dateOfDeliveryDate3").innerHTML = secondList[indexOfArray].deliveryDate

    document.getElementById("dateOfDeliveryTime3").innerHTML = secondList[indexOfArray].deliveryTime

    document.getElementById("deviceType3").innerHTML = secondList[indexOfArray].category;

    document.getElementById("deviceSN3").innerHTML = secondList[indexOfArray].pSN.toUpperCase();

    document.getElementById("description3").innerHTML = secondList[indexOfArray].description;

    document.getElementById("contentOfReportDiv3").innerHTML = secondList[indexOfArray].report
}

document.body.addEventListener("keyup",function(e){

    if (e.key == "Escape") {

        document.getElementById("reportPage").classList.add("d-none")
        document.getElementById("firstPage").classList.add("d-none")

        document.getElementById("secondPage").classList.replace("d-none","d-block")

    }
   
});





//         for (let i = 0; i < disableEnable.length; i++) {
    
//             disableEnable[i].classList.add('d-none')
            
//         }

// for (let i = 0; i < disableEnable.length; i++) {
    
//     disableEnable[i].classList.replace('d-none','d-block')
    
// }