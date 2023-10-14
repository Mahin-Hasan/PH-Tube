const loadCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    // console.log(data.data);
    displayCategories(data);
}

const displayCategories = (categories) => {
    // console.log(category.data);
    const categoryContainer = document.getElementById('categories-container');
    const allData = categories.data;
    allData.forEach((category) => {
        // console.log(category.category);
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="loadPlaylist('${category?.category_id}')" class="btn btn-sm mr-2">${category?.category}</a>
        `;
        categoryContainer.appendChild(div);
    })
}

// Function to get Category Id Dynamically
const loadPlaylist = async (categoryID) => {
    // console.log(categoryID);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    const data = await res.json()
    // console.log(data.data);
    const allVideo = data.data;
    displayVideos(allVideo);

}

// display categories funciton
const displayVideos = (video) => {
    console.log(video);
    const videoContainer = document.getElementById('video-container');
    video.forEach((videos) => {
        console.log(videos)
        // console.log(videos.authors[0].profile_picture);
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl relative">
                <figure><img class="w-full h-[200px]" src="${videos.thumbnail}" alt="Shoes" />
                </figure>
                <h4 class="absolute right-0 top-44">something</h4>
                <div class="p-5">
                    <div class="flex">
                        <div class="mr-2">
                            <img class="w-14 h-14 rounded-full" src="${videos?.authors[0]?.profile_picture}" alt="">
                        </div>
                        <div>
                            <h2 class="card-title">${videos?.title}</h2>
                            <p></p>
                            <div class="flex">
                                <span class="mr-4">${videos?.authors[0]?.profile_name}</span>
                                <span>${videos?.authors[0]?.verified ? 'verified' : 'not verified'}</span>
                            </div>
                            <p><span class="mr-4">91k</span><span>views</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        videoContainer.appendChild(videoDiv);
    })
}

loadCategory();