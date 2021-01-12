"use strict";
function nightModeToggle() {
    let texttoggle=document.querySelector("#nightmode").textContent; 
    document.querySelector("body").style.filter= (texttoggle=="夜间模式")? "invert(80%)" : "invert(0%)";
    document.querySelector("body").style.backgroundColor= (texttoggle=="夜间模式")? "#333333" : "white";
    document.querySelector("#nightmode").textContent= (texttoggle=="夜间模式")? "白昼模式" : "夜间模式";    
}
function alertInfor() {
    wrap[0].style.display="block";
}
function toggleForm() {
    wrap[1].style.display= (wrap[1].style.display=="none")?"block":"none";
    if(wrap[1].style.display=="block") {
        wrap[1].scrollTop=document.querySelector("body").scrollTop;
    }
}
function goStudy() {
    if((!document.querySelector(".topList div"))&&(!document.querySelector(".normalList div"))&&(!document.querySelector(".endList div"))) {
        let study=document.createElement("div");
        study.className="gostudy"
        study.innerHTML=`
        <img src="resources/mice.png">
        <p>&nbsp;&nbsp;&nbsp;现在就<a id="ni"><i>新建待办</i></a>开始学习!</p>
        `;
        document.querySelector(".list").append(study); 
        document.querySelector("#ni").addEventListener("click",function() {
            document.querySelector("#addbt").click();
        })
    }
}
function addItem() {
    if (document.querySelector(".gostudy")) { document.querySelector(".gostudy").remove();}
    document.querySelector(".normalList").insertAdjacentHTML("afterbegin",`
        <div class="fund rank`+rank+`" fToggle="off" topToggle="off">
            <img src="resources/ontop.png">
            <img src="resources/finished.png">
            <div>
                <h2>`+document.querySelector("#head").value+`</h2>
                <p>`+document.querySelector("#contents").value+`</p><br>
                <p>`+document.querySelector("#diedtime").value+`</p>
            </div>
            <div class="bottombar">
                <button class="delete">移除</button>
                <button class="modify">修改</button>
                <button class="finish">完成</button>
                <button class="ontop">置顶</button>
                <button class="andsoon">其他</button>
            </div>
        </div>
    `)
    let selector=".rank"+rank;
    let item=document.querySelector(selector);
    document.querySelector("#head").value="";
    document.querySelector("#contents").value="";
    document.querySelector("#diedtime").value="";
    item.getElementsByClassName("delete")[0].addEventListener("click",function() {
        item.remove();
        rank-=1;
        goStudy(); 
    });
    toggleForm();
    item.getElementsByClassName("modify")[0].addEventListener("click",function() {   
        toggleForm();
        document.querySelector(".over").style.display="none";
        document.querySelector(".fixbt").style.display="inline-block";
        document.querySelector("body").insertAdjacentHTML("beforeend","<span>"+selector+"</span>")
        document.querySelector("#head").value=item.querySelector("h2").textContent;
        document.querySelector("#contents").value=item.querySelector("p").textContent;
        document.querySelector("#diedtime").value=item.querySelector("p+br+p").textContent;
    });
    item.getElementsByClassName("finish")[0].addEventListener("click",function() { markFinishedToggle(selector); });
    item.getElementsByClassName("ontop")[0].addEventListener("click",function() { topToggle(selector);});
    rank+=1;
}
function markFinishedToggle(sec) {
    let item=document.querySelector(sec);
    let isTop=item.getAttribute("topToggle");
    let isFin=item.getAttribute("fToggle");
    if (isTop=="on"&&isFin=="on") {
        item.style.backgroundColor="rgb(255,0,0,0.5)";
        item.getElementsByTagName("img")[1].style.display="none";
        item.getElementsByTagName("img")[0].style.display="block";
        item.getElementsByClassName("finish")[0].textContent="完成";
        item.getElementsByClassName("ontop")[0].style.display="inline-block";
        item.setAttribute("fToggle","off");
        document.querySelector(".normalList").prepend(item);
    }   
    if(isTop=="on"&&isFin=="off") {
        item.style.backgroundColor="rgba(213,255,255,1)";
        item.getElementsByTagName("img")[1].style.display="block";
        item.getElementsByTagName("img")[0].style.display="none";
        item.getElementsByClassName("finish")[0].textContent="取消完成";
        item.getElementsByClassName("ontop")[0].style.display="none";
        item.setAttribute("fToggle","on");
        document.querySelector(".endList").append(item);
    }   
    if (isTop=="off"&&isFin=="off") {
        item.style.backgroundColor="rgba(213,255,255,1)";
        item.getElementsByTagName("img")[1].style.display="block";
        item.getElementsByClassName("finish")[0].textContent="取消完成";
        item.getElementsByClassName("ontop")[0].style.display="none";
        item.setAttribute("fToggle","on");
        document.querySelector(".endList").append(item);
    } 
    if (isTop=="off"&&isFin=="on") {
        item.style.backgroundColor="antiquewhite";
        item.getElementsByTagName("img")[1].style.display="none";
        item.getElementsByClassName("finish")[0].textContent="完成";
        item.getElementsByClassName("ontop")[0].style.display="inline-block";
        item.setAttribute("fToggle","off");
        document.querySelector(".normalList").prepend(item);
    }     
    }
function modifyItem() {
    let select=document.querySelector("span").textContent;
    let item=document.querySelector(select);
    item.querySelector("h2").textContent=document.querySelector("#head").value;
    item.querySelector("p").textContent=document.querySelector("#contents").value;
    item.querySelector("p+br+p").textContent=document.querySelector("#diedtime").value;
    document.querySelector("#head").value="";
    document.querySelector("#contents").value="";
    document.querySelector("#diedtime").value="";
    document.querySelector(".over").style.display="inline-block";
    document.querySelector(".fixbt").style.display="none";
    document.querySelector("span").remove();
    toggleForm();
}
function topToggle(sec) {
    let item=document.querySelector(sec);
    let isTop=item.getAttribute("topToggle");
    let isFin=item.getAttribute("fToggle");
    if (isTop=="off") {
        item.style.backgroundColor="rgba(255,0,0,0.9)";
        item.getElementsByTagName("img")[0].style.display="block";
        item.getElementsByClassName("ontop")[0].textContent="取消置顶";
        document.querySelector(".topList").prepend(item);
        item.setAttribute("topToggle","on");
    }  else {
        item.style.backgroundColor="antiquewhite";
        item.getElementsByTagName("img")[0].style.display="none";
        item.getElementsByClassName("ontop")[0].textContent="置顶";
        document.querySelector(".normalList").append(item);
        item.setAttribute("topToggle","off");
    }
}
function addZero(check) {
    if (check<10) {
        check="0"+check;
    }
    return check;
}
function renderDate() {
    let date=new Date();
    let year=date.getFullYear();
    let month=addZero(date.getMonth()+1);
    return String(year)+String(month);
}

function createFrame() {
    let table=document.createElement("table");
    document.querySelector("body>nav+div").prepend(table);
    let line1=document.createElement("tr");
    table.append(line1);
    for (let i=0;i<7;i++) {
        let ca=document.createElement("th");
        ca.textContent=i;
        line1.append(ca);
    }
}
function analyseInput() {
    let intime = renderDate();
    let yearnow=intime.slice(0,4);
    let monthnow=intime.slice(4);
    let datefix = new Date(yearnow,monthnow-1,"01");
    let daynow=datefix.getDay();
    let getri=new Date(yearnow,monthnow,"0");
    let count=getri.getDate();
    return [daynow,count];
}
function writeIn(list) {
    let line2=document.createElement("tr");
    document.querySelector("table").append(line2);
    for(let i=0;i<list[0];i++) {
        let td=document.createElement("td");
        document.querySelector("table tr+tr").append(td);     
    }
    for(let i=1;i<=7-list[0];i++) {
        let td=document.createElement("td");
        td.textContent=i;
        document.querySelector("table tr+tr").append(td);
    }
    let cache=7-list[0];
    for(let i=1;i<(list[1]-7)/7+1;i++) {
        let newtr=document.createElement("tr");
        document.querySelector("table").append(newtr);
        for(let i=0;i<7;i++) {
            let newtd= document.createElement("td");
            newtd.textContent=cache+i+1;
            newtr.append(newtd);
        }
        cache+=7;
     }
    for(let i=0;i<35-list[1]-list[0];i++) {
    document.querySelectorAll("td")[list[1]+list[0]].remove()
    }
}
function markToday() {
    let date=new Date();
    let day=date.getDate();
    document.querySelectorAll("td")[day+1].style.backgroundColor="red";
}
function missile() {
    createFrame();
    writeIn(analyseInput());
    markToday();
}

document.getElementById("addbt").addEventListener("click",toggleForm);
document.querySelector(".over").addEventListener("click",addItem);
document.querySelector(".fixbt").addEventListener("click",modifyItem);
document.querySelector(".cancel").addEventListener("click",toggleForm);
document.querySelector("#nightmode").addEventListener("click",nightModeToggle);
document.querySelector("body").addEventListener("scroll",function() {
    document.querySelector(".calender").style.top=document.querySelector(".list").scrollTop;
})
let wrap=document.querySelectorAll(".wrap");
    document.querySelector(".closebt").addEventListener("click",function() {
    wrap[0].style.display="none";
},true) 
let rank=0;
goStudy();
missile();

let requests=new XMLHttpRequest();
requests.open("get","quote.json");
requests.send(null);
requests.onload=function() {
    let quotes=JSON.parse(requests.responseText);
    showQuote(quotes);
}

function showQuote(quotes) {
    let i=0;
    setInterval(function() {
        document.querySelector("i").innerText=quotes[i];
        i+=1;
        if(i==9) { i=0; }
    },3000) 
}


