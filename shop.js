if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}
// Checks for commands on page load
function ready() {    
    var input_change = document.getElementsByClassName("input-box")
    for (var i = 0; i < input_change.length; i++) {
        var input = input_change[i]
        input.addEventListener("change", update_total)
    }
    var add_to_basket = document.getElementsByClassName("list-item-button")
    for (var i = 0; i < add_to_basket.length; i++) {
        var basket_button = add_to_basket[i]
        basket_button.addEventListener("click", add_item_to_basket)
    }
    var clear_all = document.getElementsByClassName("clear-button")[0]
    clear_all.addEventListener("click", clear_basket)

    var check_out = document.getElementsByClassName("checkout")[0]
    check_out.addEventListener("click", checkout)
}
// Sets all input boxes within the basket to 0
function clear_basket() {
    var input_boxes = document.getElementsByClassName("input-box")
    for (var i = 0; i < input_boxes.length; i++) {
        input_boxes[i].value = 0
    }
    update_total()
}
// Removes every item from the basket
function empty_basket() {
    var basket_items = document.getElementsByClassName("basket-items")[0]
    while (basket_items.hasChildNodes()) {
        basket_items.removeChild(basket_items.firstChild)
    update_total()
    }
}
// Sends message to declare successful transaction
function checkout() {
    alert("Your order has been placed.")
    empty_basket()
}
// Adds the item into the basket if it isn't already there
function add_item_to_basket(event) {
    var list_item_row = event.target.parentElement
    var list_item_name = list_item_row.getElementsByClassName("list-item-name")[0].innerText
    var list_item_price = list_item_row.getElementsByClassName("list-item-price")[0].innerText
    
    var basket_item = document.createElement("div")
    basket_item.classList.add("basket-item")
    var basket_items = document.getElementsByClassName("basket-items")[0]

    var basket_item_names = basket_items.getElementsByClassName("basket-item-name")
    for (var i = 0; i < basket_item_names.length; i++) {
        var item_name = basket_item_names[i]
        if (item_name.innerText == list_item_name) {
            alert("That item is already in the shopping basket")
            return
        }
    }

    basket_item_details = `
                    <span class="basket-item-name">${list_item_name}</span>
                        <span class="basket-item-input">
                            <input type="number" value="1" class="input-box">
                        </span>
                    <span class="basket-item-price">${list_item_price}</span>
                    </span>`
    basket_item.innerHTML = basket_item_details
    basket_items.append(basket_item)
    ready()
    update_total()
}
// Updates the total price
function update_total() {
    var basket_items = document.getElementsByClassName("basket-items")[0]
    var basket_rows = basket_items.getElementsByClassName("basket-item")
    var total = 0
    for (var i = 0; i < basket_rows.length; i++) {
        var basket_item = basket_rows[i]
        var basket_item_price = basket_item.getElementsByClassName("basket-item-price")[0]
        var basket_item_input = basket_item.getElementsByClassName("input-box")[0]
        var price = parseFloat(basket_item_price.innerText.replace("£", ""))
        var input = basket_item_input.value
        total = total + (price * input)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("total-price")[0].innerText = "£" + total
}