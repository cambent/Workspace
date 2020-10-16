document.addEventListener("DOMContentLoaded", function(){
    getJSONData(DESAFIANTE).then(function(resultObj) { 
        if (resultObj.status === "ok") {
   
            productList = resultObj.data.articles;
            window.objects = resultObj.data.articles;
            let htmlCartInfo = "";

            for (let i = 0; i <productList.length; i++ ) {
                let articles = productList[i];
        
                htmlCartInfo +=`
            
            <tr>
                <td><img src= ${articles.src} width="100px"></td>
                <td>${articles.name}</td>
                <td>${articles.currency}<span id="product-unitcost-${i}">${articles.unitCost}</span></td>
                <td onclick= "detectedchange(${i},${articles.unitCost})"><input id="productCount-${i}" class="form-control count-product" style="width:60px;" type="number" value="${articles.count}" min="1"></td>
                <td>${articles.currency}<span id="product-subtotal-${i}">${subtotalUnit(articles.unitCost,articles.count)}</span></td>
            </tr>        
            `
        } 

        document.getElementById("showcartproducts").innerHTML = htmlCartInfo;
        document.getElementById("goldradio").addEventListener("click", updateAllSubTotal, false)
        document.getElementById("premiumradio").addEventListener("click", updateAllSubTotal, false)
        document.getElementById("standardradio").addEventListener("click", updateAllSubTotal, false)
        updateAllSubTotal()
    };

      function subtotalUnit(uno,dos){
          return uno * dos
      }
     
    });
  });

   function detectedchange(i,cost){
    var newvalue = document.getElementById("productCount-"+i).value;
    var newcost = newvalue * cost; 
    document.getElementById("product-subtotal-"+i).innerHTML =newcost;
    updateAllSubTotal(); 
 }

 function updateAllSubTotal(){

  subtotal = 0
  for(var i in productList){
    var art = productList[i]
    var product_cost = art.unitCost
    var product_amount = document.getElementById("productCount-" + i).value
    console.log("1")

    if(art.currency === "USD"){
      subtotal = subtotal + (product_cost * product_amount * 40)
    } else {
      subtotal = subtotal + (product_cost * product_amount)
    }
  }

  document.getElementById("subtotal-span").innerHTML = "$" + subtotal;
  calculateFinalTotal(subtotal)
  }

  function calculateFinalTotal(subtotal){

    var added = 0

    if(document.getElementById("standardradio").checked){ added = 5 }
    if(document.getElementById("premiumradio").checked){ added = 7 }
    if(document.getElementById("goldradio").checked){ added = 8 }

    var extra = (added * subtotal) / 100
    var final = subtotal + extra

    document.getElementById("final-total").innerHTML = "$" + final

  }


  
