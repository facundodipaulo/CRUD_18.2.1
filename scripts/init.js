document.addEventListener('DOMContentLoaded', function() {

    const ServerKey = `6544ee515a0b4b04436d3fe2`;
    const URL = `https://${ServerKey}.mockapi.io/users`;
    const btnGet1 = document.getElementById('btnGet1');
    const inputGet1Id = document.getElementById('inputGet1Id');
    const results = document.getElementById('results');
    const alertError = document.getElementById('alert-error');
    const inputPostName = document.getElementById('inputPostNombre');
    const inputPostLastName = document.getElementById('inputPostApellido');
    const btnPost = document.getElementById('btnPost');
    const addForm = document.getElementById('addForm');
    const inputPutId = document.getElementById('inputPutId');
    const btnPut = document.getElementById('btnPut');
    const dataModal = document.getElementById('dataModal');
    const myModal = new bootstrap.Modal(dataModal);
    const modalName = document.getElementById('inputPutNombre');
    const modalLastName = document.getElementById('inputPutApellido');
    let modalId = 0;
    const modalBtn = document.getElementById('btnSendChanges');
    const modalForm = document.getElementById('modalForm');
    let oldModalName;
    let oldModalLastName;
    const inputDelete = document.getElementById('inputDelete');
    const btnDelete = document.getElementById('btnDelete');

    btnDelete.addEventListener('click', function() {

        inputDeleteId = inputDelete.value


        deleteUser(inputDeleteId);
        selectedId = "";
        setTimeout(function() {
            getUser();
        }, 1000);
    });

    inputDelete.addEventListener('input', function () {
        if (inputDelete.value !== "") {
            btnDelete.disabled = false;
        } else {
            btnDelete.disabled = true;
        }
    });



    addForm.addEventListener('input', function () {
        if (inputPostName.value !== "" && inputPostLastName.value !== "") {
            btnPost.disabled = false;
        } else {
            btnPost.disabled = true;
        }
    });

    modalForm.addEventListener('input', function () {
        if (modalName.value !== "" && modalLastName.value !== "") {
            modalBtn.disabled = false;
        } else {
            modalBtn.disabled = true;
        }
    });



    inputPutId.addEventListener('input', function () {
        if (inputPutId.value !== "") {
            btnPut.disabled = false;
        } else {
            btnPut.disabled = true;
        }
    });

    btnPut.addEventListener('click', function() {
        console.log("Botón de Modificar clickeado");
        modalId = inputPutId.value;
    
        fetch(URL + `/${modalId}`)
            .then(response => response.json())
            .then(data => {
                if (parseInt(modalId) <= data.length) {

                oldModalName = data.name;
                oldModalLastName = data.lastname;
                modalName.value = oldModalName;
                modalLastName.value = oldModalLastName;
                myModal.show();
                } else { 
                console.log("No se puede modificar: ID fuera de rango");
                alertError.classList.add('show');
                setTimeout(function() {
                    alertError.classList.remove('show');
                }, 3000);
            }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    });

    modalBtn.addEventListener('click', function() {
        modifyUser(modalId);
        myModal.hide();
        selectedId = "";
        setTimeout(function() {
            getUser();
        }, 1000);
    })



    //GET

    function getUser() {

        const selectedId = inputGet1Id.value

        fetch(URL)
        .then(response => response.json())
        .then(data => {


            if (selectedId === "") {

                results.innerHTML = ""

                data.forEach(user => {
                results.innerHTML += `
                <p>
                ID: ${user.id}<br>
                NAME: ${user.name}<br>
                LASTNAME: ${user.lastname}<br>
                </p>
                `
                });
            } else if (parseInt(selectedId) <= data.length) {
                results.innerHTML = ""
                console.log(selectedId);
                let specificUser = data.find(user => user.id === selectedId);
                results.innerHTML += `
                <p>
                ID: ${specificUser.id}<br>
                NAME: ${specificUser.name}<br>
                LASTNAME: ${specificUser.lastname}<br>
                </p>
                `
            } else {

                console.log("Ese valor no se encuentra en los datos almacenados")
                alertError.classList.add('show');
                setTimeout(function() {
                    alertError.classList.remove('show'); // Ocultar la alerta
                  }, 3000);
            }
        })
    }

    btnGet1.addEventListener('click', getUser);

    //POST

    function addUser() {
        let addUserName = inputPostName.value;
        let addUserLastName = inputPostLastName.value;
    
        const newUser = {
            name: addUserName,
            lastname: addUserLastName
        };
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        };
    
        fetch(URL, options)
            .then(response => response.json())
            .then(data => {
                results.innerHTML = ''; // Limpiar el contenedor de resultados
                selectedId = "";
                getUser();
            })
            .catch(error => {
                console.error('Error al agregar usuario:', error);
            });
    }

    btnPost.addEventListener('click', function(e) {
        addUser();
        e.preventDefault();
    });

    //PUT

    function modifyUser(userId) {

        let modifyUserName = modalName.value;
        let modifyUserLastName = modalLastName.value;
    
        const newUser = {
            name: modifyUserName,
            lastname: modifyUserLastName
        };
    
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        };

        fetch(URL+`/${modalId}`, options)
            .then(response => response.json())
            .then(data => {
                console.log('exito');

            })

    }

    //DELETE

    function deleteUser(userId) {
            fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (parseInt(userId) <= data.length) {
                    const options = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
        
                    fetch(URL+`/${userId}`, options)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Usuario eliminado con éxito');
                            getUser();
                        })
                        .catch(error => {
                            console.error('Error al eliminar usuario:', error);
                        });
                } else {
                    console.log("No se puede eliminar: ID fuera de rango");
                    alertError.classList.add('show');
                    setTimeout(function() {
                        alertError.classList.remove('show');
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error al obtener la lista de usuarios:', error);
            });
    }
    

    



});