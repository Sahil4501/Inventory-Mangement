
/*---start global variables---*/
var orderBtn = document.querySelector(".pl-order-btn");
var _id = document.getElementById("id");
var _itemName = document.getElementById("item-name");
var _itemType = document.getElementById("item-type");
var _quantity = document.getElementById("quantity");
var _department = document.getElementById("department");
var orderData = [];
var orderForm = document.getElementById("order-form");
var orderTableData = document.getElementById("order-data");
var allInput = orderForm.querySelectorAll("INPUT");
/*---end global variables---*/

document.querySelector(".order-btn").addEventListener("click",function(){
    document.querySelector(".order-model").classList.add("active");
});
document.querySelector(".close-order-icon").addEventListener("click",function(){
    document.querySelector(".order-model").classList.remove("active");
});

/*---add item ---*/
orderBtn.onclick =function(e){
    e.preventDefault();
    addData();
    getorderDatafromLocal();
    orderForm.reset();
    document.querySelector(".close-order-icon").click();
};

if(localStorage.getItem("orderData")!=null){
    orderData = JSON.parse(localStorage.getItem("orderData"));
}

function addData(){
    orderData.push({
        id: _id.value,
        itemName: _itemName.value,
        itemType: _itemType.value,
        department: _department.value,
        quantity: _quantity.value,
    });

    var addString = JSON.stringify(orderData);
    localStorage.setItem("orderData", addString);
}

const getorderDatafromLocal = () => {
    orderTableData.innerHTML = "";
    orderData.forEach((data,index)=>{
        orderTableData.innerHTML += `
            <tr index='${index}'>
                              <td>${index+1}</td>
                              <td>${data.id}</td>
                              <td>${data.itemName}</td>
                              <td>${data.itemType}</td>
                              <td>${data.department}</td>
                              <td>${data.quantity}</td>
                              <td>
                              <button class="rm-btn del-entry-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                              fill="white" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 
                                3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 
                                0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 
                                8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                              </svg></button></td>
                            </tr>
        `;
    });

    /*---Delete Entry---*/
    var allDelBtn = document.querySelectorAll(".del-entry-btn");
    for(var i=0;i<allDelBtn.length;i++){
        allDelBtn[i].addEventListener("click",function(){
            orderData.splice(this.parentElement.parentElement.getAttribute("index"),1);
            localStorage.setItem("orderData",JSON.stringify(orderData));
            this.parentElement.parentElement.remove();
        });
    }

}
getorderDatafromLocal();

localStorage.setItem('Tslength', orderData.length);