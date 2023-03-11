//Catch event click to see user detail
const timeShowMess = 4000
const a = document.querySelectorAll('.idUser')
const mess = document.getElementById("mess")
const del = document.querySelectorAll('.deleteUser')
const upda = document.querySelectorAll('.updateUser')
const search = document.getElementById('search')

//console.log(a)
for (let i = 0; i < a.length; i++) {
    //console.log(a[i])
    a[i].addEventListener("click", function (event) {
        event.preventDefault()
        //console.log(a[i].id)
        window.location.href = `/public-api/users/${a[i].id}`
    })
}

//Delete
for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", function (event) {
        event.preventDefault()
        let id = del[i].id.slice(1) //Get id correctly of user 
        //console.log(id)
        let cfm = confirm(`Chắc chắn muốn xóa người dùng với id ${id}?`)
        if (!cfm)
            return
        fetch(`/public-api/users/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data.code) //1 là success, 0 là err
                //console.log(data.message)
                document.getElementById("mess").innerText = data.message
            })
            .catch((err) => {
                console.error("Error: ", err)
            })
    })
}

//Update
for (let i = 0; i < upda.length; i++) {
    upda[i].addEventListener("click", function (event) {
        event.preventDefault()
        let id = del[i].id.slice(1) //Get id correctly of user 
        window.location.href = `/public-api/users/edit/${id}`
    })
}

//Show message
if (mess.innerText.trim() != "") {
    //Show message
    showMess()
}

//Show mess when mess change
$('#mess').on('DOMSubtreeModified', function () {
    showMess()
    setTimeout(function () {
        location.reload()
    }, timeShowMess)
})

function showMess() {
    $(".alert").show('medium');
    setTimeout(function () {
        $(".alert").hide('medium');
    }, timeShowMess)
}

search.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let idUs = search.value.trim()
        event.preventDefault() //No event to do, but write to ensure
        window.location.href = `http://localhost:8081/public-api/users/${idUs}`
    }
})