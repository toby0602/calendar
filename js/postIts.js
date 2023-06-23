function openMakeNote(){
  var modal = document.getElementById("modal");    
  var template = document.getElementById("make-note");
  template.removeAttribute("hidden");      
  modal.open = true;
  if (modal.classList.contains('fade-out')) modal.classList.toggle('fade-out');
  modal.classList.toggle('fade-in');      

  if(!newCurrentPostIt){//如果不是新記事的話
    document.getElementById("edit-post-it").value = postIts[currentPostItIndex].note; //將原有記事資料物件裏的記事顯示在文字方塊"edit-post-it"中
  }      
  document.getElementById("edit-post-it").focus();
}
function closeMakeNote(){
  //關閉對話方塊
  var modal = document.getElementById("modal");      
  if(modal.classList.contains('fade-in')) modal.classList.toggle('fade-in');
  modal.classList.toggle('fade-out');
  var template = document.getElementById("make-note");
  template.setAttribute("hidden", "hidden");
  modal.open = false;
}
function dayClicked(elm) {
  console.log(elm.dataset.uid);
  currentPostItID = elm.dataset.uid; //目前的記事ID為所點擊的日期表格上的uid
  currentDayHasNote(currentPostItID);//判斷目前點擊的日期是否有記事資料
  openMakeNote();
}

function currentDayHasNote(uid){ //測試特定UID是否已經有記事
  for(var i = 0; i < postIts.length; i++){
      if(postIts[i].id == uid){ //Bingo
          newCurrentPostIt = false; //目前的日期有記事資料
          currentPostItIndex = i; //指向找到的記事資料物件
          return;
      }
  }
  newCurrentPostIt = true;  //目前的日期沒有記事資料
}

function getRandom(min, max) { //min <= 亂數值 < max
  return Math.floor(Math.random() * (max - min) ) + min;
}

function submitPostIt(){ //按了PostIt按鍵後，所要執行的方法
  const value = document.getElementById("edit-post-it").value;
  document.getElementById("edit-post-it").value = "";
  let num = getRandom(1, 6); //取得1~5的亂數，用來標示便利貼顏色的檔案代號
  let postIt = {
      id: currentPostItID,
      note_num: num,
      note: value
  }
  if(newCurrentPostIt){ //如果是新記事的話
      postIts.push(postIt); //將新記事postIT物件推入postIts陣列
  } else {
      postIts[currentPostItIndex].note = postIt.note; //更新現有記事物件的記事資料
  }
  // console.log(postIts)
  fillInMonth(thisYear, thisMonth, thisDate);    
  closeMakeNote();
}

function deleteNote(){
  document.getElementById("edit-post-it").value = "";
  let indexToDel; //指向將刪除的記事資料物件
  if(!newCurrentPostIt){
      indexToDel =currentPostItIndex;
  }
  if(indexToDel != undefined){
      postIts.splice(indexToDel, 1);
  }
  fillInMonth(thisYear, thisMonth, thisDate);    
  closeMakeNote();
}
    
// 記事資料的程式片段
var postIts = []; //記事陣列，用來放置月曆中的記事物件資料
//current 目前點擊的日期
var currentPostItID = 0; //目前的記事ID
var newCurrentPostIt = false; //目前的記事是否為新？也就是：目前點選的日期尚未有任何的記事資料
var currentPostItIndex = 0; //目前的記事在postIts陣列中的位置索引