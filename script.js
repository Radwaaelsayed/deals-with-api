const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
     
    const user = data.results[0];
    
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random()*1000000)
    };
    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDom();
}

function updateDom(providedData = data){
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);   
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  function doubleMoney(){
      data = data.map((item) => {
          return { ...item , money:item.money * 2}

      })
      updateDom();
  }

  function sortByRiches() {
      data.sort((a,b) => (b.money - a.money));
      updateDom();
  }

  function showMillionaires() {
      data = data.filter(item => (item.money > 1000000));
      console.log(data)
      updateDom();
  }

  function calculateTotalWealth() {
      const wealth = data.reduce((acc ,item) => (acc + item.money) ,0);
      
      const wealthElem = document.createElement('div');
      wealthElem.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`
      main.appendChild(wealthElem);
  }





addUserBtn.addEventListener('click',getRandomUser)
doubleBtn.addEventListener('click',doubleMoney)
sortBtn.addEventListener('click',sortByRiches)
showMillionairesBtn.addEventListener('click',showMillionaires)
calculateWealthBtn.addEventListener('click',calculateTotalWealth)

