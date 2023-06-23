    // 使用if來取得週天的名稱
    // function getWeekdayName(weekday){ 
    //   var weekdayName;
    //   if (weekday === 0 ) weekdayName = "Sunday";
    //   if (weekday === 1 ) weekdayName = "Monday";
    //   if (weekday === 2 ) weekdayName = "Tuesday";
    //   if (weekday === 3 ) weekdayName = "Wednesay";
    //   if (weekday === 4 ) weekdayName = "Thursday";
    //   if (weekday === 5 ) weekdayName = "Friday";
    //   if (weekday === 6 ) weekdayName = "Saturay";
    //   return weekdayName;
    // }

    // 使用陣列來取得週天的名稱
    function getWeekdayName(weekday){
      var weekdayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return weekdayNames[weekday];
    }


    function getMonthName(month){
      switch (month)  {        
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";        
        case 4: return "May";        
        case 5: return "June";        
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";                                    
        case 11: return "December";        
      }
    }

    function addDateOrdinal(date) { //加上日期序數
      switch (date) {
        case 1:
        case 21:
        case 31: return date + "<sup>st</sup>";

        case 2:
        case 22: return date + "<sup>nd</sup>";        

        case 3:
        case 23: return date + "<sup>rd</sup>";        

        default: return date + "<sup>th</sup>";      
      }

    }

    function updateDates(){
      let today = new Date();  //新增一個Date物件，命名為today

      document.getElementById("cur-year").innerHTML = today.getFullYear();
      document.getElementById("back-year").innerHTML = today.getFullYear();
      document.getElementById("cal-year").innerHTML = today.getFullYear();

      document.getElementById("cur-month").innerHTML = getMonthName( today.getMonth() );
      document.getElementById("cal-month").innerHTML = getMonthName( today.getMonth() );

      document.getElementById("cur-date").innerHTML = addDateOrdinal( today.getDate() );

      document.getElementById("cur-day").innerHTML = getWeekdayName(today.getDay());

    }


    function getUID(year, month, date) {
      if (month < 10) month = '0' + month;  //如果數字是1位數的話，前面補0
      if (date < 10) date = '0' + date;
      return ''+year+month+date;
    }

    //記事圖示與ToolTip處理
    function appendSpriteToCellAndTooltip(uid, elem){      
      for(let i = 0; i < postIts.length; i++){
        if(uid == postIts[i].id){
          elem.innerHTML += `<img src='images/note${postIts[i].note_num}.png' alt='A post-it note'>`;
          elem.classList.add("tooltip");
          elem.innerHTML += `<span>${postIts[i].note}</span>`;
        }
      }
    }

    function fillInMonth(thisYear, thisMonth, thisDate){
      document.getElementById("cal-year").innerHTML = thisYear;
      document.getElementById("cal-month").innerHTML = getMonthName( thisMonth );

       // 填滿月曆表格日期
      var days = document.getElementsByTagName("TD"); //取得月曆表格html所有的TD標籤物件陣列
      
      var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //記錄每個月的天數
      if(thisYear % 400 == 0 || (thisYear % 4 == 0 && thisYear % 100 != 0 )) { monthDays[1] = 29; } //閏年的話，2月為29天

      //new Date(thisYear, thisMonth, 1)取得今年今月1日的Ddate日期物件，再用這個物件算出這一天是禮拜幾
      let firstDayThisMonthYear =  new Date(thisYear, thisMonth, 1).getDay(); 

      //  處理今日灰色背景
      if (document.getElementById("current-day")) { //確認是否有一個元素其id值為"current-day"？
        document.getElementById("current-day").removeAttribute("id");      
      }
      if (thisYear === new Date().getFullYear() && thisMonth === new Date().getMonth()) { //當要繪製的年月等於當年當月時…
          days[firstDayThisMonthYear + thisDate - 1].setAttribute("id", "current-day");
      }
      
      var uid;

      //填本月的天數，從1到本月的最後一天(取本月的天數)
      for (let i = 1; i <= monthDays[thisMonth]; i++) {
        
        uid = getUID(thisYear, thisMonth,i);
        // console.log(uid);

        days[i + firstDayThisMonthYear - 1].innerHTML = i;
        days[i + firstDayThisMonthYear - 1].classList.remove("color");
        days[i + firstDayThisMonthYear - 1].setAttribute("data-uid", uid);
        appendSpriteToCellAndTooltip(uid, days[i + firstDayThisMonthYear - 1]);
      }

      //填上月的天數，從上個月的最後1天開始遞減地填
      let lastMonth = thisMonth - 1;
      if (lastMonth === -1) lastMonth = 11; //1月的"上個月"是12月
      let d = monthDays[lastMonth];
    
      for(let i = firstDayThisMonthYear - 1; i >= 0; i--){
        if (lastMonth == 11) {
          uid = getUID(thisYear-1, lastMonth,d);
  
        } else {
          uid = getUID(thisYear, lastMonth,d);
        }  
        // console.log(uid);
        days[i].innerHTML = d;
        days[i].classList.add("color");
        days[i].classList.remove("prev-month-last-day");
        days[i].setAttribute("data-uid", uid);
        appendSpriteToCellAndTooltip(uid, days[i]);
        d--;
      }
      if(firstDayThisMonthYear > 0) days[firstDayThisMonthYear-1].classList.add("prev-month-last-day");
      
      var nextMonth = thisMonth + 1;      

      //填下月的天數，從1到最後1格    
      for(let i = firstDayThisMonthYear  + monthDays[thisMonth], d = 1; i <= 41; i++, d++) {
        if (nextMonth == 12) {
          uid = getUID(thisYear+1, 0,d);
  
        } else {
          uid = getUID(thisYear, nextMonth,d);
        }
        // console.log(uid);
        days[i].innerHTML = d; 
        days[i].classList.add("color");
        days[i].setAttribute("data-uid", uid);
        appendSpriteToCellAndTooltip(uid, days[i]);
      }        
      changeColor();
    }

    function previousMonth(){
      // console.log("你按了上個月的按鍵…");
      thisMonth--;
      if(thisMonth === -1) {
        thisMonth = 11;
        thisYear--;
      }
      fillInMonth(thisYear, thisMonth, thisDate);    
    }

    function nextMonth(){
      // console.log("你按了下個月的按鍵…");
      thisMonth++;
      if(thisMonth === 12) {
        thisMonth = 0;
        thisYear++;
      }
      fillInMonth(thisYear, thisMonth, thisDate);        
    }

    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 37: previousMonth(); break;
        case 39: nextMonth(); break;
      }
    };
