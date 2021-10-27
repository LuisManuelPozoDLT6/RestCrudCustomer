package com.example.CrudCustomers.model;

import com.example.CrudCustomers.service.ConnectionMysql;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EmployeeDAO {

    private Connection con;
    private CallableStatement cstm;
    private ResultSet rs;

    public List<Employee> findAll(){
        List<Employee> listEmployees = new ArrayList<>();

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM employees;");
            rs = cstm.executeQuery();

            while(rs.next()){
                Employee employee = new Employee();

                employee.setEmployeeNumber(rs.getInt("employeeNumber"));
                employee.setLastName(rs.getString("lastname"));
                employee.setFirstName(rs.getString("firstname"));
                employee.setOfficeCode(rs.getInt("officeCode"));

                listEmployees.add(employee);
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return listEmployees;
    }

    public Employee findByEmployeeNumber(int employeeNumber){
        Employee employee = null;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM employees WHERE employeeNumber = ?;");
            cstm.setInt(1, employeeNumber);
            rs = cstm.executeQuery();

            if(rs.next()){
                employee = new Employee();

                employee.setEmployeeNumber(rs.getInt("employeeNumber"));
                employee.setLastName(rs.getString("lastname"));
                employee.setFirstName(rs.getString("firstname"));
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return employee;
    }

    public boolean save(Employee employee, boolean isCreate){
        boolean flag = false;

        try{
            con = ConnectionMysql.getConnection();
            if(isCreate){
                cstm = con.prepareCall("INSERT INTO employees(employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle)VALUES(?,?,?,?,?,?,?,?);");

                cstm.setInt(1, employee.getEmployeeNumber());
                cstm.setString(2, employee.getLastName());
                cstm.setString(3, employee.getFirstName());
                cstm.setString(4, employee.getExtension());
                cstm.setString(5, employee.getEmail());
                cstm.setInt(6, employee.getOfficeCode());
                cstm.setInt(7, employee.getReportsTo());
                cstm.setString(8, employee.getJobTitle());
            } else {
                cstm = con.prepareCall("UPDATE employees SET lastName = ?, firstName = ?, extension = ?, email = ?, officeCode = ?, reportsTo = ?, jobTitle = ? WHERE employeeNumber = ?;");

                cstm.setString(1, employee.getLastName());
                cstm.setString(2, employee.getFirstName());
                cstm.setString(3, employee.getExtension());
                cstm.setString(4, employee.getEmail());
                cstm.setInt(5, employee.getOfficeCode());
                cstm.setInt(6, employee.getReportsTo());
                cstm.setString(7, employee.getJobTitle());
                cstm.setInt(8, employee.getEmployeeNumber());
            }

            flag = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return flag;
    }

    public boolean delete(int employeeNumber){
        boolean flag = false;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("DELETE FROM employees WHERE employeeNumber = ?;");
            cstm.setInt(1, employeeNumber);
            flag = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return flag;
    }
}
