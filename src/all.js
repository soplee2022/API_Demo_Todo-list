let add_text = document.querySelector(".add_text");
let add_event = document.querySelector(".add_event");
let check = document.querySelector(".check");
let delete_event = document.querySelector(".delete_event");
let delete_all = document.querySelector(".delete_all");
let js_list = document.querySelector(".js_list");
let js_total = document.querySelector(".js_total");

let obj = {};
get_axios ();

function get_axios (){
  axios
  .get("https://fathomless-brushlands-42339.herokuapp.com/todo1")
  .then(function (response) {
    data = response.data
    // callData();
    init();
  });
}

function post_todo(){
  axios
  .post("https://fathomless-brushlands-42339.herokuapp.com/todo1",obj)
  .then(function (response) {
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
//     finish: false
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

// 初始化 -> 在 index 印出 data 中的項目

function init(){
  // 列表
  let str_all = "";
  data.forEach(function(item){
    str = `<li class="flex items-center space-x-4 py-4 mx-6 border-b border-b-light_gray">
      <input type="checkbox" class="check w-5 h-5 rounded-md border border-secondary" name="check" id="">
      <p class="text-sm grow">${item.content}</p>
      <input type="button" class="delete_event w-7 h-6 bg-[url('../src/todoList_image/icon_delete_black.svg')] bg-no-repeat " value="">
      </li>`
    str_all += str;
  })
  js_list.innerHTML = str_all;
  // 左下角 total
  js_total.textContent = `${data.length} 個待完成項目`
}

add_event.addEventListener("click",function(e){
    // 排除無效新增
    if(add_text.value === ""){
      alert("請新增代辦事項");
      return
    }else{
      // 組成 obj -> push data -> 印在網頁上
      obj.content = add_text.value;
      data.push(obj);
      post_todo();
    }
    init();
  })