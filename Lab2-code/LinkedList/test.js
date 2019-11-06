"use strict";
/* global describe */
/* global it */
/* global assert */
/* global beforeEach */
/* global LinkedList */

describe("LinkedList", function () {
    let linkedList = new LinkedList();
    beforeEach(() => { linkedList = new LinkedList(); });

    describe("get() method", function () {
        it("can retrieve an element", function () {
            linkedList.add(1);
            assert.equal(linkedList.get(0), 1);
        });
    });
    describe("set() method", function () {
        it("can replace an element at an index", function () {
            linkedList.add(1);
            linkedList.set(0, 2);
            assert.equal(linkedList.get(0), 2);
            assert.equal(linkedList.length, 1);
        });
    });
    describe("add() method", function () {
        it("adds an element at the end", function () {
            linkedList.add(1);
            assert.equal(linkedList.length, 1);
            assert.equal(linkedList.get(0), 1);
        });
        it("creates a new node for every call", function () {
            for (let i = 0; i < 11; i++) {
                linkedList.add(i);
            }
            assert.equal(linkedList.length, 11);
            assert.equal(linkedList.get(10), 10);
        });
    });



    describe("sort() method", function () {
        it("sorts using the given comparison function", function () {
            linkedList.add(1);
            linkedList.add(5);
            linkedList.add(3);
            linkedList.sort((a, b) => { return a - b });
            assert.equal(linkedList.get(0), 1);
            assert.equal(linkedList.get(1), 3);
            assert.equal(linkedList.get(2), 5);
        });
        it("sorts backwards with a different function", function () {
            linkedList.add(1);
            linkedList.add(5);
            linkedList.add(3);
            linkedList.sort((a, b) => { return b - a });
            assert.equal(linkedList.get(0), 5);
            assert.equal(linkedList.get(1), 3);
            assert.equal(linkedList.get(2), 1);
        });
    });


    describe("contain() method", function () {
        const array = ["big", "small", "tall", "short", "round", "square", "enormous",
            "tiny", "gargantuan", "lilliputian", "numberless", "none", "vast",
            "miniscule"];
        it("find an element", function () {
            const sorted = array.sort();
            assert.equal(sorted[0], "big");
            let i = linkedList.contain("number”", array);
            assert.equal(i, -1);
            let j = linkedList.contain("tiny", array);
            assert.equal(j, 12);
        });

    });

    describe("containLinkedList() method", function () {
        const list = {value: 100, next: {value: 200, next:{value: 300, next:null}}};    
        it("search an element", function () {
            let i = linkedList.containLinkedList(100, list);
            assert.equal(i, true);
            let j = linkedList.containLinkedList(50, list);
            assert.equal(j, false);
        });

    });


    describe("namecomparator() method", function () {
        class Employee {
            /**
             * 
             * @param {String} name name of employee
             * @param {Number} salary monthly salary
             * @param {Number} year hired on year
             * @param {Number} month hired on month
             * @param {Number} day hired on day
             */
            constructor(name, salary, year, month, day) {
                this.name = name;
                this.salary = salary;
                this.hireDate = new Date(year, month - 1, day);
            }
        }
        let employees = [
            new Employee("George", 40000, 1996, 11, 5),
            new Employee("Dave", 50000, 2000, 1, 3),
            new Employee("Richard", 45000, 2001, 2, 7)
        ];
        employees.sort(linkedList.nameComparator);

        it("Compares Employees by name", function() {
           assert.equal(employees[0].name, "Dave"); 
        });

    });


   describe("insert() method", function () {
        it("can insert at the start of a list", function () {
            linkedList.insert(0, 5);
            assert.equal(linkedList.get(0), 5);
        });
        it("can insert at the end of a list", function () {
            linkedList.insert(0, 5);
            linkedList.insert(1, 7);
            assert.equal(linkedList.get(1), 7);
        });
        it("can inserts an element between others (shifting others right)", function () {
            linkedList.insert(0, 5);
            linkedList.insert(1, 7);
            linkedList.insert(1, 3);
            assert.equal(linkedList.get(1), 3);
            assert.equal(linkedList.get(2), 7);
        });
        it("creates a new node for every call", function () {
            for (let i = 0; i < 11; i++) {
                linkedList.insert(0, i);
            }
            assert.equal(linkedList.length, 11);
        });
    });
    describe("remove() method", function () {
        it("can remove the first element", function () {
            linkedList.add(1);
            linkedList.add(2);
            linkedList.remove(0);
            assert.equal(linkedList.length, 1);
        });
        it("can remove the last element", function () {
            linkedList.add(1);
            linkedList.add(2);
            linkedList.remove(1);
            assert.equal(linkedList.length, 1);
        });
        it("can remove an element at an index (shifting remaining left)", function () {
            linkedList.add(1);
            linkedList.add(2);
            linkedList.add(3);
            linkedList.remove(1);
            assert.equal(linkedList.length, 2);
            assert.equal(linkedList.get(0), 1);
            assert.equal(linkedList.get(1), 3);
        });
    });
    describe("[Symbol.iterator]() method", function () {
        it("returns an iterator object", function () {
            const iterator = linkedList[Symbol.iterator]();
            assert.equal(typeof iterator.next, "function");
        });
        it("can be used by for of", function () {
            linkedList.add(4);
            linkedList.add(4);
            linkedList.add(4);
            let count = 0;
            for (const element of linkedList) {
                count++;
                assert.equal(element, 4);
            }
            assert.equal(count, 3);
        });
    });
    describe("iterator.next() method", function () {
        it("gives the next value", function () {
            linkedList.add(4);
            linkedList.add(5);
            linkedList.add(6);
            const iterator = linkedList[Symbol.iterator]();
            const firstObj = iterator.next();
            assert.equal(firstObj.value, 4);
            assert.equal(firstObj.done, false);
        });
        it("gives the last value", function () {
            linkedList.add(4);
            linkedList.add(5);
            linkedList.add(6);
            const iterator = linkedList[Symbol.iterator]();
            iterator.next();
            iterator.next();
            const lastObj = iterator.next();
            assert.equal(lastObj.value, 6);
            assert.equal(lastObj.done, false);

        });
        it("knows when it's done", function () {
            linkedList.add(4);
            linkedList.add(5);
            linkedList.add(6);
            const iterator = linkedList[Symbol.iterator]();
            iterator.next();
            iterator.next();
            iterator.next();
            const done = iterator.next();
            assert.equal(done.done, true);
        });
    });
    describe("iterator.insert(e) method", function () {
        it("can insert a value at the beginning of the list", function () {
            const iterator = linkedList[Symbol.iterator]();
            iterator.insert(5);
            assert.equal(linkedList.get(0), 5);
            iterator.insert(8);
            assert.equal(linkedList.get(0), 8);
        });
        it("can insert a value at the beginning of the list, also with existing items", function () {
            linkedList.add(6);
            const iterator = linkedList[Symbol.iterator]();
            iterator.insert(5);
            assert.equal(linkedList.get(0), 5);
            assert.equal(linkedList.get(1), 6);
            iterator.insert(8);
            assert.equal(linkedList.get(0), 8);
            assert.equal(linkedList.get(1), 5);
            assert.equal(linkedList.get(2), 6);
        });
        it("can insert in between items", function () {
            linkedList.add(6);
            linkedList.add(7);
            const iterator = linkedList[Symbol.iterator]();
            iterator.next();
            iterator.insert(3);
            assert.equal(linkedList.get(0), 6);
            assert.equal(linkedList.get(1), 3);
            assert.equal(linkedList.get(2), 7);
        });
        it("can insert at the end of the list", function () {
            linkedList.add(6);
            linkedList.add(7);
            const iterator = linkedList[Symbol.iterator]();
            iterator.next();
            iterator.next();
            const done = iterator.next();
            assert.isTrue(done.done);
            iterator.insert(3);
            assert.equal(linkedList.get(0), 6);
            assert.equal(linkedList.get(1), 7);
            assert.equal(linkedList.get(2), 3);
        });
    });
    describe("iterator.remove() method", function () {
        it("can remove the first item in the list", function () {
            linkedList.add(5);
            linkedList.add(6);
            const iterator = linkedList[Symbol.iterator]();
            iterator.next();
            iterator.remove();
            assert.equal(linkedList.get(0), 6);
        });
        it("can remove an item inbetween others", function () {
            linkedList.add(5);
            linkedList.add(6);
            linkedList.add(7);
            const iterator = linkedList[Symbol.iterator]();
            iterator.next();
            iterator.next();
            iterator.remove();
            assert.equal(linkedList.get(0), 5);
            assert.equal(linkedList.get(1), 7);
            assert.equal(linkedList.size(), 2);
        });
        it("can remove the last item in the list", function () {
            linkedList.add(5);
            linkedList.add(6);
            linkedList.add(7);
            const iterator = linkedList[Symbol.iterator]();
            iterator.next();
            iterator.next();
            iterator.next();
            // extra next should do nothing
            iterator.next();
            iterator.remove();
            assert.equal(linkedList.get(0), 5);
            assert.equal(linkedList.get(1), 6);
            assert.equal(linkedList.size(), 2);
        });
    });
});