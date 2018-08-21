'use strict';

var imageGroup = document.getElementById('image-container');

var imageElOne = document.getElementById('image-one');

var imageElTwo = document.getElementById('image-two');

var imageElThree = document.getElementById('image-three');
var responseTable = document.getElementById('response-table');

var allProducts = [];

var currentProducts = [];

var priorProducts = [];

var votes = 0;

function Product(name) {
  this.name = name;
  this.timesShown = 0;
  this.timesVoted = 0;
  this.path = `img/${name}.jpg`;
  allProducts.push(this);
}

var allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

allProductNames.forEach(function(productName) {
  new Product(productName);
});

function showProducts() {

  function showRandomProductOne() {
    var randoOne = Math.floor(allProducts.length * Math.random());
    while (priorProducts.includes(randoOne)) {
      randoOne = Math.floor(allProducts.length * Math.random());
    }
    imageElOne.src = allProducts[randoOne].path;
    imageElOne.title = allProducts[randoOne].name;
    allProducts[randoOne].timesShown++;
    currentProducts.push(randoOne);
  }

  showRandomProductOne();

  function showRandomProductTwo() {

    var randoTwo = Math.floor(allProducts.length * Math.random());
    while (currentProducts.includes(randoTwo) || priorProducts.includes(randoTwo)){
      randoTwo = Math.floor(allProducts.length * Math.random());
    }
    imageElTwo.src = allProducts[randoTwo].path;
    imageElTwo.title = allProducts[randoTwo].name;
    allProducts[randoTwo].timesShown++;
    currentProducts.push(randoTwo);
  }

  showRandomProductTwo();

  function showRandomProductThree() {
    var randoThree = Math.floor(allProducts.length * Math.random());
    while (currentProducts.includes(randoThree) || priorProducts.includes(randoThree)){
      randoThree = Math.floor(allProducts.length * Math.random());
    }
    imageElThree.src = allProducts[randoThree].path;
    imageElThree.title = allProducts[randoThree].name;
    allProducts[randoThree].timesShown++;
    currentProducts.push(randoThree);
  }

  showRandomProductThree();

  priorProducts = [];
  priorProducts = currentProducts;
  currentProducts = [];
}

showProducts();

imageElOne.addEventListener('click', function() {
  var productClicked = event.target.title;

  for(var i = 0; i < allProducts.length; i++) {

    if(allProducts[i].name === productClicked){
      allProducts[i].timesVoted++;
      console.table(allProducts);
    }
  }
});

imageElTwo.addEventListener('click', function() {
  var productClicked = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === productClicked) {
      allProducts[i].timesVoted++;
      console.table(allProducts);
    }
  }
});

imageElThree.addEventListener('click', function(){
  var productClicked = event.target.title;
  for(var i=0; i < allProducts.length; i++) {
    if (allProducts[i].name === productClicked) {
      allProducts[i].timesVoted++;
      console.table(allProducts);
    }
  }
});

function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  
  thEl.textContent = 'Name';
  trEl.appendChild(thEl);

  thEl.textContent = 'Times Shown';
  trEl.appendChild(thEl);

  thEl.textContent = 'Times Selected';
  trEl.appendChild(thEl);

  thEl.textContent = 'Percentage of Times Selected';
  trEl.appendChild(thEl);

  responseTable.appendChild(trEl);
}

imageGroup.addEventListener('click', function(event) {
  if (votes < 2) {
  // TODO: CHANGE VOTES ABOVE TO 25
    showProducts(event);
    votes ++;
  } else {
    document.getElementById('start-layout').classList.add('hidden');
    document.getElementById('end-layout').classList.remove('hidden');
  }
});

makeHeaderRow();
