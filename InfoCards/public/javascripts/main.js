// Create a function to display the categories - done
// Add category and subcategory in the card addition - done
// Link subcategory with card schema in the db - done


// Cards page

var categoryTree = {
	"javascript": ["react","node","vanilla"]
};

function generateUlElements() {
  var ulContent = document.createElement('ul');
  for(key of Object.keys(categoryTree)){
  	var li=document.createElement('li');
  	li.innerHTML = key;
    ulContent.appendChild(li);
    for(item of categoryTree[key]){
    	var insideLi = document.createElement('li');
    	insideLi.innerHTML = item;
    	li.appendChild(insideLi);
    }
  }
  return ulContent;
}

if(document.querySelector('.categories')){
	let categorySection = document.querySelector('.categories');
	let ulElm = generateUlElements();
	categorySection.appendChild(ulElm);
}



//  Add cards page

function createCategoryOptions(selectMenu){
  selectMenu.innerHTML+="<option value=''>Select</option>"
	for (key in categoryTree){
		selectMenu.innerHTML+= `<option value="${key}">${key}</option>`;
	}
}

function updateSubcategory(category, selectMenu){
  selectMenu.innerHTML = "";
  if (!category){
    selectMenu.innerHTML+="<option value=''>Select a category</option>";
  } else {
    for(item of categoryTree[category]){
      selectMenu.innerHTML+=`<option value="${item}">${item}</option>`;
    }
  }
}


if (document.querySelector('.category-select')){
	let categorySelect = document.querySelector('.category-select');
	createCategoryOptions(categorySelect);

  document.querySelector('.category-select').onchange = () => {
    let subcategorySelect = document.querySelector('.subcategory-select');
    selectedCategory = document.querySelector('.category-select').value;
    updateSubcategory(selectedCategory, subcategorySelect);
  };

}
