const likeBtn = (petId, imageUrl) => {
    const petsAllData = document.getElementById('like-pets');
    const likedPetDiv = document.createElement('div');
    likedPetDiv.className = "liked-pet mb-4";
    likedPetDiv.innerHTML = `
        <img class="rounded-[8px] h-full w-full" src="${imageUrl}" alt="Liked pet image">
    `;
    petsAllData.appendChild(likedPetDiv);
};

const loadcategoriesData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayShow(data.categories))
        .catch(error => console.log(error))
        
}
const loadAllPetsData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPetsData(data.pets))
        .catch(error => console.log(error))
}


const removeClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for (btnButton of buttons) {
        btnButton.classList.remove('hoverpets-btn')
    }

}

const loadCategoryPet = (id) => {
   console.log("this is id", id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeClass()
            const HoverBtn = document.getElementById(`btn-${id}`)
            HoverBtn.classList.add('hoverpets-btn')
            displayAllPetsData(data.data)
        })
        .catch(error => console.log(error))
};



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
             <div class="h-[400px] w-[780px]  bd flex flex-col gap-5 justify-center items-center">
                <img src="images/error.webp" alt="">
                <h1 class="">No Information Available</h1>
                <p class="">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
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

                <div class="card glass p-4 ">
                <figure>
                    <img class='w-full rounded-lg object-cover' src="${pet.image}" alt="Image of ${pet.breed}" />
                </figure>
                <div class="card-body">
                    <p class="card-title text-xl font-black">
                        ${pet.pet_name}
                    </p>
                   <p class='flex-row'>
                    <img class='me-2' src="/images/Frame (1).png" />
                     Breed: <span class="${pet.breed && pet.breed.length > 0 ? '' : 'text-red-500'}">
                     ${pet.breed && pet.breed.length > 0 ? pet.breed : 'Not found !'}
                    </span>
                    </p>
                    <div class='flex'>
                    <p class='flex-row'>
                    <img class='me-2' src="/images/Frame (1).png" />
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

// const displayShow = (categories) => {
//     const categoryContainer = document.getElementById('categories');
//     categories.forEach(item => {
//         const buttonContainer = document.createElement('div');
//         buttonContainer.classList.add('mb-20','w-4/5','flex','items-center')
//         buttonContainer.innerHTML = `

//         <button  class='flex categories-button rounded-2xl items-center gap-4 py-3 px-16 category-btn id="btn-${item.category}" onclick="loadCategoryPet('${item.category}')"'>
//         ${item.category}
//         <div class='w-14 h-14'> <img class='w-14' src="${item.category_icon}" </div>
//         </button>
//         `;

//         categoryContainer.appendChild(buttonContainer);
//     });
// };

const displayShow = (categories) => {
    const categoryContainer = document.getElementById('categories'); 
    categories.forEach(item => {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('mb-24','w-4/5','flex','items-center','p-10')
        buttonContainer.innerHTML = `

        <button id="btn-${item.category}" onclick="loadCategoryPet('${item.category}')" class='flex categories-button rounded-2xl items-center gap-4 py-3 px-16 category-btn text-xl font-black '>
        ${item.category}
        <div class='w-14 h-14'> <img class='w-14' src="${item.category_icon}" </div>
        </button>
        `;
       
        categoryContainer.appendChild(buttonContainer);
    });
};



loadcategoriesData()
loadAllPetsData()

const adopt = () => {
    let num = 3; // Start from 3
    const time = document.getElementById('time');

    // Update the text content immediately to show 3
    time.textContent = num;

    const clockTime = setInterval(() => {
        num--; // Decrease num by 1
        if (num < 0) { // Check if num is less than 0
            clearInterval(clockTime);
            document.getElementById("my_modal_1").close(); // Close the modal
            return; // Exit the function
        }
        time.textContent = num; // Update displayed number
    }, 1000);

    document.getElementById("my_modal_1").showModal();
}









// const adopt = () =>{
//     let num = 4;
// const time = document.getElementById('time');
// const clockTime = setInterval(() => {
//     num--;
//     if (num <= 0) {
//         clearInterval(clockTime);
//     }
//     time.textContent = num;
// }, 1000);

// document.getElementById("my_modal_1").showModal()
// }







// const loadDetails = (petId) => {
//     fetch('https://openapi.programming-hero.com/api/peddy/pet/5')
//         .then(res => res.json())
//         .then(data => desplayDetails(data.petData))
//         // .catch(error => console(error))
// }
// const desplayDetails = (petData) => {
//     console.log(petData);
//     const detailsConteiner = document.getElementById('modal-content')
//     detailsConteiner.innerHTML = `
// <img src=${petData.image}/>
// <p>${petData.breed}</p>
// <p>${petData.date_of_birth}</p>
// <p>${petData.price}</p>
// <p>${petData.gender}</p>
// <p>${petData.pet_details}</p>
// `
// document.getElementById('my_modal_5').showModal();
  
// }