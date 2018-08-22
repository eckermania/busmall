'use strict';

// Variable declarations
var imageGroup = document.getElementById('image-container');

var imageElOne = document.getElementById('image-one');

var imageElTwo = document.getElementById('image-two');

var imageElThree = document.getElementById('image-three');

var responseList = document.getElementById('response-list');

var allProductNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var votesCount = 0;

// Variable declarations for empty arrays
var allProducts = [];

var currentProducts = [];

var priorProducts = [];

var votes = [];


// Constructor function
function Product(name, timesShown, timesVoted) {
  this.name = name;
  this.timesShown = timesShown || 0;
  this.path = `img/${name}.jpg`;
  this.timesVoted = timesVoted || 0;
  allProducts.push(this);
}

// Checking local storage for saved data, retrieving array of objects, and resetting vote counter if status is completed.
function checkLocalStorage () {
  if (localStorage.getItem('localVotesCount')) {
    votesCount = localStorage.getItem('localVotesCount');
  } else {
    votesCount = 0;
  }

  if (localStorage.getItem('allProducts')) {
    var retrievedProducts = JSON.parse(localStorage.getItem('allProducts'));
    retrievedProducts.forEach(function(product) {
      new Product(product.name, product.timesShown, product.timesVoted);
    });
  } else {
    allProductNames.forEach(function(productName) {
      new Product(productName);
    });
  }
}

checkLocalStorage();

// Function to select and show three random products.
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

// Event listener that captures votes
imageElOne.addEventListener('click', function() {
  var productClicked = event.target.title;

  for(var i = 0; i < allProducts.length; i++) {

    if(allProducts[i].name === productClicked){
      allProducts[i].timesVoted++;
    }
  }
});

imageElTwo.addEventListener('click', function() {
  var productClicked = event.target.title;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === productClicked) {
      allProducts[i].timesVoted++;
    }
  }
});

imageElThree.addEventListener('click', function(){
  var productClicked = event.target.title;
  for(var i=0; i < allProducts.length; i++) {
    if (allProducts[i].name === productClicked) {
      allProducts[i].timesVoted++;
    }
  }
});

// Constructing ul (not currently in use).
function makeList() {
  for(var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = (`${allProducts[i].timesVoted} votes for ${allProducts[i].name}`);
    responseList.appendChild(liEl);
    votes.push(allProducts[i].timesVoted);
  }
}

//Chart

function makeChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, { // eslint-disable-line 
    type: 'bar',
    data: {
      labels: allProductNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: '#5B6B65',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

// Event

imageGroup.addEventListener('click', function(event) {
  if (votesCount < 26) {
    showProducts(event);
    votesCount ++;
    localStorage.setItem('localVotesCount', votesCount);
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    console.log(JSON.stringify(votesCount));
  } else {
    document.getElementById('start-layout').classList.add('hidden');
    document.getElementById('chart-layout').classList.remove('hidden');
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    makeList();
    makeChart();
    votesCount = 0;
    localStorage.setItem('localVotesCount', votesCount);
  }
});