
let activeOrFalse = false;

let formFun = () => {

    const form = document.querySelector('#form')
    let mainDiv = document.createElement('div');

    mainDiv.setAttribute("id", "students-list")
    
    document.getElementById("form").addEventListener("submit", (event) => {
        event.preventDefault();

        let button = document.createElement('button')
        let deleteButton = document.createElement('button')
        let newDiv = document.createElement('div');
        let ul = document.createElement("ul")

        button.setAttribute("id", "dataInfo")
        deleteButton.setAttribute("id", "dataDeletion")
        newDiv.setAttribute("id", "student-item")
        button.textContent = "Slepti asmens duomenys"
        deleteButton.textContent = "Delete this child from Existence"
    
        for (let i = 0; i < form.elements.length; i++) {
            
            let input = form.elements[i];
            if((input.type === "checkbox" && input.checked) || (input.value !== "" && input.type !== "radio")){
                let label = document.querySelector(`label[for="${input.id}"]`); 
                if(label) {

                    let listItem = document.createElement("li")
                    listItem.textContent = `${label.textContent}: ${input.value}`;
                    ul.appendChild(listItem);
                }
            }
            
        }

        button.addEventListener("click", () => {updateListItems(ul)} )
        deleteButton.addEventListener("click", () => {
            let firstNameInput = document.querySelector('input[name="fname"]');
            let lastNameInput = document.querySelector('input[name="lname"]');

            let p = document.createElement('p')
            p.textContent = `Studentas ${firstNameInput.value} ${lastNameInput.value} sėkmingai ištrintas.`
            mainDiv.appendChild(p);
            newDiv.remove();
            setTimeout(() => {
                p.remove();
            }, 5000);
        })


        newDiv.appendChild(ul);
        newDiv.appendChild(button);
        newDiv.appendChild(deleteButton)
        mainDiv.appendChild(newDiv);
        document.body.appendChild(mainDiv)
    })

}

formFun();



let maskedData = (email, phone) => {
    let element = document.querySelector("#dataInfo");
        if(activeOrFalse){
            element.textContent = "Slepti asmens duomenys";
            activeOrFalse=false;
            return [email, phone];
        }
        else {
            activeOrFalse=true;
            element.textContent = "Rodyti asmens duomenys";
            let maskedEmail = '*'.repeat(email.length);
            let maskedPhone = '*'.repeat(phone.length);
            return [maskedEmail, maskedPhone];
        }
}

let updateListItems = (ul) => {
    let emailInput = document.querySelector('input[type="email"]');
    let phoneInput = document.querySelector('input[type="tel"]');
    console.log(emailInput.value)
    let [email, phone] = maskedData(emailInput.value, phoneInput.value);
    console.log(phone)

    let listItems = ul.getElementsByTagName("li");

    listItems[4].textContent = `Email: ${email}`;
    listItems[3].textContent = `Phone: ${phone}`;
}


// TREČIA DALIS:
// 1. Vietoje el. pašto ir tel. numerio rodyti tik žvaigždutes „****".
// 2. Kiekviename „student-item" elemente sukurti mygtuką „Rodyti asmens duomenis".
// 3. Paspaudus šį mygtuką:
//     3.1. Parodyti to studento el. paštą ir tel. numerį.
//     3.2. Pakeist mygtuko tekstą į „Slėpti asmens duomenis".
// 4. Jeigu asmens duomenys yra rodomi, tai paspaudus mygtuką:
//     4.1. Paslėpti asmens el. paštą ir tel. numerį.
//     4.2. Mygtuko tekstą pakeisti į „Rodyti asmens duomenis".

// KETVIRTA DALIS (studento ištrynimas):
// 1. Prie kiekvieno sukurti studento elemento pridėti mygtuką „Ištrinti studentą".
// 2. Paspaudus šį mygtuką, studento elementas yra ištrinamas.
// 3. Ištrynus studentą, turi iššokti <span> elementas, kuris informuoja apie studento ištrynimą: „Studentas (Vardas Pavardė) sėkmingai ištrintas.". Šis span elementas dingsta po 5 sekundžių.