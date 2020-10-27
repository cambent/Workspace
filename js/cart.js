var mensaje;
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(DESAFIANTE).then(function (resultObj) {
    if (resultObj.status === "ok") {

      productList = resultObj.data.articles;
      window.objects = resultObj.data.articles;
      let htmlCartInfo = "";

      for (let i = 0; i < productList.length; i++) {
        let articles = productList[i];

        htmlCartInfo += `
            
            <tr>
                <td><img src= ${articles.src} width="100px"></td>
                <td>${articles.name}</td>
                <td>${articles.currency}<span id="product-unitcost-${i}">${articles.unitCost}</span></td>
                <td onclick= "detectedchange(${i},${articles.unitCost})"><input id="productCount-${i}" class="form-control count-product" style="width:60px;" type="number" value="${articles.count}" min="1"></td>
                <td>${articles.currency}<span id="product-subtotal-${i}">${subtotalUnit(articles.unitCost, articles.count)}</span></td>
            </tr>        
            `
      }

      document.getElementById("showcartproducts").innerHTML = htmlCartInfo;
      document.getElementById("goldradio").addEventListener("click", updateAllSubTotal, false)
      document.getElementById("premiumradio").addEventListener("click", updateAllSubTotal, false)
      document.getElementById("standardradio").addEventListener("click", updateAllSubTotal, false)
      /*   document.getElementById("subtotal").innerHTML += "USD" + allSubTotal */
      /* document.getElementById("total").innerHTML += "USD" + cartTotalCost(array) */
      updateAllSubTotal()
    };

    function subtotalUnit(uno, dos) {
      return uno * dos
    }


    getJSONData(CART_BUY_URL).then(function (resultObj) {
      mensaje = (resultObj.data.msg)
    });

  });
  Tipodepago();
});


function detectedchange(i, cost) {
  var newvalue = document.getElementById("productCount-" + i).value;
  var newcost = newvalue * cost;
  document.getElementById("product-subtotal-" + i).innerHTML = newcost;
  updateAllSubTotal();
}

function updateAllSubTotal() {

  subtotal = 0
  for (var i in productList) {
    var art = productList[i]
    var product_cost = art.unitCost
    var product_amount = document.getElementById("productCount-" + i).value
    console.log("1")

    if (art.currency === "USD") {
      subtotal = subtotal + (product_cost * product_amount * 40)
    } else {
      subtotal = subtotal + (product_cost * product_amount)
    }
  }

  document.getElementById("subtotal-span").innerHTML = "$" + subtotal;
  calculateFinalTotal(subtotal)
}

function calculateFinalTotal(subtotal) {

  var added = 0

  if (document.getElementById("standardradio").checked) { added = 5 }
  if (document.getElementById("premiumradio").checked) { added = 7 }
  if (document.getElementById("goldradio").checked) { added = 8 }

  var extra = (added * subtotal) / 100
  var final = subtotal + extra

  document.getElementById("costoenvio").innerHTML = "$" + extra
  document.getElementById("final-total").innerHTML = "$" + final

}

document.getElementById("creditCardPaymentRadio").addEventListener("click", function () {
  document.getElementById("owner").disabled = false;
  document.getElementById("cardNumber").disabled = false;
  document.getElementById("cvv").disabled = false;
  document.getElementById("expiration-date").disabled = false;

  document.getElementById("cuentabancaria").disabled = true;
  document.getElementById("cuentabancaria").value = " ";


});

document.getElementById("bankPaymentRadio").addEventListener("click", function () {
  document.getElementById("cuentabancaria").disabled = false;

  document.getElementById("owner").disabled = true;
  document.getElementById("owner").value = " ";
  document.getElementById("cardNumber").disabled = true;
  document.getElementById("cardNumber").value = " ";
  document.getElementById("cvv").disabled = true;
  document.getElementById("owcvv").value = " ";
  document.getElementById("expiration-date").disabled = true;
  document.getElementById("expiration-date").value = " ";


});

function Tipodepago() {
  let radio = document.getElementsByClassName("ModoPago");
  for (let i = 0; i < radio.length; i++) {
    radio[i].addEventListener("click", function () {
      if (document.getElementById("creditCardPaymentRadio").checked) {

        document.getElementById("paymentType").innerHTML = "Tarjeta de crédito";
      }
      else {
        document.getElementById("paymentType").innerHTML = "Transferencia bancaria"
      }

    })

  }
}

function validar() {
  let tarjetadecredito = (document.getElementById("creditCardPaymentRadio"));
  let transferenciabancaria = (document.getElementById("bankPaymentRadio"));
  let numerocuentabancaria = (document.getElementById("cuentabancaria"));
  let titular = (document.getElementById("owner"));
  let numerotarjeta = (document.getElementById("cardNumber"));
  let cvv = (document.getElementById("cvv"));
  if (!(tarjetadecredito.checked) && !(transferenciabancaria.checked)) {
    alert("Debe seleccionar medio de pago")
  }
  else if (tarjetadecredito.checked) {
    if (titular.value.trim() == "") {
      alert("Debe ingresar Nombre")
    }
    else if (numerotarjeta.value.trim() == "") {
      alert("Debe ingresar numero de tarjeta")
    }
    else if (cvv.value.trim() == "") {
      alert("Debe ingresar CVV")
    }

  } else if (transferenciabancaria.checked) {
    if (numerocuentabancaria.value.trim() == "") {
      alert("Debe ingresar numero de cuenta")

    }
  }
  return true
}


function finalizarCompra() {
  if (validar() && validarenvio()) {
    alert(mensaje)
  }
}
