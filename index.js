import mocData from "./mocData.js"

// var displayDropDownBox = false;
let searchBox = document.getElementById("search-input-box");
const data = mocData && mocData.mocData;

//- prepare drop down
const prepareItemList = (data, tag) => {
  if (data && data instanceof Array) {
    for (let i = 0; i < data.length; i++) {
      let span = document.createElement("span");
      span.textContent = data[i];
      span.style.marginLeft = "5px";
      tag.appendChild(span);
    }
  }
};

const prepareDropDown = mocData => {
  let ul = document.getElementById("dropDonwn");
  for (let elem = 0; elem < mocData.length; elem++) {
    let li = document.createElement("li");
    for (let key in mocData[elem]) {
      let a = document.createElement("a");
      let data = mocData[elem];
      let items = data && data.items;
      if (key == "items") {
        prepareItemList(items, a);
      } else {
        a.textContent = data && data[key];
      }
      a.setAttribute.href = "#";
      li.appendChild(a);
    }
    ul.appendChild(li);
  }
};
prepareDropDown(data);

//- hide and display drop down
const handleHideAndDisplayDropDown = () => {
  let dropDownBox = document.getElementById("dropDonwn");
  dropDownBox.className = "display-drop-down";
};

//- search algorithm
const Search = (userInput, li, ul) => {
  let isResultFound = false;
  let noResultFound = document.getElementById("no-data-found-dropDonwn");
  for (let i = 0; i < li.length; i++) {
    let p = li[i].getElementsByTagName("a");
    let str = "";
    for (var j = 0; j < p.length; j++) {
      let currentNode = p[j];

      //-search string for items
      let itemstag = currentNode.getElementsByTagName("span");
      if (itemstag.length) {
        for (var k = 0; k < itemstag.length; k++) {
          str += itemstag[i];
        }
      }

      let txtValue = currentNode.textContent || currentNode.innerText;
      str += txtValue;
      if (str.toUpperCase().indexOf(userInput) > -1) {
        li[i].style.display = "block";
        isResultFound = true;
      } else {
        li[i].style.display = "none";
      }
    }
  }
  if (!isResultFound) {
    noResultFound.className = "display-drop-down";
  } else {
    noResultFound.className = "hide-drop-down";
  }
};

//- dropdown handling
const handleDropDonw = () => {
  handleHideAndDisplayDropDown();
  var input, userInput, ul, li;
  input = document.getElementById("search-input-box");
  userInput = input.value.toUpperCase();
  ul = document.getElementById("dropDonwn");
  li = ul.getElementsByTagName("li");
  if (userInput && userInput.length > 0) {
    ul.style.display = "block";
    Search(userInput, li, ul);
  } else {
    ul.style.display = "none";
  }
};

searchBox.addEventListener("keyup", handleDropDonw);

document.addEventListener("click", function(e) {
  let onClickedElementId = e.target.id;
  let dropDownBox = document.getElementById("dropDonwn")
  if (onClickedElementId !== "search-input-box") {
    dropDownBox.className = "hide-drop-down ";
  }
});