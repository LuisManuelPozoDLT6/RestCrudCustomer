package com.example.CrudCustomers.controller;

import com.example.CrudCustomers.model.Employee;
import com.example.CrudCustomers.model.EmployeeDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.util.List;

@Path("/employee")

public class EmployeesService {
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Employee> getEmployees(){
        return new EmployeeDAO().findAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Employee getEmployee(@PathParam("id") int employeeNumber){
        return new EmployeeDAO().findByEmployeeNumber(employeeNumber);
    }

    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Employee save(MultivaluedMap<String, String> formParams){
        int employeeNumber = Integer.parseInt(formParams.get("employeeNumber").get(0));
        if(new EmployeeDAO().save(getParams(employeeNumber, formParams), true))
            return new EmployeeDAO().findByEmployeeNumber(employeeNumber);
        return null;
    }

    @POST
    @Path("/save/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Employee save(@PathParam("id") int employeeNumber, MultivaluedMap<String, String> formParams){
        if(new EmployeeDAO().save(getParams(employeeNumber, formParams), false))
            return new EmployeeDAO().findByEmployeeNumber(employeeNumber);
        return null;
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean deleteEmployee(@PathParam("id") int employeeNumber){
        return new EmployeeDAO().delete(employeeNumber);
    }

    private Employee getParams(int employeeNumber, MultivaluedMap<String, String> formParams){
        String lastName = formParams.get("lastName").get(0);
        String firstName = formParams.get("firstName").get(0);
        String extension = formParams.get("extension").get(0);
        String email = formParams.get("email").get(0);
        int officeCode = Integer.parseInt(formParams.get("officeCode").get(0));
        int reportsTo = Integer.parseInt(formParams.get("reportsTo").get(0));
        String jobTitle = formParams.get("jobTitle").get(0);

        Employee employee = new Employee(employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle);
        System.out.println(employee);
        return employee;
    }
}
