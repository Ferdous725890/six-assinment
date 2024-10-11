const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const loadCategoryPet = (id) => {
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeClass();
            const HoverBtn = document.getElementById(`btn-${id}`);
            HoverBtn.classList.add('hoverpets-btn');
            displayAllPetsData(data.data);
        })
        .finally(() => hideSpinner()) // Hide the spinner after the fetch is done
        .catch(error => {
            console.log(error);
            hideSpinner(); // Ensure spinner is hidden even on error
        });
};

const sortPetsByPrice = () => {
    showSpinner();
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            let pets = data.pets;

            if (!isSortedByPrice) {
                pets.sort((a, b) => b.price - a.price);
                isSortedByPrice = true;
            } else {
                loadAllPetsData(); // Reset to original order
                return; // Exit the function
            }
            displayAllPetsData(pets);
        })
        .finally(() => hideSpinner()) // Hide the spinner after the fetch is done
        .catch(error => {
            console.log(error);
            hideSpinner(); // Ensure spinner is hidden even on error
        });
};

const loadcategoriesData = () => {
    showSpinner(); // Show spinner before fetching data
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayShow(data.categories))
        .catch(error => console.log(error))
        .finally(() => hideSpinner()); // Hide spinner after data is loaded
};

const loadAllPetsData = () => {
    showSpinner(); // Show spinner before fetching data
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPetsData(data.pets))
        .catch(error => console.log(error))
        .finally(() => hideSpinner()); // Hide spinner after data is loaded
};





const likeBtn = (petId, imageUrl) => {
    const petsAllData = document.getElementById('like-pets');
    const likedPetDiv = document.createElement('div');
    likedPetDiv.className = "liked-pet mb-4";
    likedPetDiv.innerHTML = `
        <img class="rounded-[8px] h-full w-full" src="${imageUrl}" alt="Liked pet image">
    `;
    petsAllData.appendChild(likedPetDiv);
   
};

// const loadcategoriesData = () => {
//     fetch('https://openapi.programming-hero.com/api/peddy/categories')
//         .then(res => res.json())
//         .then(data => displayShow(data.categories))
//         .catch(error => console.log(error))
        
// }

// const loadAllPetsData = () => {
//     fetch('https://openapi.programming-hero.com/api/peddy/pets')
//         .then(res => res.json())
//         .then(data => displayAllPetsData(data.pets))
//         .catch(error => console.log(error))
// }



const removeClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for (btnButton of buttons) {
        btnButton.classList.remove('hoverpets-btn')
    }

}

// const loadCategoryPet = (id) => {
//    console.log("this is id", id);
//     fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
//         .then(res => res.json())
//         .then(data => {
//             removeClass()
//             const HoverBtn = document.getElementById(`btn-${id}`)
//             HoverBtn.classList.add('hoverpets-btn')
//             displayAllPetsData(data.data)
//             .catch(error => console.log(error))
//         })
// };



const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(data => displayDetails(data.petData))
        .catch(error => console.error(error)); // Make sure to log errors
};

const displayDetails = (petData) => {
    console.log(petData);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
        <img class='w-full rounded-lg mb-5' src="${petData.image}" alt="Pet Image"/>
        <div class='grid grid-cols-2 mb-4'>
        <div class="flex mb-1 items-center"><p class='mb-1'><div> <img class='mr-2' src="images/Frame (1).png"></div> Breed:${petData.breed}</p></div>
        <div class="flex mr-2 items-center"><p><div><img src="images/gender.png"></div> Gender:${petData.gender}</p></div>
        <div class="flex mb-1 mr-2 items-center"><p><div><img class='mr-2' src="images/birth.png"></div> Birth:${petData.date_of_birth}</p></div>
        <div class="flex mr-2 items-center"><p><div><img src="images/price.png"></div> Price: ${petData.price}</p></div>
      
        </div>
        <div class="divider"></div>
        <div>
        <p class='text-lg font-black mb-5'>Details Information</p>
        <p>Vaccinated status:${petData.pet_details}</p>
        
        </div>

    `;
    document.getElementById('my_modal_5').showModal();
};

document.addEventListener("DOMContentLoaded", () => {
    // You can add any additional initialization code here
});


const displayAllPetsData = (pets) => {
    const petsAllData = document.getElementById('All-Pets')
    if (pets.length == 0) {
        petsAllData.classList.remove('grid')
        petsAllData.innerHTML = `
             <div class="max-h-[400px] max-w-[780px] w-full h-full bd flex flex-col gap-5 justify-center items-center">
                <img src="images/error.webp" alt="">
                <h1 class="text-xl font-black">No Information Available</h1>
                <p class="text-sm font-medium">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `
        return
    } else {
        petsAllData.classList.add('grid')
    }
    petsAllData.innerHTML = ""
    pets.forEach(pet => {
        // console.log(pet);
        const card = document.createElement('div')
        card.classList = 'card'
        card.innerHTML = `

                <div class="card glass p-4">
                <figure>
                    <img class='w-full rounded-lg object-cover' src="${pet.image}" alt="Image of ${pet.breed}" />
                </figure>
                <div class="mt-3">
                    <p class="card-title text-xl font-black">
                        ${pet.pet_name}
                    </p>
                   <p class='flex-row mt-2'>
                    <img class='me-2' src="/images/Frame (1).png" />
                     Breed: <span class="${pet.breed && pet.breed.length > 0 ? '' : 'text-red-500'}">
                     ${pet.breed && pet.breed.length > 0 ? pet.breed : 'Not found !'}
                    </span>
                    </p>
                    <div class='flex'>
                    <p class='flex-row'>
                    <img class='me-2' src="/images/birth.png" />
                        Birth:<span class="${pet.date_of_birth && pet.date_of_birth.length > 0 ? '' : 'text-red-500'}">
                        ${pet.date_of_birth && pet.date_of_birth.length > 0 ? pet.date_of_birth : 'Not found !'}
                    </span>
                    </p>
                    </div>

                    <p class='flex-row'>
                        <img class='me-2' src="/images/gender.png"/>
                       Gender:<span class="${pet.gender && pet.gender.length > 0 ? '' : 'text-red-500'}"> 
                        ${pet.gender && pet.gender.length > 0 ? pet.gender : "Gender Not available !"}
                        </span>
                    </p>
                    <p class='flex-row'>
                        <img class='me-2' src="/images/price.png" alt="Price icon" />
                        Price: <span class="${pet.price > 0 ? '' : 'text-red-500'}"> 
                        ${pet.price > 0 ? pet.price : "price Not found.."}
                        </span>
                    </p>
                    <div class='flex-row justify-between mt-4'>
                     <button onclick="likeBtn('${pet.petId}', '${pet.image}')" class="text-[18px] text-[#0E7A81] text-btn-primary px-5 py-2 border             border-solid border-[rgb(14, 122, 129, 0.15)] rounded-[8px] text-xl font-bold">
                        <i class="fa-regular fa-thumbs-up"></i>
                        </button>
                        <button class="btn text-[#0E7A81]" onclick="adopt()">Adopt</button>
                        <button onclick="loadDetails(${pet.petId})" class="btn text-[#0E7A81]">Details</button>
                    </div>
                </div>
            </div>
    
    `;
        petsAllData.appendChild(card)
    });
}







let isSortedByPrice = false; 


const displayShow = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('mb-24','flex','items-center','container','justify-center')
        buttonContainer.innerHTML = `

        <button id="btn-${item.category}" onclick="loadCategoryPet('${item.category}')" class='flex categories-button rounded-2xl items-center justify-center gap-2 py-3 px-14 category-btn text-xl font-black'>
        ${item.category}
        <div class='w-10 h-12'> <img class='w-14' src="${item.category_icon}" </div>
        </button>
        `;
       
        categoryContainer.appendChild(buttonContainer);
    });
};



loadcategoriesData()
loadAllPetsData()

const adopt = () => {
    let num = 3; 
    const time = document.getElementById('time');

  
    time.textContent = num;

    const clockTime = setInterval(() => {
        num--; 
        if (num < 0) { 
            clearInterval(clockTime);
            document.getElementById("my_modal_1").close();l
            return; 
        }
        time.textContent = num; 
    }, 1000);

    document.getElementById("my_modal_1").showModal();
}

