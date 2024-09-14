

/*---start global variables---*/
var addBtn = document.querySelector("#add-input-item");
var updateBtn = document.querySelector("#update-item");
var _id = document.getElementById("id");
var _itemName = document.getElementById("item-name");
var _itemType = document.getElementById("item-type");
var _quantity = document.getElementById("quantity");
var itemData = [];
var addForm = document.getElementById("add-form");
var tableData = document.getElementById("table-data");
var allInput = addForm.querySelectorAll("INPUT");
var count = 0;
/*---end global variables---*/


/*--Add Inventory Item--*/

document.querySelector("#add-btn").addEventListener("click",function(){
    document.querySelector(".model").classList.add("active");
});
document.querySelector(".close-icon").addEventListener("click",function(){
    document.querySelector(".model").classList.remove("active");
    for(var i=0;i<allInput.length;i++){
        allInput[i].value = "";
    }
});


/*---add item ---*/
addBtn.onclick =function(e){
    e.preventDefault();
    addData();
    getDatafromLocal();
    addForm.reset();
    document.querySelector(".close-icon").click();
};

if(localStorage.getItem("itemData")!=null){
    itemData = JSON.parse(localStorage.getItem("itemData"));
}

function addData(){
    itemData.push({
        id: _id.value,
        itemName: _itemName.value,
        itemType: _itemType.value,
        quantity: _quantity.value,
    });

    var addString = JSON.stringify(itemData);
    localStorage.setItem("itemData", addString);
}

const getDatafromLocal = () => {
    tableData.innerHTML = "";
    itemData.forEach((data,index)=>{
        tableData.innerHTML += `
            <tr index='${index}'>
                              <td>${index+1}</td>
                              <td>${data.id}</td>
                              <td>${data.itemName}</td>
                              <td>${data.itemType}</td>
                              <td>${data.quantity}</td>
                              <td><button class="edit-entry-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 
                                2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 
                                .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                              </svg></button>
                              <button class="rm-btn del-entry-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5
                                 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 
                                 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                              </svg></button></td>
                            </tr>
        `;
        count = Number(count) + Number(data.quantity);
    });

    /*---Delete Entry---*/
    var allDelBtn = document.querySelectorAll(".del-entry-btn");
    for(var i=0;i<allDelBtn.length;i++){
        allDelBtn[i].addEventListener("click",function(){
            itemData.splice(this.parentElement.parentElement.getAttribute("index"),1);
            localStorage.setItem("itemData",JSON.stringify(itemData));
            this.parentElement.parentElement.remove();
        });
    }

    /*---Update Entry---*/
    var allEdit = document.querySelectorAll(".edit-entry-btn");
    for(var i=0;i<allEdit.length;i++){
        allEdit[i].addEventListener("click",function(){
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var id = td[1].innerHTML;
            var name = td[2].innerHTML;
            var type = td[3].innerHTML;
            var qty = td[4].innerHTML;
            document.querySelector("#add-btn").click();
            addBtn.disabled = true;
            updateBtn.disabled = false;
            _id.value = id;
            _itemName.value = name;
            _itemType.value = type;
            _quantity.value = qty;
            updateBtn.onclick = function(e){
                e.preventDefault;
                itemData[index] = {
                    id: _id.value,
                    itemName: _itemName.value,
                    itemType: _itemType.value,
                    quantity: _quantity.value,
                }
                localStorage.setItem("itemData", JSON.stringify(itemData));
            }
        });
    }
}
getDatafromLocal();


localStorage.setItem('TOlength', count);