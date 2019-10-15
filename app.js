var price_total = document.getElementById("price-total");
var price_expense_total = document.getElementById("price-expense-total");
var price_income_total = document.getElementById("price-income-total");
var income_ul = document.getElementById("income-ul");
var expense_ul = document.getElementById("expense-ul");
var expense_percent = document.getElementById("expense-percent");
var income_value = 0,expense_value = 0;

window.addEventListener('keyup',function(event){
    if(event.keyCode==13)
        makeit();
});

setMonth();

function setMonth(){
    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    var months = ['January','Febraury','March','April','May','June','July','August','September','October','November','December'];
    var monthID = document.getElementById("month");
    monthID.innerHTML = months[month] + " " + year;
}

getDatafromLocalStorage();
function makeit(){
    var name = document.getElementById("money-name-container").value;
    var value = document.getElementById("money-value-container").value;
    if(name != "" && value !=""){
        var list = document.createElement("li");
        var span = document.createElement("span");
        var selector = document.getElementById("select-option");
        var selection = selector.options[selector.selectedIndex].value;
        var priceNode,nameNode;
        nameNode = document.createTextNode(name);
        var clear = document.createElement("span");
        clear.className = "clear";
        var clearNode = document.createTextNode("Clear");
        clear.appendChild(clearNode);
        clear.onclick = abcd;    
        list.id= "new-li";
        if(selection=="add"){
            income_value += Number(value);
            span.id = "price-income";
            priceNode = document.createTextNode("+ " + value);
            span.appendChild(priceNode);
            list.appendChild(nameNode);
            list.appendChild(clear);
            list.appendChild(span);
            income_ul.appendChild(list);
            sendToLocalStorage("income",name,value);
        }else{
            expense_value += Number(value);
            span.id = "price-expense";
            priceNode = document.createTextNode("- " + value);
            span.appendChild(priceNode);
            list.appendChild(nameNode);
            list.appendChild(clear);
            list.appendChild(span);
            expense_ul.appendChild(list);
            sendToLocalStorage("expense",name,value,false);
        }
        clearAll();
        var total = income_value - expense_value;
        var percent = (expense_value * 100)/income_value;
        if(income_value==0){
            percent=0;
        }
        expense_percent.innerHTML = Math.round(percent) + "%";
        if(total > 0)
            price_total.innerHTML = "+ " + total;
        else
            price_total.innerHTML = "- " + total;
        price_income_total.innerHTML = "+ "+income_value;
        price_expense_total.innerHTML = "- "+expense_value;
    }else{
        alert("Enter proper values.");
    }
    document.getElementById("money-name-container").innerHTML = "";
    document.getElementById("money-value-container").innerHTML = "";
    clearbtn = document.getElementById("clear");
}

function makeList(option, name,value    ){
    var list = document.createElement("li");
    var span = document.createElement("span");
    var clear = document.createElement("span");
    clear.className = "clear";
    var clearNode = document.createTextNode("Clear");
    clear.appendChild(clearNode);
    clear.onclick = abcd;
    var priceNode,nameNode;
    nameNode = document.createTextNode(name);
    if(option=="income"){
        income_value += Number(value);
        span.id = "price-income";
        priceNode = document.createTextNode("+ " + value);
        span.appendChild(priceNode);
        list.appendChild(nameNode);
        list.appendChild(clear);
        list.appendChild(span);
        income_ul.appendChild(list);
    }else{
        expense_value += Number(value);
        span.id = "price-expense";
        priceNode = document.createTextNode("- " + value);
        span.appendChild(priceNode);
        list.appendChild(nameNode);
        list.appendChild(clear);
        list.appendChild(span);
        expense_ul.appendChild(list);
    }
    var total = income_value - expense_value;
    var percent = (expense_value * 100)/income_value;
        if(income_value==0){
            percent=0;
        }
    expense_percent.innerHTML = Math.round(percent) + "%";
    if(total > 0)
        price_total.innerHTML = "+ " + total;
    else
        price_total.innerHTML = "- " + total;
    price_income_total.innerHTML = "+ "+income_value;
    price_expense_total.innerHTML = "- "+expense_value;
    clearbtn = document.getElementById("clear");
}

function clearAll(){
    price_expense_total.innerHTML = "";
    price_income_total.innerHTML = "";
    price_total.innerHTML = "";
}

function sendToLocalStorage(option, name, value,tick){
    var JSONdata = {"option":option,"name":name,"value":value, "tick":tick};
    localStorage.setItem(makeid(4),JSON.stringify(JSONdata));
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function abcd(){
    var parent = this.parentElement.innerHTML;
    var keys = parent.substr(0, parent.indexOf('<span'));
    var len = keys.substr(keys.indexOf('>')+1,keys.length);
    console.log(parent);
    for(var i=0; i<localStorage.length; i++){
        var key = localStorage.key(i);
        if(localStorage!=null){
            var local = localStorage.getItem(key);
            var JSONvalue = JSON.parse(local);
            var value = JSONvalue.value;
            var name = JSONvalue.name;
            var option = JSONvalue.option;
            if(keys==name){
                localStorage.removeItem(key);
                location.reload();
            }
        }
    }
}

 function getDatafromLocalStorage(){
    for(var i=0; i<localStorage.length; i++){
        var key = localStorage.key(i);
        if(localStorage!=null){
            var local = localStorage.getItem(key);
            var JSONvalue = JSON.parse(local);
            var value = JSONvalue.value;
            var name = JSONvalue.name;
            var option = JSONvalue.option;
            var tick = JSONvalue.tick;
            makeList(option,name,value);
        }
    }
 }

 function onTick(){
    var parent = this.parentElement.innerHTML;
    var keys = parent.substr(0, parent.indexOf('<span'));
    var len = keys.substr(keys.indexOf('>')+1,keys.length);
    for(var i=0; i<localStorage.length; i++){
        var key = localStorage.key(i);
        if(localStorage!=null){
            var local = localStorage.getItem(key);
            var JSONvalue = JSON.parse(local);
            var value = JSONvalue.value;
            var name = JSONvalue.name;
            var option = JSONvalue.option;
            if(len==name){
                localStorage.removeItem(key);
                sendToLocalStorage(option,name,value,true);
                location.reload;
            }
        }
    }

 }
