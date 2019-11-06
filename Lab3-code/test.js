"use strict";
/* global describe */
/* global it */
/* global assert */
/* global Employee */
/* global nameComparator */


describe("nameComparator", function() {   
    it("Compares Employees by name", function() {
        assert.equal(employees[0].name, "Dave"); 
    });
});


describe("salaryComparator", function() {   
        it("Compares Employees by salary", function() {
        assert.equal(weldat[0].salary, 40000);
        
    });

});


describe("hiredDateComparator", function() {   
    it("Compares Employees by date of hire", function() {
    assert.equal(simon[0].salary, 40000);
    
});

});





