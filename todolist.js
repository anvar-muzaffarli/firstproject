const yenifunksiya = document.querySelector('.input-funksiyasi');
const yeniFunksiyaElaveBtn = document.querySelector('.btn-funksiya-elaveet');
const funksiyaSiyahisi = document.querySelector('.funksiya-siyahisi');


yeniFunksiyaElaveBtn.addEventListener('click', funksiyaElaveEt);
funksiyaSiyahisi.addEventListener('click', funksiyaSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOxu);





function funksiyaSilTamamla(e) {
    const kliklenenElement = e.target;

    if (kliklenenElement.classList.contains('funksiya-btn-tamamlandi')) {
        
        kliklenenElement.parentElement.classList.toggle('funksiya-tamamlandi');
    }

    if (kliklenenElement.classList.contains('funksiya-btn-sil')) {
        kliklenenElement.parentElement.classList.toggle('silinmeKecidi');
        const silinecekElement = kliklenenElement.parentElement.children[0].innerText;

        localStorageSil(silinecekElement);

        kliklenenElement.parentElement.addEventListener('transitionend', function () {
            kliklenenElement.parentElement.remove();
        });
        //
    }
}

function funksiyaElaveEt(e) {
    //console.log("tiklandi");
    e.preventDefault();
    funksiyaItemYarat(yenifunksiya.value);


    localStorageYaz(yenifunksiya.value);
     yenifunksiya.value = '';

   


}


function localStorageArrayeDonder() {
    
        let funksiyalar;

    if (localStorage.getItem('funksiyalar') === null) {
        funksiyalar = [];
    }

    else {
        funksiyalar = JSON.parse(localStorage.getItem('funksiyalar'));
    }

    return funksiyalar;

}

function localStorageYaz (yeniFunksiya) {
    let funksiyalar = localStorageArrayeDonder();

    

    funksiyalar.push(yeniFunksiya);
    localStorage.setItem('funksiyalar', JSON.stringify(funksiyalar));

}

function localStorageOxu () {

    let funksiyalar = localStorageArrayeDonder();
    funksiyalar.forEach(function (funksiya){
        funksiyaItemYarat(funksiya);
    });

}

function funksiyaItemYarat(funksiya) {
     //div yaratma

     const funksiyaDiv = document.createElement('div');
     funksiyaDiv.classList.add('funksiya-item');
 
     // li yaratma
 
     const funksiyaLi = document.createElement('li');
     funksiyaLi.classList.add('funksiya-tanim');
     funksiyaLi.innerText = funksiya;
     funksiyaDiv.appendChild(funksiyaLi);
 
     //tamamlandi butonu
     const funksiyaTamamBtn = document.createElement('button');
     funksiyaTamamBtn.classList.add('funksiya-btn');
     funksiyaTamamBtn.classList.add('funksiya-btn-tamamlandi');
     funksiyaTamamBtn.innerHTML = '<i class="fas fa-user-check"> </i>';
     funksiyaDiv.appendChild(funksiyaTamamBtn);
 
     const funksiyaSilBtn = document.createElement('button');
     funksiyaSilBtn.classList.add('funksiya-btn');
     funksiyaSilBtn.classList.add('funksiya-btn-sil');
     funksiyaSilBtn.innerHTML = '<i class="fas fa-trash"></i>';
     funksiyaSilBtn.innerHTML = '<i class="fas fa-trash"></i>';
     funksiyaDiv.appendChild(funksiyaSilBtn);
 
 
 
    //localstoragee qeyd ele
     
 
     
 
     // ul elave etmek
 
     funksiyaSiyahisi.appendChild(funksiyaDiv);
}

function localStorageSil(funksiya) {
    let funksiyalar = localStorageArrayeDonder();

    const silinecekElementIndex = funksiyalar.indexOf(funksiya); 
    funksiyalar.splice(silinecekElementIndex, 1);

    localStorage.setItem('funksiyalar', JSON.stringify(funksiyalar));
}