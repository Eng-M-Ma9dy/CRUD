//CRUD
//Create  Retrieve  Update  Delete
//----------------------------------------------------------------------------------

let customerName        = document.getElementById('customerName');
let customerPhone       = document.getElementById('customerPhone');

let productReceipt      = document.getElementById('productReceipt');
let productCategory     = document.getElementById('productCategory');
let productSN           = document.getElementById('productSN');
let productDescription  = document.getElementById('productDescription');
let productCost         = document.getElementById('productCost');
let addBTN              = document.getElementById('addBTN');
let updateBTN           = document.getElementById("updateBTN");

let allArBtn            = document.querySelectorAll(".arBTN");
let allEnBtn            = document.querySelectorAll(".enBTN");
let allText             = document.querySelectorAll(".textChangeDir")

let firstList           = [];
let secondList          = [];
let lArEn               = [];

let indexForUpdateProduct;
let indexForRemoveProduct;
let rowIndexForDelete;
let indexForWhatsApp;

//----------------------------------------------------------------------------------

function openLinkedIn(){

    window.open("https://www.linkedin.com/in/eng-m-ma9dy/","_blank")

}

//----------------------------------------------------------------------------------

if(localStorage.getItem('CRUD_List1') != null){

    firstList = JSON.parse(localStorage.getItem('CRUD_List1'));

    displayProduct(firstList,1);

}else{

    firstList = [];
    
}

//----------------------------------------------------------------------------------

if(localStorage.getItem('CRUD_List2') != null){

    secondList = JSON.parse(localStorage.getItem('CRUD_List2'));

    displayProduct(secondList,2);

}else{

    secondList = [];
}

//----------------------------------------------------------------------------------

if(localStorage.getItem('CRUD_ArEn') != null){

    lArEn = JSON.parse(localStorage.getItem('CRUD_ArEn'));

}else{

    lArEn = [];
}

//----------------------------------------------------------------------------------
    
function addProduct(){
    
    let dateTime = new Date();

    let getHours = dateTime.getHours();

    let getMinutes = dateTime.getMinutes();

    let getDay = dateTime.getDate()

    let getMonth = dateTime.getMonth() + 1

    let getYears = dateTime.getFullYear()

    let product ={
        receipt:     productReceipt.value,
        name:        customerName.value,
        phone:       customerPhone.value,
        category:    productCategory.value,
        pSN:         productSN.value,
        description: productDescription.value,
        cost:        productCost.value,
        addDate:     `${getDay}/${getMonth}/${getYears}`,
        addTime:     `${getHours} : ${getMinutes}`,
        info:        ""
    }

    firstList.push(product);

    setToLocalStorage(1)

    displayProduct(firstList,1);

    clearForm();

}

//----------------------------------------------------------------------------------

function setToLocalStorage(key){

    if (key == 1) {

        localStorage.setItem('CRUD_List1',JSON.stringify(firstList))

    }else if (key == 2) {

        localStorage.setItem('CRUD_List2',JSON.stringify(secondList))

    }else if (key == 3){

        localStorage.setItem('CRUD_ArEn',JSON.stringify(lArEn))
    }
}

//----------------------------------------------------------------------------------

function displayProduct(key,number){

    let rowContent = ``;

    if (number == 1) {
        
        for(let i = 0 ; i < key.length ; i++ ){

            rowContent +=
    
            `
            <tr>
                <th>${key[i].receipt          }</th>
                <th>${key[i].category         }</th>
                <th>${key[i].pSN.toUpperCase()}</th>
                <th>${key[i].cost             }</th>
                <th><button class="btn btn-outline-info"    onclick="openDescriptionDiv(${i},1)">Info</button></th>
                <th><button class="btn btn-outline-warning" onclick="getProductForUpdate(${i})">Update</button></th>
                <th><button class="btn btn-outline-danger"  onclick="openCloseReportDiv(${i},1)">Remove</button></th>
            </tr>
            `
        }
    
        document.getElementById("tableData1").innerHTML = rowContent
    
    }else if (number == 2) {
        
        for(let i = 0 ; i < key.length ; i++ ){

            rowContent +=
    
            `
            <tr>
                <th>${key[i].receipt          }</th>
                <th>${key[i].category         }</th>
                <th>${key[i].pSN.toUpperCase()}</th>
                <th>${key[i].cost             }</th>
                <th><button class="btn btn-outline-info"    onclick="openDescriptionDiv(${i},2)">Info</button></th>
                <th><button class="btn btn-outline-warning" onclick="restoreProduct(${i})">Restore</button></th>
                <th><button class="btn btn-outline-danger"  onclick="displayHiddenWarning(${i},1)">Delete</button></th>
            </tr>
            `
        }
    
        document.getElementById("tableData2").innerHTML = rowContent
    }



}

//----------------------------------------------------------------------------------

function clearForm(flag){
    
    productReceipt.value     = flag? flag.receipt:""
    customerName.value       = flag? flag.name:"" 
    customerPhone.value      = flag? flag.phone:""
    productCategory.value    = flag? flag.category:""
    productSN.value          = flag? flag.pSN:""
    productDescription.value = flag? flag.description:""
    productCost.value        = flag? flag.cost:""

}

//----------------------------------------------------------------------------------

function openDescriptionDiv(i,key){

    indexForWhatsApp = i

    let getDate;

    let getTime;

    let userName;

    let userPhone;

    let getType;

    let getSN;

    let desContent;

    if (key == 1) {

        document.getElementById("allInputs").classList.add("d-none")

        document.getElementById("table1").classList.add("d-none")

        document.getElementById("descriptionDiv1").classList.replace("d-none","d-block")
    
        getDate = firstList[i].addDate;
        document.getElementById("dateOfEnter1").innerHTML = getDate
    
        getTime = firstList[i].addTime;
        document.getElementById("timeOfEnter1").innerHTML = getTime
    
        userName = firstList[i].name;
        document.getElementById("userName1").innerHTML = userName;
    
        userPhone  = firstList[i].phone;
        document.getElementById("userPhoneNumber1").innerHTML = userPhone;
        document.getElementById("userPhoneIcon1").setAttribute(`href`,`tel:${firstList[i].phone}`);

        getType = firstList[i].category;
        document.getElementById("productType1").innerHTML = getType;

        getSN = firstList[i].pSN;
        document.getElementById("deviceSN1").innerHTML = getSN.toUpperCase();

        let oldInfoData = firstList[i].info;
        document.getElementById("oldInfo").innerHTML = oldInfoData;

        desContent = firstList[i].description;
        document.getElementById("contentOfDescriptionDiv1").innerHTML = desContent;
    

    }else if (key == 2) {

        document.getElementById("table2").classList.add("d-none")

        document.getElementById("descriptionDiv2").classList.replace("d-none","d-block")
    
        getDate = secondList[i].addDate;
        document.getElementById("dateOfEnter2").innerHTML = getDate
    
        getTime = secondList[i].addTime;
        document.getElementById("timeOfEnter2").innerHTML = getTime
    
        userName = secondList[i].name;
        document.getElementById("userName2").innerHTML = userName;
        
        userPhone  = secondList[i].phone;
        document.getElementById("userPhoneNumber2").innerHTML = userPhone;
        document.getElementById("userPhoneIcon2").setAttribute(`href`,`tel:${secondList[i].phone}`);
    
        getType = secondList[i].category;
        document.getElementById("productType2").innerHTML = getType;

        getSN = secondList[i].pSN;
        document.getElementById("deviceSN2").innerHTML = getSN.toUpperCase();

        desContent = secondList[i].description;
        document.getElementById("contentOfDescriptionDiv2").innerHTML = desContent;
    
        let getDateOut = secondList[i].deliveryDate;
        document.getElementById("dateOfOut2").innerHTML = getDateOut
    
        let getTimeOut = secondList[i].deliveryTime;
        document.getElementById("timeOfOut2").innerHTML = getTimeOut

        let getStatus = secondList[i].status;
        document.getElementById("productStatus2").innerHTML = getStatus

        let getReport = secondList[i].report;
        document.getElementById("contentOfReportDiv2").innerHTML = getReport
    }

}

//----------------------------------------------------------------------------------

function openUserWhatsapp(key){

    if (key == 1) {

        window.open(`https://wa.me/+2${firstList[indexForWhatsApp].phone}`,"_blank")

    }else if (key == 2) {

        window.open(`https://wa.me/+2${secondList[indexForWhatsApp].phone}`,"_blank")

    }

}

//----------------------------------------------------------------------------------

function closeDescriptionDiv(key){

    if (key == 1) {

        document.getElementById("descriptionDiv1").classList.add("d-none")

        document.getElementById("allInputs").classList.replace("d-none","d-block")

        document.getElementById("table1").classList.replace("d-none","d-block")
    
    }else if (key == 2) {

        document.getElementById("descriptionDiv2").classList.add("d-none")

        document.getElementById("table2").classList.replace("d-none","d-block")

    }
}

//----------------------------------------------------------------------------------

function getProductForUpdate(i){

    document.getElementById("table1").classList.add("d-none")

    clearForm(firstList[i])
    
    addBTN.classList.add("d-none")

    updateBTN.classList.replace("d-none","d-block")

    indexForUpdateProduct = i
}

//----------------------------------------------------------------------------------

function updateTheProduct(date,time){

    document.getElementById("table1").classList.replace("d-none","d-block")

    let product ={
        receipt:     productReceipt.value,
        name:        customerName.value,
        phone:       customerPhone.value,
        category:    productCategory.value,
        pSN:         productSN.value,
        description: productDescription.value,
        cost:        productCost.value,
        addDate:     date,
        addTime:     time
    }

    firstList.splice(indexForUpdateProduct,1,product);

    setToLocalStorage(1)

    displayProduct(firstList,1);

    clearForm();
}

//----------------------------------------------------------------------------------

function openCloseReportDiv(index,key){

    if (key == 1) {

        indexForRemoveProduct = index

        document.getElementById("allInputs").classList.add("d-none")

        document.getElementById("table1").classList.add("d-none")

        document.getElementById("reportDivForRemovedProduct").classList.replace("d-none","d-block")
    
    }else if (key == 2) {

        document.getElementById("reportDivForRemovedProduct").classList.add("d-none")

        document.getElementById("table1").classList.replace("d-none","d-block")

        document.getElementById("allInputs").classList.replace("d-none","d-block")

    }
}

//----------------------------------------------------------------------------------

function moveToDoneList(i,key){

    let dateTime = new Date();

    let getHours = dateTime.getHours();

    let getMinutes = dateTime.getMinutes();

    let getDay = dateTime.getDate()

    let getMonth = dateTime.getMonth() + 1

    let getYears = dateTime.getFullYear()

    let repair;

    if (key == 1) {
        
        repair = "Rejected"

    }else if (key == 2) {

        repair = "Repaired"

    }

    let product ={
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
        deliveryTime:   `${getHours} : ${getMinutes}`,
        report:         document.getElementById("technicalReport").value,
        status:         repair
    }

    secondList.push(product)

    setToLocalStorage(2)

    displayProduct(secondList,2)

    firstList.splice(i,1)

    displayProduct(firstList,1)

    setToLocalStorage(1)

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
    
        displayProduct(searchList1,1);

    }else if (n==2) {

        console.log(secondList);

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
    
        displayProduct(searchList2,2);

    }
}

//----------------------------------------------------------------------------------

if (lArEn[0] == 1){

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

    lArEn.splice(0,1,key);

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

        document.getElementById("firstPage").classList.add("d-none")

        document.getElementById("secondPage").classList.replace("d-none","d-block")

        document.getElementById("sDB2_2").value = ""
    
    }else if (key == 2) {
        
        document.getElementById("secondPage").classList.add("d-none")

        document.getElementById("firstPage").classList.replace("d-none","d-block")

        document.getElementById("sDB1_1").value = ""

    }
    

}

//----------------------------------------------------------------------------------

function restoreProduct(i){

    let dateTime = new Date();

    let getHours = dateTime.getHours();

    let getMinutes = dateTime.getMinutes();

    let getDay = dateTime.getDate()

    let getMonth = dateTime.getMonth() + 1

    let getYears = dateTime.getFullYear()

    let product ={
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
------------------------
`,

        cost:        0,
        addDate:     `${getDay}/${getMonth}/${getYears}`,
        addTime:     `${getHours} : ${getMinutes}`
    }

    firstList.push(product)

    setToLocalStorage(1)

    displayProduct(firstList,1)

    secondList.splice(i,1)

    displayProduct(secondList,2)

    setToLocalStorage(2)

}

//----------------------------------------------------------------------------------

function displayHiddenWarning(i,n){

    if (n == 1) {
        
        document.getElementById("table2").classList.add("d-none")

        document.getElementById("warningDivForDeleteProduct").classList.replace("d-none","d-block")

        rowIndexForDelete = i
    
    }else if (n == 2) {
        
        document.getElementById("warningDivForDeleteProduct").classList.add("d-none")

        document.getElementById("table2").classList.replace("d-none","d-block")

    }
    
}

//----------------------------------------------------------------------------------

function deleteProduct(){

    secondList.splice(rowIndexForDelete,1)

    displayProduct(secondList,2)

    setToLocalStorage(2)
    
    displayHiddenWarning(1000,2)


}

//----------------------------------------------------------------------------------

function createReport(){

    document.getElementById("firstPage").classList.add("d-none")
    document.getElementById("secondPage").classList.add("d-none")

    document.getElementById("reportPage").classList.replace("d-none","d-block")

    //----------

    let userName = secondList[indexForWhatsApp].name;
    document.getElementById("userName3").innerHTML = userName;
    
    let userPhone  = secondList[indexForWhatsApp].phone;
    document.getElementById("userPhoneNumber3").innerHTML = userPhone;

    let getDate = secondList[indexForWhatsApp].addDate;
    document.getElementById("dateOfEnter3").innerHTML = getDate

    let getTime = secondList[indexForWhatsApp].addTime;
    document.getElementById("timeOfEnter3").innerHTML = getTime

    let getType = secondList[indexForWhatsApp].category;
    document.getElementById("productType3").innerHTML = getType;

    let getSN = secondList[indexForWhatsApp].pSN;
    document.getElementById("deviceSN3").innerHTML = getSN.toUpperCase();

    desContent = secondList[indexForWhatsApp].description;
    document.getElementById("contentOfDescriptionDiv2").innerHTML = desContent;

    let getDateOut = secondList[indexForWhatsApp].deliveryDate;
    document.getElementById("dateOfOut2").innerHTML = getDateOut

    let getReport = secondList[indexForWhatsApp].report;
    document.getElementById("contentOfReportDiv3").innerHTML = getReport
}

document.body.addEventListener("keyup",function(e){



    if (e.key == "Escape") {

        document.getElementById("reportPage").classList.add("d-none")
        document.getElementById("firstPage").classList.add("d-none")
    
        document.getElementById("secondPage").classList.replace("d-none","d-block")
        
    }
   
 });

