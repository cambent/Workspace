var product = {};
var productList = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        //document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;//
    }
}

//funcion productos relacionados//

function showRelatedProducts(array){
    getJSONData(PRODUCTS_URL).then(function(resultObj) { 
        if (resultObj.status === "ok") {
            productList = resultObj.data;

            let htmlRelatedProducts = "";

            for (let i = 0; i <array.length; i++ ) {
                let relatedProductsPosition = array[i];
                let relatedProducts = productList[relatedProductsPosition];
            
                htmlRelatedProducts +=`
            
                <div class="card-group mt-6">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="` + relatedProducts.imgSrc +`">
                    <div class="card-body">
                        <h5 class="card-title"> ` + relatedProducts.name +`</h5>
                        <p class="card-text">` + relatedProducts.description +`</p>
                        <a href="product-info.html" class="btn btn-primary">Ver producto</a>
                    </div
                </div>
                </div>
                `
        }

        document.getElementById("relatedProductContainer").innerHTML = htmlRelatedProducts;
    };

    });
};

//funcion comentarios//

function showComents(array) {
    let htmlContentToAppend = "";
    
    for(let i = 0; i < array.length; i++) {
        let comentario = array[i];
        let estrellas = "";
        
        for (let i = 1; i<= comentario.score; i++) {
            estrellas += `<i class="fa fa-star checked"> </i>`
        }

        for (let i = comentario.score + 1; i <=5; i++) {
            estrellas += `<i class="fa fa-star"> </i>`
        }

        htmlContentToAppend += `
        <div class="list-group">
            <div class="d-flex flex-row comment-row m-t-0">
                <div class="comment-text w-100">
                    <h6 class="font-weight-bold">${comentario.user}</h6>
                    <div id="rating"> ${estrellas} </div>
                    <span class="m-b-15 d-block">${comentario.description}</span>
                <div class="comment-footer">
                    <span class="text-muted float-right">${comentario.dateTime}</span>
                </div>
                </div>
            </div>
            <br>
            `

            document.getElementById("ListaDeComentarios").innerHTML = htmlContentToAppend;
    }   
}

function nuevocomentario() {
    let contenido = document.getElementById("nuevocomentario").value;
    let usuarios = sessionStorage.getItem('user');
    let valoracion = document.getElementById("puntaje").value;
    let estrellas = "";

        for (let i = 1; i<= valoracion; i++) {
            estrellas += `<i class="fa fa-star checked"> </i>`
        }

        for (let i = valoracion; i <=4; i++) {
            estrellas += `<i class="fa fa-star"> </i>`
        }

 htmlContentToAppend = `
    
 <div class="list-group">
 <div class="d-flex flex-row comment-row m-t-0">
     <div class="comment-text w-100">
         <h6 class="font-weight-bold">${usuarios}</h6>
         <div id="rating"> ${estrellas} </div>
         <span class="m-b-15 d-block">${contenido}</span>
     <div class="comment-footer">
         <span class="text-muted float-right"></span>
     </div>
     </div>
 </div>
 <br>
 `    

            document.getElementById("ListaDeComentarios").innerHTML += htmlContentToAppend;       
        }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        { console.log("hola");
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCategoryHTML.innerHTML = product.category;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            
            showRelatedProducts(product.relatedProducts);
            }
    
            });

            //comentarios//

            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    comentario = resultObj.data;

                    showComents(comentario);
                }
            });
            
        
});