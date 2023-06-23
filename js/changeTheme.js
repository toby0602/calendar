var currentColor = {
  name: "blue",
  color: "#153b5f",
  off_color: "#7c7EFB"
};

var color_data = [
  {
    name: 'blue',
    color_code: '#153b5f',
    off_color_code: '#7C7EFB'
  }, {
    name: 'red',
    color_code: '#D01212',
    off_color_code: '#EEA19B'
  }, {
    name: 'purple',
    color_code: '#721D89',
    off_color_code: '#EBADFB'
  }, {
    name: 'green',
    color_code: '#158348',
    off_color_code: '#57C664'
  }, {
    name: 'orange',
    color_code: '#EE742D',
    off_color_code: '#F7A77A'
  }, {
    name: 'deep-orange',
    color_code: '#F13C26',
    off_color_code: '#F77D59'
  }, {
    name: 'baby-blue',
    color_code: '#31B2FC',
    off_color_code: '#3D8DD9'
  }, {
    name: 'cerise',
    color_code: '#EA3D69',
    off_color_code: '#FCBECC'
  }, {
    name: 'lime',
    color_code: '#2ACC32',
    off_color_code: '#4FFA4F'
  }, {
    name: 'teal',
    color_code: '#2FCCB9',
    off_color_code: '#7FE7E3'
  }, {
    name: 'pink',
    color_code: '#F50D7A',
    off_color_code: '#FFB9EA'
  }, {
    name: 'black',
    color_code: '#212524',
    off_color_code: '#687E7B'
  }
];

//用程式的方式去打開色彩對話方塊，讓使用者選取色彩，確認後，按下"Update"按鈕…
function openFavColor() {
  var modal = document.getElementById("modal");
  modal.open = true;
  var template = document.getElementById("fav-color");
  template.removeAttribute("hidden");

  if (modal.classList.contains('fade-out')) modal.classList.toggle('fade-out');
  modal.classList.toggle('fade-in');
}

// 變更色彩，關閉色彩對話方塊
function changeColor() {

  color_data.forEach(function (arr_data) { //陣列的走訪，每走訪一個陣列元素，帶出的元素以arr_data變數呈現(arr_data我們自取的名稱)
    if (currentColor.name == arr_data.name) { //找到color_data陣列中符合的色彩，
      currentColor.color = arr_data.color_code;
      currentColor.off_color = arr_data.off_color_code;
    }
  });
  // console.log(currentColor.name + "," + currentColor.color + "," + currentColor.off_color);

  var elements;

  //先清除掉所有的style設置(td)
  elements = document.getElementsByTagName("td");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style = null;
  }

  //改變目前的色彩設置
  elements = document.getElementsByClassName("color"); //找出所有有設置color類別的元素
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = currentColor.color;
  }

  elements = document.getElementsByClassName("border-color");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.borderColor = currentColor.color;
  }

  elements = document.getElementsByClassName("off-color");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.color = currentColor.off_color;
  }
  //關閉色彩對話方塊
  var modal = document.getElementById("modal");
  modal.open = false;
  var template = document.getElementById("fav-color");
  template.setAttribute("hidden", "hidden");

  if (modal.classList.contains('fade-in')) modal.classList.toggle('fade-in');
  modal.classList.toggle('fade-out');

}

function addCheckMark(color_name) {
  currentColor.name = color_name;
  //先清除色塊上原有的勾選符號
  var colorPreviews = document.getElementsByClassName("color-preview");
  for (let i = 0; i < colorPreviews.length; i++) {
    if (colorPreviews[i].innerHTML != "") {
      colorPreviews[i].innerHTML = "";
      break;
    }
  }

  //將點選色塊元素的內容加上勾選符號…
  var element = document.getElementById(color_name);
  if (element) element.innerHTML = "<i class='fas fa-check checkmark'></i>";
}
