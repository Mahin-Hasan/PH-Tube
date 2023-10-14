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
    console.log(categoryID);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    const data = await res.json()
    // console.log(data.data);
    const allVideo = data.data;
    displayVideos(allVideo);

}

// display categories funciton
const displayVideos = (video) => {
    console.log(video.length);
    const videoContainer = document.getElementById('video-container');
    const oppsContainer = document.getElementById('no-content');
    if (video.length === 0) {
        console.log('nothing')
        videoContainer.textContent = '';
        const oppsDiv = document.createElement('div');
        oppsDiv.innerHTML = `
        <div class="flex flex-col items-center text-center justify-center mt-28">
            <img src="images/Icon.png">
            <h1 class="text-3xl font-semibold mt-4">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `;
        oppsContainer.appendChild(oppsDiv);

    }
    else {

        // Clearing previously clicked items
        oppsContainer.textContent = '';
        videoContainer.textContent = '';
        video.forEach((videos) => {
            // trying seconds to hours
            const inSeconds = videos.others.posted_date;
            const inSecondsToNumber = +inSeconds;
            const inHours = inSecondsToNumber / 3600;
            const inMinutes = (inSecondsToNumber % 3600) / 60;
            const inSecond = inSeconds % 60;

            const totalHours = `${inHours.toFixed(0)}hrs ${inMinutes.toFixed(0)} min ${inSecond}s ago`
            const videoDiv = document.createElement('div');
            videoDiv.innerHTML = `
            <div class="card w-full bg-base-100 shadow-xl relative">
                    <figure><img class="w-full h-[200px]" src="${videos.thumbnail}" />
                    </figure>
                    <h4 class="absolute right-2 top-40 bg-slate-800 p-1 rounded-lg text-white">${videos.others.posted_date ? totalHours : ''}</h4>
                    <div class="p-5">
                        <div class="flex">
                            <div class="mr-2">
                                <img class="w-14 h-14 rounded-full" src="${videos?.authors[0]?.profile_picture}" alt="">
                            </div>
                            <div>
                                <h2 class="card-title">${videos?.title}</h2>
                                <p></p>
                                <div class="flex">
                                    <span class="mr-3">${videos?.authors[0]?.profile_name}</span>
                                    <span>${videos?.authors[0]?.verified ? '<i class="fa-solid fa-check bg-blue-700 rounded-full text-white"></i>' : ''}</span>
                                </div>
                                <p><span class="mr-2">${videos.others.views}</span><span>views</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            videoContainer.appendChild(videoDiv);
        })
    }

}

loadCategory();
// initially loading All
loadPlaylist('1000');