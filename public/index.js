
import {initializeApp} from 'firebase/app';
import {getDatabase,ref,get,child} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA46vSOs_fuwXsrTurx4JZJ4mETGAltgaQ",
  authDomain: "blassy-a257d.firebaseapp.com",
  databaseURL: "https://blassy-a257d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blassy-a257d",
  storageBucket: "blassy-a257d.appspot.com",
  messagingSenderId: "1039701529589",
  appId: "1:1039701529589:web:021fae342056c7198b06bc"
};
const _data=[];
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getDatabase(app);


      

    const dbRef = ref(getDatabase(app));
    get(child(dbRef, 'goldprice')).then((snapshot) => {
      if (snapshot.exists()) {
       snapshot.forEach(d=>{
        const x={cities:d.val().cities,date:d.val().date}
        _data.push(x);
      });     
  } else {
    console.log("No data available");
  }
   //(old-new)/old*100;

   let d=''
  for(let i=0;i<10;i++){
       let changeinPrice=(_data[1].cities[i].price - _data[0].cities[i].price) / _data[0].cities[i].price * 100;
           
      d+=`<div>
      <h5 id="city">${_data[0].cities[i].city}</h5>
      <p id="price">₹ ${_data[0].cities[i].price}</p>
      ${_data[1].cities[i].price > _data[0].cities[i].price ? '<p style=color:red;>'+changeinPrice.toFixed(3) +'%</p>': '<p style=color:green;>'+changeinPrice.toFixed(3) + '%</p>' } 
      </div>
    `
  }
  document.getElementById('show-price').innerHTML=d;

let x='';
for(let i=0;i<7;i++){
   x+=`<tr><td>${_data[i].date}</td><td>${_data[i].cities[0].price}</td><td>${Math.floor((_data[i].cities[0].price)*.915)}</td><td>${Math.floor((_data[i].cities[0].price)*.75)}</td></tr>`;

  }
  
  document.getElementById('table-body').innerHTML=x;

}).catch((error) => {
  console.error(error);
});

//Show calculated price 

const check=document.getElementById('check');
const select_carate=document.getElementById('select-carat');
const calculated_price=document.getElementById('calculated_price') ;
check.addEventListener('click',()=>{
  const data=_data[0].cities[0].price;
  console.log(data)
  console.log(select_carate.value);
  switch(select_carate.value){
    case 18:
      calculated_price.innerText=Math.floor(data*.75);
      break;
      case 22:
      calculated_price.innerText=Math.floor(data*.915);
      break;
      default:
        calculated_price.innerText=data;
  }
})

console.log(_data);
