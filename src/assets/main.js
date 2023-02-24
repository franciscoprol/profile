const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCuP4RwXqZYAc9c4DxeCY7Rw&part=snippet%2Cid&order=date';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
        'X-RapidAPI-Key': "333ffe8b6fmsh6714a7c76a6595cp13cd7cjsnffd57c2aac3a",
		'X-RapidAPI-Host': "youtube-v31.p.rapidapi.com"
	}
};



/*##########################
Funtion calling API
##########################*/
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}



/*#############################
Function call: fetchData
#############################*/
//Function must call itself
(async () => {

    try {

        //Call API
        const videos = await fetchData(API);

        //Generate a template (Show only last 10 videos)
        let view = `
        ${videos.items.map(video => `
            <a href=https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0,25).join('')}
        
        `;

        //Insert the template code in the HTML
        content.innerHTML = view;

    } catch (error) {

        console.log(error);

    }

})();