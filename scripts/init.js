document.addEventListener('DOMContentLoaded', function() {

    const ServerKey = `6544ee515a0b4b04436d3fe2`;
    const getAll_addURL = `https://${ServerKey}.mockapi.io/users`;
    const getOne_modify_deleteURL = `https://${ServerKey}.mockapi.io/users/:id`;
    const btnGet1 = document.getElementById('btnGet1');
    const inputGet1Id = document.getElementById('inputGet1Id');
    const results = document.getElementById('results');


    function getUser() {

        const selectedId = inputGet1Id.value

        fetch(getAll_addURL)
        .then(response => response.json())
        .then(data => {


            if (selectedId === "" || selectedId === undefined || selectedId === null) {

                data.forEach(user => {
                results.innerHTML += `
                <p>
                ID: ${user.id}<br>
                NAME: ${user.name}<br>
                LASTNAME: ${user.lastname}<br>
                </p>
                `
                });
            } else {
                console.log(selectedId);
            }

        })


    }

    btnGet1.addEventListener('click', getUser);



/*

    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
        };

    

    fetch(getAll_addURL, options)
    .then(response => response.json())
    .then(data => {





    
        //if (inputGet1Id === "") {

        

            data.forEach(user => {
                results.innerHTML += `
            <h3>${data.name}</h3>
            `
            });

            



        //}


    

})


    const update = {
        title: "Datos de usuario",
        body: [nameField.value, lastnameField.value, birthdateField.value]
    }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
        };

    fetch(DATA_URL, options)
    .then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
    }).then(update => {
        console.log(update);
    }).catch(e => {
        console.log(e);
    });
});
    }); */







})