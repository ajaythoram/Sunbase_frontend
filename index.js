
// Add function
function addElement(element) {
    const labelName = prompt('Enter label name:');
    const placeholder = prompt('Enter placeholder value:');
  
    if (!labelName) {
      alert('Label name cannot be empty!');
      return;
    }
  
    const listItem = document.createElement('div');
    listItem.draggable = true;
    listItem.classList.add('drag');
  
    const formItemsDiv = document.createElement('div');
    formItemsDiv.classList.add('form-items');
  
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('form-label-div');
  
    const label = document.createElement('label');
    label.textContent = labelName;
    label.classList.add('form-label');
  
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('form-btn');
    deleteBtn.textContent = 'delete';
    deleteBtn.addEventListener('click', () => {
      deleteItem(listItem);
    });
  
    labelDiv.appendChild(label);
    labelDiv.appendChild(deleteBtn);
  
    const formElement = document.createElement(element);
    formElement.classList.add('form-element');
    formElement.placeholder = placeholder;
  
    if (element === 'select') {
      const numOptions = parseInt(prompt('Enter number of options:'));
  
      if (!isNaN(numOptions) && numOptions > 0) {
        for (let i = 1; i <= numOptions; i++) {
          const option = document.createElement('option');
          option.textContent = prompt(`Enter option ${i}:`) || `Sample ${i}`;
          formElement.appendChild(option);
        }
      } else {
        alert('Please enter a valid number of options!');
        return;
      }
    }
  
    formItemsDiv.appendChild(labelDiv);
    formItemsDiv.appendChild(formElement);
    listItem.appendChild(formItemsDiv);
    document.getElementById('form-list').appendChild(listItem);
    initializeDragAndDrop();
  }
  
  function deleteItem(listItem) {
    listItem.remove();
  }
  
  document.getElementById('add-input').addEventListener('click', () => addElement('input'));
  document.getElementById('add-select').addEventListener('click', () => addElement('select'));
  document.getElementById('add-text').addEventListener('click', () => addElement('textarea'));

// Function to initialize drag and drop
function initializeDragAndDrop() {
    const draggables = document.querySelectorAll('.drag');
    
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
      
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
    
    const formList = document.getElementById('form-list');
    
    formList.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(formList, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        formList.appendChild(draggable);
      } else {
        formList.insertBefore(draggable, afterElement);
      }
    });
    
    // Enable drag and drop for input, textarea, and select elements
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('dragstart', () => {
        input.classList.add('dragging');
      });
      
      input.addEventListener('dragend', () => {
        input.classList.remove('dragging');
      });
    });
  }
 
  // Function to get the element to drop after
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  
  // Call initializeDragAndDrop function to set up drag and drop
  initializeDragAndDrop();

  // Save data

  function getFormData() {
    const formItems = document.querySelectorAll('.drag');
    const formData = [];

    formItems.forEach(item => {
        const id = generateUniqueId();
        console.log("id",id);
        const type = item.querySelector('.form-element').type || 'textarea';
        const labelElement = item.querySelector('.form-label');
        const label = labelElement ? labelElement.textContent.trim() : '';
        const placeholder = item.querySelector('.form-element').placeholder || '';

        formData.push({ id, type, label, placeholder });
    });
         console.log(formData);
    return formData;
}
  function generateUniqueId(){
         const FirstPart = Math.random().toString(36).substr(2,9);
         const TimePart = Date.now().toString(36);
         const unid = FirstPart+TimePart;
         return unid;
  }
 
   document.getElementById('save').addEventListener('click',()=> getFormData())
