let add_text = document.querySelector(".add_text");
let add_event = document.querySelector(".add_event");
let check = document.querySelector(".check");
let delete_event = document.querySelector(".delete_event");
let delete_all = document.querySelector(".delete_all");
let js_list = document.querySelector(".js_list");
let js_total = document.querySelector(".js_total");
let js_filter = document.querySelector(".js_filter");
let js_btn = document.querySelector(".js_btn");
let js_btn_true = document.querySelector(".js_btn_true");
let js_btn_false = document.querySelector(".js_btn_false");

let obj = {};
let data = [];
get_axios ();

function get_axios (){
  axios
  .get("https://fathomless-brushlands-42339.herokuapp.com/todo1")
  .then(function (response) {
    data = response.data;
    // console.log(response.data);
    callData();
    init();
  });
}

function post_todo(obj){
  axios
  .post("https://fathomless-brushlands-42339.herokuapp.com/todo1",obj)
  .then(function (response) {
    get_axios()
    callData();
  });
}

function delete_todo(id){
  axios
  .delete(`https://fathomless-brushlands-42339.herokuapp.com/todo1/${id}`)
  .then(function(response){
    get_axios ();
    // callData();
  });
}

function callData() {
  console.log(data);
}

// let myData = [
//   {
//     content: "今天天氣真好，準備去踏青", 
//     id: "1",
//     finish: true
//   },
//   {
//     content: "生人無求，在家耍廢救世界", 
//     id: "2",
//     finish: false
//   },
//   {
//     content: "快點寫作業，老師在你後面很火", 
//     id: "3",
//     finish: false
//   },
//   {
//     content: "明天的力氣，今天幫你船便便", 
//     id: "4",
//     finish: false
//   },
// ];

// init();
// 初始化 -> 在 index 印出 data 中的項目

function init(){
  let str_all = "";
  // 列表
  data.forEach(function(item){
    str = `<li class="flex items-center space-x-4 py-4 mx-6 border-b border-b-light_gray">
      <input type="checkbox" class="check w-5 h-5 rounded-md border border-secondary" name="check" id="">
      <p class="text-sm grow">${item.content}</p>
      <input type="button" class="delete_event w-7 h-6 bg-[url('../src/todoList_image/icon_delete_black.svg')] bg-no-repeat " value="" id="${item.id}">
      </li>`
    str_all += str;
  })
  js_list.innerHTML = str_all;
  // 左下角 total
  js_total.textContent = `${data.length} 個待完成項目`
}

// 新增待辦事項
add_event.addEventListener("click",function(e){
    // 排除無效新增
    if(add_text.value === ""){
      alert("請新增代辦事項");
      return
    }else{
      // 組成 obj -> push data -> 印在網頁上
      obj.content = add_text.value;
      obj.finish = false;
      // obj.data_id = data.length+1;
      data.push(obj);
      post_todo(obj);
    }
    init();
  })

// 篩選待辦事項
js_filter.addEventListener("click",function(e){
  let str_all = "";
  // console.log(e.target.value);
  data.forEach(function(item){
    str = `<li class="flex items-center space-x-4 py-4 mx-6 border-b border-b-light_gray">
    <input type="checkbox" class="check w-5 h-5 rounded-md border border-secondary" name="check" id="">
    <p class="text-sm grow">${item.content}</p>
    <input type="button" class="delete_event w-7 h-6 bg-[url('../src/todoList_image/icon_delete_black.svg')] bg-no-repeat " value="">
    </li>`
    if(e.target.value === "全部"){
      // btn 樣式
      js_btn.setAttribute("class","py-4 border-b-2 border-b-black w-full text-center text-secondary text-sm font-bold")
      js_btn_false.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      js_btn_true.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      // dom data
      str_all += str;
    }else if(e.target.value === "待完成"){
      // btn 樣式
      js_btn_false.setAttribute("class","py-4 border-b-2 border-b-black w-full text-center text-secondary text-sm font-bold")
      js_btn.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      js_btn_true.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      // dom data
      if(item.finish === false){
        str_all += str;
      }
    }else if(e.target.value === "已完成"){
      // btn 樣式
      js_btn_true.setAttribute("class","py-4 border-b-2 border-b-black w-full text-center text-secondary text-sm font-bold")
      js_btn_false.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      js_btn.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      // dom data
      if(item.finish === true){
        str_all += str;
      }
    }
  })
  js_list.innerHTML = str_all;
})

// 完成打勾

// 刪除指定資料
js_list.addEventListener("click",function(e){
  data.forEach(function(item){
    if(e.target.type === "button"){
      if(Number(e.target.getAttribute("id")) === item.id){
        id = item.id;
        delete_todo(id)
      }
    }
  })
})

// 刪除全部資料
// js_footer.addEventListener("click",function(e){
//   data.forEach(function(item){
//     if(e.target.type === "button"){
//       id = item.id;
//       delete_todo(id)
//     }
//   })
// })