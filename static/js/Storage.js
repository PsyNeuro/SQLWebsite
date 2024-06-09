// Dynamically populate the table with shopping list items.
//Step below can be done via PHP and AJAX, too.

// key2 = localStorage.key(0)
// console.log(key2)


if (localStorage.getItem("Red Shirt")) {

    console.log("Red Shirt found");
    const value123 = localStorage.getItem("Red Shirt")
    console.log(value123)

} else {

    console.log("Red Shirt NOT found")

}


const person1 = {
    name:"John",
    age:30,
    city:"New York"
};

const person11 = JSON.stringify(person1);
localStorage.setItem("Sheep Skin Jumper",person11)


function doShowAll() {
        var key = "";
        var list = "<tr><th>Item</th><th>Quantity</th></tr>\n";
        var i = 0;
        //For a more advanced feature, you can set a cap on max items in the cart.
        for (i = 0; i <= localStorage.length-1; i++) {
            key = localStorage.key(i);
            list += "<tr><td>" + key + "</td>\n<td>"
                    + localStorage.getItem(key) + "</td></tr>\n";
        }         
        //If no item exists in the cart.
        if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
            list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
        }
        //Bind the data to HTML table.
        //You can use jQuery, too.
        document.getElementById('list').innerHTML = list;

    } 


function SaveItem() {

    var name = document.forms.ShoppingList.name.value;
    var data = document.forms.ShoppingList.data.value
    localStorage.setItem(name,data);
    doShowAll()

}

function ClearAll() {

    localStorage.clear();
    doShowAll();

}

function RemoveItem() {

    var name = document.forms.ShoppingList.name.value;
    document.forms.ShoppingList.data.value = localStorage.removeItem(name);
    doShowAll();

}

function ModifyItem() {

    var name = document.forms.ShoppingList.name.value;
    var data = document.forms.ShoppingList.data.value

    if (localStorage.getItem(name)){

        localStorage.setItem(name,data)
        doShowAll()

    }

}


console.log("Storage.js loaded succesfully.")