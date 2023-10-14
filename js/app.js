const loadCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    console.log(data.data);
    displayCategories(data);
}

const displayCategories =(categories)=>{
    // console.log(category.data);
    const categoryContainer = document.getElementById('categories-container');
    const allData = categories.data;
    allData.forEach((category)=>{
        // console.log(category.category);
        const div = document.createElement('div');
        div.innerHTML=`
        <a class="btn btn-sm mr-2">${category.category}</a>
        `;
        categoryContainer.appendChild(div);
    })
}

    loadCategory();