// get elements -------------------------------------
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let totalOutput = document.getElementById("total-output");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("btn-create");
let tbody = document.getElementById("tbody");
let captionTab = document.getElementById("captionTab");
let deleteAll = document.getElementById("deleteAll");

console.log(
  title,
  price,
  taxes,
  totalOutput,
  ads,
  discount,
  total,
  count,
  category,
  create
);

// declare variable -------------------------------------
let products = [];
let state = -1;

// calc price -------------------------------------
function calcPrice() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    totalOutput.innerHTML = result;
  } else {
    totalOutput.innerHTML = "";
  }
}

// crate product -------------------------------------
create.onclick = () => {

    let newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: totalOutput.innerHTML,
      category: category.value,
      count: count.value,
    };

    if (state == -1) {
      if (newPro.count) {
        for (let i = 0; i < newPro.count; i++) {
          products.push(newPro);
        }
      }
    } else {
      products[state] = newPro;
      state = -1;
      create.innerHTML = "create";
      count.style.display="block";
    }

    clearData();
    showProduct();

};

// clear inputs after click btn -------------------------------------
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  totalOutput.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read data from array and show in table -------------------------------------
function showProduct() {
  if (products.length) {
    deleteAll.style.display = "inline";
  }

  captionTab.innerHTML = `Number of Products: ${products.length}`;

  let items = "";
  for (let i = 0; i < products.length; i++) {
    items += `<tr>
                <td>${i + 1}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button class="update" onclick="updateItem(${i})">update</button></td>
                <td><button class="Delete" onclick="deleteItem(${i})">Delete</button></td>
              </tr>`;
  }
  tbody.innerHTML = items;
}

// delete items from Array -------------------------------------
function deleteItem(itemNum) {
  products.splice(itemNum, 1);
  showProduct();
}
deleteAll.onclick = () => {
  products.splice(0, products.length);
  showProduct();
};

// update items  -------------------------------------
function updateItem(itemNum) {
  create.innerHTML = "update";
  state = itemNum;
  title.value = products[itemNum].title;
  price.value = products[itemNum].price;
  taxes.value = products[itemNum].taxes;
  ads.value = products[itemNum].ads;
  discount.value = products[itemNum].discount;
  totalOutput.innerHTML = `${products[itemNum].total}`;
  count.style.display = "none";
  category.value = products[itemNum].category;
}

// call functions -------------------------------------
showProduct();
