

const getCustomers = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:8080/CrudCustomers_war_exploded/customer'
    }).done(res => {
        let listCustomers = res;
        let infoCus = "";

        for (let i = 0; i < listCustomers.length; i++) {
            infoCus += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${res[i].customerName}</td>
                    <td>${res[i].contactFirstName} ${res[i].contactLastName}</td>
                    <td>${res[i].phone}</td>
                    <td>${res[i].addressLine1}, ${res[i].postalCode}, ${res[i].state}, ${res[i].country}</td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].customerNumber}">
                        <button title="Eliminar"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete" onclick="getCustomerById(${res[i].customerNumber})"><i class="fas fa-user-times" ></i></button> 
                    </td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].customerNumber}">
                        <button class="btn btn-primary" title="Modificar" data-bs-toggle="modal" data-bs-target="#update" onclick="getCustomerById(${res[i].customerNumber})"><i class="fas fa-user-edit"></i></button>
                    </td>
                </tr>
            `;
        }
        $("#table").html(infoCus);

    });
};

const getCustomerById = (id) => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:8080/CrudCustomers_war_exploded/customer/' + id
    }).done(res => {
        let listCustomers = res;
        let infoCus = `  
                <div class="col-6">
                    <label for="">Número de cliente</label>
                    <input class="form-control" type="number" value="${res.customerNumber}" required name="Number2" id="Number2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Nombre del cliente</label>
                    <input class="form-control" type="text" value="${res.customerName}" id="Name2" name="Name">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Nombre del contacto</label>
                    <input class="form-control" type="text" value="${res.contactFirstName}" id="ContactName2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Apellido del contacto</label>
                    <input class="form-control" type="text" value="${res.contactLastName}" id="ContactLastName2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Telefono del cliente</label>
                    <input class="form-control" type="text" value="${res.phone}" id="Phone2" name="Phone2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Limite de crédito</label>
                    <input class="form-control" type="number" value="${res.creditLimit}" id="Limit2" name="Limit">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Dirección 1</label>
                    <input class="form-control" type="text" value="${res.addressLine1}" id="Address1a" name="Address1">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Dirección 2</label>
                    <input class="form-control" type="text" value="${res.addressLine2}" id="Address2b" name="Address2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Ciudad</label>
                    <input class="form-control" type="text" value="${res.city}" id="City2" name="City2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Estado</label>
                    <input class="form-control" type="text" value="${res.state}" id="State2" name="State2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Codigo postal</label>
                    <input class="form-control" type="number" value="${res.postalCode}" id="Postal2" name="Postal2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">País</label>
                    <input class="form-control" type="text" value="${res.country}" id="Country2" name="Country2">
                    <br>
                </div>
                    <input class="form-control" type="hidden" value="${res.salesRepEmployeeNumber}" id="employees2" name="employees2">`;
        msgDelete = `<h6>Desea eliminar a ${res.customerName} ?</h6>`;

        $("#modalUpdate").html(infoCus);
        $("#modalDelete").html(msgDelete);

    });
};

const getEmployees = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: "http://localhost:8080/CrudCustomers_war_exploded/employee"
    }).done(res => {
        let listEmployees = res;
        let employees = $("#employees");
        employees.append(`<option value="0">Nombre de empleado</option>`);

        for (let i = 0; i < listEmployees.length; i++) {
            employees.append(`<option value="${listEmployees[i].employeeNumber}">${listEmployees[i].firstName} ${listEmployees[i].lastName}</option>`)
        }
    });
};


const save = () => {
    console.log("THIS");
    let form = document.getElementById("formSave");
    console.log(form);
    let customer = new Object();
    customer.customerNumber = document.getElementById("Number").value;
    customer.customerName = document.getElementById("Name").value;
    customer.contactFirstName = document.getElementById("ContactName").value;
    customer.contactLastName = document.getElementById("ContactLastName").value;
    customer.phone = document.getElementById("Phone").value;
    customer.creditLimit = document.getElementById("Limit").value;
    customer.addressLine1 = document.getElementById("Address1").value;
    customer.addressLine2 = document.getElementById("Address2").value;
    customer.city = document.getElementById("City").value;
    customer.state = document.getElementById("State").value;
    customer.postalCode = document.getElementById("Postal").value;
    customer.country = document.getElementById("Country").value;
    customer.salesRepEmployeeNumber = document.getElementById("employees").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: "http://localhost:8080/CrudCustomers_war_exploded/customer/save",
        data: customer
    }).done(res => {
        console.log(res);
        if(res){
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha registrado al cliente exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }else{
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo registrar al cliente<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getCustomers();
    });
    window.alert("Hello world!");
}

const update = () => {
    console.log("THIS");
    let form = document.getElementById("formUpdate");
    console.log(form);
    let customer = new Object();
    let id = document.getElementById("Number2").value;
    customer.customerNumber = document.getElementById("Number2").value;
    customer.customerName = document.getElementById("Name2").value;
    customer.contactFirstName = document.getElementById("ContactName2").value;
    customer.contactLastName = document.getElementById("ContactLastName2").value;
    customer.phone = document.getElementById("Phone2").value;
    customer.creditLimit = document.getElementById("Limit2").value;
    customer.addressLine1 = document.getElementById("Address1a").value;
    customer.addressLine2 = document.getElementById("Address2b").value;
    customer.city = document.getElementById("City2").value;
    customer.state = document.getElementById("State2").value;
    customer.postalCode = document.getElementById("Postal2").value;
    customer.country = document.getElementById("Country2").value;
    customer.salesRepEmployeeNumber = document.getElementById("employees2").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: "http://localhost:8080/CrudCustomers_war_exploded/customer/save/" + id,
        data: customer
    }).done(res => {
        console.log(res);
        if(res){
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha modificado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        }else{
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo modificar al cliente<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getCustomers();

    });
}

const deleteCustomers = () => {
    console.log("THIS");
    let id = document.getElementById("Number2").value;
    let form = document.getElementById("formDelete");
    console.log(form);

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: "http://localhost:8080/CrudCustomers_war_exploded/customer/delete/" + id,
    }).done(res => {
        console.log(res);

        if(res){
            window.alert("Eliminado");
        }else{
            window.alert("No se pudo eliminar el registro");
        }
    });

}

getCustomers();
getEmployees();
