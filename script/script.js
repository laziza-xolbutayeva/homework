'use strict'

const   baseURL="http://localhost:3000/";

async function getUser(){
    try {
        const response=await fetch(`${baseURL}user`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result=await response.json();
        renderData(result)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    

    
}

getUser();

function renderData(data){
    data.forEach((item,i) => {
        const tr=createElements('tr','tr',`
        <th class="bg-info text-light">${i+1}</th>
        <td>${item.name}</td>
        <td>${item.id}</td>
        <td><button class="btn btn-outline-success fs-5 fw-semibold edit_btn" data-edit="${item.id}">Edit Name</button></td>
        <td><button class="btn btn-outline-danger fs-5 fw-semibold delete_btn" data-del="${item.id}">Delete</button></td>`);
        tr.dataset.id=item.id;
        $('#table_body').appendChild(tr)
    });
}

async function addUser(userName){
    try {
        fetch(`${baseURL}user`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:`${userName}`
            })
        })
    } catch (error) {
        console.log(error);
    }
}

$(".modals2").style.display="none";

$("#submit_btn").addEventListener("click",()=>{
    if($("#submit_text").value.trim().length!==0){
        addUser($("#submit_text").value);
    }
    else{
        $(".modals2").style.display="block";
        $(".exit2").addEventListener("click",()=>{
            $(".modals2").style.display="none";
        })
    }
})

async function deleteUser(id){
    try {
        fetch(`${baseURL}user/${id}`,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ })
        })
    } catch (error) {
        console.log(error);
    }
}

$(".modals").style.display="none";

$("#table_body").addEventListener("click",(e)=>{
    if(e.target.classList.contains('delete_btn')){
        deleteUser(e.target.getAttribute('data-del'))
    }else if(e.target.classList.contains('edit_btn')){
        
        $(".modals").style.display="block";
        $(".modal-btn").addEventListener("click",()=>{
            if($("#modal-text").value.trim().length!==0){
                editUser(e.target.getAttribute('data-edit'),$("#modal-text").value)
                $(".modals").style.display="none";
            }
            else{
                
            }
        })
        $(".exit").addEventListener("click",()=>{
            $(".modals").style.display="none";
        })
    }
})

async function editUser(id,text){
    try {
        fetch(`${baseURL}user/${id}`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ name:text })
        })
    } catch (error) {
        console.log(error);
    }
}
