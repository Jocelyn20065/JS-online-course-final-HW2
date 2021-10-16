// 一些參考資料區:
// 製作換頁 https://hsiangfeng.github.io/javascript/20190505/1432256317/



let data=[];
let newArry=[];
const selector=document.querySelector('#js-select');
const market=document.querySelector('.market');
const showList= document.querySelector('.showList');
 //換頁
 const pageId=document.querySelector('#pageId');
 let currentPage=1; //預設在第一頁

axios.get('https://hexschool.github.io/js-filter-data/data.json')
.then(function (response) {
    data=response.data;
    renderData(data,1)
  });


// 渲染畫面  

function renderData(data, nowPage) {
 let currentPage=nowPage;
 let dataTotal=data.length;
 const perPage=100;
 const pageTotal = Math.ceil(dataTotal / perPage);
 console.log(`全部資料:${dataTotal} 每一頁顯示:${perPage}筆 總頁數:${pageTotal}`);
// 預設當前頁數
// 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"，避免頁數超過
if (currentPage > pageTotal) {
  currentPage = pageTotal;}
  let minData =(currentPage * perPage)-perPage+1 // 起始資料
  let maxData= (currentPage * perPage);  // 最後一筆資料
 console.log (minData,maxData);
 let str="";
 if(minData<=0){
   console.log('no match');
   str+=`<td colspan="7" class="text-center p-3">NO MATCH</td>`;
 } else {
    data.forEach(function(item,i){
    const num=i+1; // 因為第一筆index 為0
    if(num>=minData && num<= maxData){
     str+=` <tr><td>${item.作物名稱}</td>
     <td>${item.市場名稱}</td>
     <td>${item.上價}</td>
     <td>${item.中價}</td>
     <td>${item.下價}</td>
     <td>${item.平均價}</td>
     <td>${item.交易量}</td></tr>`;
    }
  })
  
 }
 showList.innerHTML=str;
 newArry=data;
 //設定換頁標籤
 const page = {
  pageTotal,
  currentPage,
  hasPage: currentPage > 1,
  hasNext: currentPage < pageTotal,}
  pageBtn(page);
  function pageBtn (page){
    let str = '';
    const total = page.pageTotal;
    if(page.hasPage) {
      str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">Previous</a></li>`;
    } else {
      str += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
    }
    for(let i = 1; i <= total; i++){
      if(Number(page.currentPage) === i) {
        str +=`<li class="page-item active"><a class="page-link " href="#" data-page="${i}">${i}</a></li>`;
      } else {
        str +=`<li class="page-item"><a class="page-link text-success" href="#" data-page="${i}">${i}</a></li>`;
      }
    };
     if(page.hasNext) {
    str += `<li class="page-item"><a class="page-link text-success" href="#" data-page="${Number(page.currentPage) +1}">Next</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
  }
    pageId.innerHTML = str;
  }
}

// 切換頁面

pageId.addEventListener("click",function(e){
  if(e.target.getAttribute('class')=='page-item disabled'){
    e.preventDefault();
    return;
  }
  if(e.target.nodeName === 'A'){
    // e.preventDefault();
  };
  const page=e.target.dataset.page;
  renderData(newArry,page);

})


// 搜尋邏輯

const cropInput= document.querySelector('#crop');
const searchBtn= document.querySelector('.search');

searchBtn.addEventListener("click",function(e){
  let newData=[];
  let content = cropInput.value;
  content=content.trim();
  if(content==""){
    alert ("請輸入作物名稱");
    return;
  }
  data.forEach(function(item){
    if(item.作物名稱 == cropInput.value){
      newData.push(item);
    };
  })
  console.log(newData);
  renderData(newData,1);
  sideSelect.value="排序篩選";
  
})

//切換種類邏輯

const N04=document.querySelector('button[data-type="N04"]');
const N05=document.querySelector('button[data-type="N05"]');
const N06=document.querySelector('button[data-type="N06"]');

N05.addEventListener("click",function(e){
  let filterType= data.filter(function(item){
    return item.種類代碼=="N05";
  })
  renderData(filterType,1);
  sideSelect.value="排序篩選";
})

N04.addEventListener("click",function(e){
  let filterType= data.filter(function(item){
    return item.種類代碼=="N04";
  })
  renderData(filterType,1);
  sideSelect.value="排序篩選";
})

N06.addEventListener("click",function(e){
  let filterType= data.filter(function(item){
    return item.種類代碼=="N06";
  })
  renderData(filterType,1);
  sideSelect.value="排序篩選";
})



// 排序邏輯

const sortAdvanced= document.querySelector(".js-sort-advanced");

sortAdvanced.addEventListener("click",function(e){
  console.log(e.target.nodeName == 'I')
  if(e.target.nodeName !== 'I'){
    console.log('wrong place');
    return;
  }else{
    let sortPrice= e.target.dataset.price;
    let sortWay= e.target.dataset.sort;
    if (sortWay == 'up'){
      newArry.sort(function(a,b){
        return b[sortPrice] - a[sortPrice];
      })
    }else if  (sortWay == 'down'){
      newArry.sort(function(a,b){
        return a[sortPrice] - b[sortPrice];
      })
    }renderData(newArry,1);
    sideSelect.value="排序篩選";
    
    
  }
})


// 側邊排序邏輯
// const expr = 'Papayas';
// switch (expr) {
//   case 'Oranges':
//     console.log('Oranges are $0.59 a pound.');
//     break;
//   case 'Mangoes':
//   case 'Papayas':
//     console.log('Mangoes and papayas are $2.79 a pound.');
//     // expected output: "Mangoes and papayas are $2.79 a pound."
//     break;
//   default:
//     console.log(`Sorry, we are out of ${expr}.`);
// }




const sideSelect=document.querySelector('#js-select');
console.log(sideSelect.value)
sideSelect.addEventListener('change',selected); //這裡好像可以用switch?
function selected(e){
  let value = e.target.value;
  switch (value){
    case "依上價排序":
      newArry.sort(function(a,b){
        return b.上價 -a.上價;
            });
      break;
    case "依中價排序":
      newArry.sort(function(a,b){
        return b.中價 -a.中價;
            });
      break;
    case "依下價排序":
      newArry.sort(function(a,b){
        return b.下價 -a.下價;
            });
      break;
    case "依平均價排序":
      newArry.sort(function(a,b){
        return b.平均價 -a.平均價;
            });
      break;
    case "依平均價排序":
      newArry.sort(function(a,b){
        return b.平均價 -a.平均價;
            });
      break;
    case "依交易量排序":
      newArry.sort(function(a,b){
        return b.交易量 -a.交易量;
            });
      break;          
  }
  renderData(newArry,1);
}
// function selected(e){
//   if (e.target.value ==="依上價排序"){
//     newArry.sort(function(a,b){
//       return b.上價 -a.上價;
//     }) } else if(e.target.value ==="依中價排序"){
//       newArry.sort(function(a,b){
//         return b.中價 -a.中價;
//       })
//     }else if(e.target.value ==="依下價排序"){
//       newArry.sort(function(a,b){
//         return b.下價 -a.下價;
//       })
//     }else if(e.target.value ==="依平均價排序"){
//       newArry.sort(function(a,b){
//         return b.平均價 -a.平均價;
//       })
//     }else if(e.target.value ==="依交易量排序"){
//       newArry.sort(function(a,b){
//         return b.交易量 -a.交易量;
//       })
//     }
//     renderData(newArry,1);
// }

//<option>依上價排序</option>
// <option>依中價排序</option>
// <option>依下價排序</option>
// <option>依平均價排序</option>
// <option>依交易量排序</option> 