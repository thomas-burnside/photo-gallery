const btnEl = document.getElementById("btn");
const errorEl = document.getElementById("error");
const galleryEl = document.getElementById("gallery");
const inputEl = document.getElementById("number"); 

accessKey = "C9d9_w_TYLR39YgtYeymEiDENhM72TnNfCK1HAnoYyA";

async function fetchImage() {
    const inputValue = inputEl.value;
    if (inputValue > 10 || inputValue < 1) {
        errorEl.style.display = "block";
        return;
    }

    imgs = "";
    btnEl.disabled = true; 

    try {
        const loading = `<img src="spinner.svg"/>`
        galleryEl.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=${accessKey}`).
            then((res) => res.json()).
            then((data) => {
                if(data){
                    data.forEach((pic)=>{
                        imgs += `<img src="${pic.urls.small}" alt="image"/>`;
                        galleryEl.innerHTML = imgs;
                    })
                }
            });
        errorEl.style.display = "none";
    } catch (error) {
        console.log(error);
        errorEl.style.display = "block";
        errorEl.innerHTML = "An error happened, try again later";
    } finally{
        btnEl.disabled = false;

    }
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents form submission (if inside a form)
        fetchImage(); // Calls fetchImage directly
    }
}


    btnEl.addEventListener("click", fetchImage)
    inputEl.addEventListener("keydown", handleEnterKey);
