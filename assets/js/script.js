"use strict";
/*
    Task 15
        created by Gwinyai Chakonda
*/

$(document).ready(function () {
  //============= Assignments ===============

  // Products list
  const products = [
    {
      id: 0,
      name: "Cherry Ripple",
      price: 72.0,
      img: "../assets/images/cupcake1.jpg",
      description: "The all new cherry ripple is nothing shirt of sensational",
    },
    {
      id: 1,
      name: "Choco Vanilla",
      price: 55.0,
      img: "../assets/images/cupcake3.jpg",
      description: "The choco vanilla, a brilliant kickstart to the day",
    },
    {
      id: 2,
      name: "Yellow Floss",
      price: 45.0,
      img: "../assets/images/cupcake2.jpg",
      description: "The yellow floss, full of energy and sweetness",
    },
    {
      id: 3,
      name: "Rainbow Rise",
      price: 68.0,
      img: "../assets/images/cupcake4.jpg",
      description: "Simply delightful",
    },
    {
      id: 4,
      name: "Caramel",
      price: 72.0,
      img: "../assets/images/cupcake6-sm.jpg",
      description: "The caramel, made with no milk or peanuts",
    },
    {
      id: 5,
      name: "Red Velvet",
      price: 23.0,
      img: "../assets/images/cupcake5-xs.jpg",
      description: "A lovely gift, for all occasions",
    },
  ];
  // Coupon list
  const coupons = ["get20", "get25", "get50"];

  // Loads products to Catalogue.html page
  const loadProducts = () => {
    let html = "";
    products.forEach((product) => {
      html += ` 
      <div class="col-md-6 col-lg-4">
        <article class="shadow-lg mb-4 pointer position-relative" data-id=${product.id}>
            <div
              class="h-max pointer"
              data-toggle="modal"
              data-target="#cupcakeModal"
            >
              <img
                class="img-thumbnail img-expand"
                src="${product.img}"
                alt="cupcake"
              />
            </div>

            <div class="px-3 py-5">
              <details class="mb-5 pb-4">
                <summary>
                  <h4 class="inline-block">${product.name}</h4>
                </summary>
                <p>
                  ${product.description}
                </p>
                <p>R${product.price}</p>
              </details>

              <button class="btn btn-dark button buyNow">Add to cart</button>
              <span class="btn bg-pink price text-white">R${product.price}</span>
            </div>
          </article>
        </div>`;
    });
    $("#catalogue").html(html);
  };

  //========= Shopping Cart =================

  // Updates cart count
  const updateCount = () => {
    if (window.localStorage.getItem("cupcakeStore")) {
      let cart = JSON.parse(window.localStorage.getItem("cupcakeStore"));
      $("#cartCount").text(cart.length);
    }
  };

  // Adds products to cart
  $(document).on("click", ".buyNow", function () {
    let id = $(this).closest("article").attr("data-id");
    let exists = addCart(Number(id));
    if (exists) {
      alert(`Cupcake already added to cart. Total R${quickTotal().toFixed(2)}`);
    } else {
      alert(`Total R${quickTotal().toFixed(2)} `);
    }
  });

  // Adds frontpage product to cart
  $("#ripple").click(function () {
    let id = $(this).attr("data-id");
    let exists = addCart(Number(id));
    if (exists) {
      alert(`Cupcake already added to cart. Total R${quickTotal().toFixed(2)}`);
    } else {
      alert(`Total R${quickTotal().toFixed(2)} `);
    }
  });

  $(document).on("click", ".deliveryOptions", function () {
    let delivery = $(this).attr("data-delivery");
    if (delivery === "express") {
      addDelivery(90.0);
    } else if (delivery === "standard") {
      addDelivery(70.0);
    } else if (delivery === "economy") {
      addDelivery(50.0);
    }
  });

  $("#delivery").click(function () {
    $("#deliveryOptions").removeClass("d-none");
  });

  $("#collection").click(function () {
    $("#deliveryOptions").addClass("d-none");
    $("#dcost").addClass("d-none");
    addDelivery(0);
  });

  $("#confirmOrder").click(function () {
    confirmOrder();
  });

  // Adds coupon event listener
  $("#addCoupon").click(function (evt) {
    evt.preventDefault();
    let coupon = $(this).prev("input").val();
    addCoupon(coupon);
  });

  //========= Shopping Cart =================

  $("#drive").click(function () {
    $("#van").css("transform", "translate(950px,0)");
  });

  $("#toggle").click(function () {
    $(".dollars").fadeToggle(1200);
  });

  $("#send").click(function (evt) {
    evt.preventDefault();
    $("#contactForm").slideUp(2000).slideDown(2000).fadeOut(2000).fadeIn(2000);
  });

  // Add homepage header background animation
  const bgAnimate = () => {
    $("#top").addClass("animate-bg");
  };

  // Add language drop-down menu
  $("#lang").html(`<ul class='nav'><li>
    <div class='item'>Language</div>
        <ul class='subItems'>
          <li><a href='#'>Afrikaans</a></li>
          <li><a href='#'>Xhosa</a></li>
          <li><a href='#'>Zulu</a></li>
        </ul>
      </li>
    </ul>`);

  $(".item").mouseenter(function () {
    $(this).next().slideToggle("slow");
  });

  $(".subItems").mouseleave(function () {
    $(this).slideUp("slow");
  });

  // Adds coupon
  const addCoupon = (coupon) => {
    let currentTotal = parseFloat($("#grandTotal").text().trim().substring(1));
    let index = coupons.findIndex((code) => code === coupon);
    switch (index) {
      case -1:
        $("i:not(:first-of-type)").addClass("d-none");
        $("i:first-of-type").removeClass("d-none");
        break;
      case 0:
        $("#grandTotal").text(`R ${(0.2 * currentTotal).toFixed(2)}`);
        $("i:not(:first-of-type)").removeClass("d-none");
        $("i:first-of-type").addClass("d-none");
        break;
      case 1:
        $("#grandTotal").text(`R ${(0.25 * currentTotal).toFixed(2)}`);
        $("i:first-of-type").addClass("d-none");
        $("i:not(:first-of-type)").removeClass("d-none");
        break;
      case 2:
        $("#grandTotal").text(`R ${(0.5 * currentTotal).toFixed(2)}`);
        $("i:first-of-type").addClass("d-none");
        $("i:not(:first-of-type)").removeClass("d-none");
        break;
      default:
        break;
    }
  };

  // Adds delivery costs to invoice
  const addDelivery = (price) => {
    if (window.localStorage.getItem("cupcakeStore")) {
      let delivery = { name: "delivery", price };
      let cart = JSON.parse(window.localStorage.getItem("cupcakeStore"));
      if (cart.length > 0) {
        cart.findIndex((product) => product.name === "delivery") === -1
          ? cart.push(delivery)
          : (cart[
              cart.findIndex((product) => product.name === "delivery")
            ].price = price);
        window.localStorage.setItem("cupcakeStore", JSON.stringify(cart));
        $("#deliveryCost").removeClass("d-none");
        $("#dcost").text(price.toFixed(2));

        displayCart(readCart());
      }
    }
  };

  // Remove item from cart
  $(document).on("click", ".bin", function () {
    let id = $(this).closest("td").attr("data-id");
    let confirmDelete = confirm("Are you sure you want to remove this item");

    if (confirmDelete) {
      deleteCart(Number(id));
      updateCount();
      displayCart(readCart());
      removeConfirm();
    }
  });

  // Confirm Order
  let confirmOrder = () => {
    deleteAll();
    displayCart(readCart());
    $("i:not(:first-of-type)").addClass("d-none");
    $("i:first-of-type").addClass("d-none");
    $("#addCoupon").prev("input").val("");
    updateCount();
    removeConfirm();
    let ref = generateRef();
    setTimeout(() => {
      alert(`Your order was successful
      REF: ${ref}`);
    }, 3000);
  };

  // Remove confirm order button
  let removeConfirm = () => {
    if (window.localStorage.getItem("cupcakeStore")) {
      let cart = JSON.parse(window.localStorage.getItem("cupcakeStore"));
      cart.length > 0
        ? $("#confirmOrder").removeClass("d-none")
        : $("#confirmOrder").addClass("d-none");
    }
  };

  // Generates a reference number
  const generateRef = () => {
    let randomNumber1 = Math.floor(Math.random() * 1000 + 1);
    let randomNumber2 = Math.floor(Math.random() * 10000 + 1);
    let randomNumber3 = Math.floor(Math.random() * 100000 + 1);
    return `AC22-${randomNumber1}-${randomNumber2}-${randomNumber3}`;
  };

  //========= Local Storage ===========================

  // Initialize local storage
  const createStorage = () => {
    if (window.localStorage.getItem("cupcakeStore")) {
      return;
    } else {
      let cart = [];
      window.localStorage.setItem("cupcakeStore", JSON.stringify(cart));
    }
  };

  // 1.1 CRUD functions

  const readCart = () => {
    if (window.localStorage.getItem("cupcakeStore")) {
      return JSON.parse(window.localStorage.getItem("cupcakeStore"));
    }
    return [];
  };

  const displayCart = (arr) => {
    let html = "";
    arr.forEach((cartItem, index) => {
      html += ` <tr>
        <th scope="row">${index + 1}</th>
        <td>${cartItem.name}</td>
        <td>1</td>
        <td>R ${cartItem.price}.00</td>
        <td data-id=${
          cartItem.id
        }><svg class="w-6 h-6 pointer bin" fill="none" stroke="#ff0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </td>
      </tr>`;
    }, 0);
    $("#shoppingCart").html(html);

    if (arr.length > 0) {
      let sum = 0;
      arr.forEach((item) => {
        sum += item.price;
      });
      let vat = 0.15 * sum;
      let grandTotal = (vat + sum).toFixed(2);
      $("#vat").text(`R ${vat.toFixed(2)}`);
      $("#grandTotal").text(`R ${grandTotal}`);
    } else {
      $("#vat").text("0");
      $("#grandTotal").text("0");
    }
  };

  const addCart = (productId) => {
    if (window.localStorage.getItem("cupcakeStore")) {
      let cart = JSON.parse(window.localStorage.getItem("cupcakeStore"));
      let alreadyAdded = false;
      cart.findIndex((product) => product.id === productId) === -1
        ? cart.push(products[productId])
        : (alreadyAdded = true);
      window.localStorage.setItem("cupcakeStore", JSON.stringify(cart));
      updateCount();
      return alreadyAdded;
    }
  };

  const quickTotal = () => {
    if (window.localStorage.getItem("cupcakeStore")) {
      let cart = JSON.parse(window.localStorage.getItem("cupcakeStore"));
      let sum = 0;
      cart.forEach((item) => {
        sum += item.price;
      });
      return sum;
    }

    return 0;
  };

  const deleteCart = (productId) => {
    if (window.localStorage.getItem("cupcakeStore")) {
      let cart = JSON.parse(window.localStorage.getItem("cupcakeStore"));
      cart.splice(
        cart.findIndex((product) => product.id === productId),
        1
      );
      window.localStorage.setItem("cupcakeStore", JSON.stringify(cart));
    }
  };

  const deleteAll = () => {
    if (window.localStorage.getItem("cupcakeStore")) {
      window.localStorage.setItem("cupcakeStore", JSON.stringify([]));
    }
  };

  //========== Executes on page load =========
  createStorage();
  loadProducts();
  displayCart(readCart());
  updateCount();
  removeConfirm();

  // waits for 8 after page load then executes
  setTimeout(() => {
    bgAnimate();
  }, 8000);
});
