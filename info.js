//validation form inputs before submiting data

function isPresent(pl, email)
{
    pl.forEach((e) => {
        if(e.email == email)
        return false;
    })
}

function validateForm()
{
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    

    let peopleList;
    if(localStorage.getItem("peopleList") == null)
    {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
        if(!isPresent(peopleList, email))
        {
            alert("Email is already present")
            return false;
        }
    }


    console.log(name);
    console.log(age);
    console.log(email);
    console.log(address);
    if(name == "")
    {
        console.log("1valid")
        alert("Name is required");
        return false;
    }

    if(age == "")
    {
        console.log("2valid")
        alert("Age is required");
        return false;
    }
    else if(age<1)
    {
        console.log("3valid")
        alert("Age can't be in decimals or less than zero");
        return false;
    }

    if(address == "")
    {
        console.log("4valid")
        alert("Address is required");
        return false;
    }

    if(email == "")
    {
        console.log("5valid")
        alert("Email is required");
        return false;
    }
    
    return true;
}

//function to show Data
function showData()
{
    let peopleList;
    if(localStorage.getItem("peopleList") == null)
    {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    let html = "";

    peopleList.forEach((ele, indx) => {
        html += `<tr>
                    <td>${ele.name}</td>
                    <td>${ele.age}</td>
                    <td>${ele.address}</td>
                    <td>${ele.email}</td>
                    <td>
                        <button onclick="deleteData(${indx})" 
                        class= "btn btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </button>
                        <button onclick="updateData(${indx})" 
                        class= "btn btn-warning m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>
                    </td>
                </tr>`;

    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads all data when document or page loaded
document.onload = showData();


//function to add data 
function AddData()
{
    
    //if form is validate
    if(validateForm() == true)
    { 
        console.log("valid");
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        
        let peopleList;
        if(localStorage.getItem("peopleList") == null)
        {
            peopleList = [];
        }
        else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name :  name,
            age: age,
            address: address,
            email: email,

        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

//function to delete Data from local storage
function deleteData(index)
{
    let peopleList;
    if(localStorage.getItem("peopleList") == null)
    {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    console.log(peopleList);
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//function to update/edit data in local storage
function updateData(index)
{
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;
    if(localStorage.getItem("peopleList") == null)
    {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;


    document.querySelector("#Update").onclick = () => {
        if(validateForm() == true)
        {   
            console.log("hey1")
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
    
}
