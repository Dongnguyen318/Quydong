const dragList = document.getElementById("dragList");
let draggedItem = null;

// Add event listeners for drag and drop events
dragList.addEventListener("dragstart", handleDragStart);
dragList.addEventListener("dragover", handleDragOver);
dragList.addEventListener("drop", handleDrop);

// Drag start event handler
function handleDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
  event.target.style.opacity = "0.5";
}

// Drag over event handler
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  const targetItem = event.target;
  if (
    targetItem !== draggedItem &&
    targetItem.classList.contains("list-item")
  ) {
    const boundingRect = targetItem.getBoundingClientRect();
    const offset = boundingRect.y + boundingRect.height / 2;

    if (
      targetItem !== draggedItem &&
      targetItem.classList.contains("list-item")
    ) {
      if (
        event.clientY >
        targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
      ) {
        targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
      } else {
        targetItem.parentNode.insertBefore(draggedItem, targetItem);
      }
    }
  }
}

// Drop event handler
function handleDrop(event) {
  event.preventDefault();
  const targetItem = event.target;
  if (
    targetItem !== draggedItem &&
    targetItem.classList.contains("list-item")
  ) {
    if (
      event.clientY >
      targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
    ) {
      targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    } else {
      targetItem.parentNode.insertBefore(draggedItem, targetItem);
    }
  }
  targetItem.style.borderTop = "";
  targetItem.style.borderBottom = "";
  draggedItem.style.opacity = "";
  draggedItem = null;
  autoIndex(false);
}
const autoIndex = function (isFirstLoad) {
  //auto index for all module
  const modules = [...document.querySelectorAll(".list-item.active")];
  modules.forEach((module, index) => {
    if (isFirstLoad) {
      module.innerHTML = `Module <span>${index + 1}</span>  : ${
        module.innerText
      }`;
    } else {
      module.children[0].innerText = index + 1;
    }
  });
  //   //auto index for all list-item not index
  //   const items = [...document.querySelectorAll(".list-item:not(.active)")];
  //   items.forEach((item, index) => {
  //     if (isFirstLoad) {
  //       item.innerHTML = `Bài <span>${index + 1}</span> : ${item.innerText} `;
  //     } else {
  //       item.children[0].innerText = index + 1;
  //     }
  //   });
};
autoIndex(true);
