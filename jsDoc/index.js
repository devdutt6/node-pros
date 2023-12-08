const { addition } = require("./helper");

/**
 * Defines a student Name
 * @constant
 * @default
 * @type {string}
 */
const studentName = "dev";

/**
 * Defines a student age
 * @type {number | undefined}
 */
const age = undefined;

/**
 * a bunch of ids
 * @type {Array<number>}
 */
const ids = [1, 2, 3, 4];

/**
 * Creates a student
 * @type {{name: string, age: number}}
 */
const Student = {
  name: "dev",
  age: 21,
};

/**
 * Calculates tax
 * @param {number} amount - total amount to be taxed
 * @param {number} tax - tax in percentage like 0.1 for 1%
 * @returns {string} - a string of amount with tax and the currency sign
 */
const addTax = (amount, tax) => {
  return `$${amount + amount * tax}`;
};

/**
 * A student
 * @typedef {Object} Student
 * @property {number} id - id of the student
 * @property {string} name - name of the student
 * @property {string} [address] - residential address of the student
 */
/**
 * a person who is student
 * @type {Student}
 * @see {@link Student}
 */
const person = {
  id: 1,
  name: "dev",
  address: undefined,
};

/**
 * A class defining a person
 */
class Person {
  /**
   * @param {Student} personInfo - Person Information
   * see {@link Student}
   */
  constructor(personInfo) {
    this.personInfo = personInfo;
  }

  /**
   * Greets a person and tells them their id
   * @returns {void}
   */
  greet() {
    console.log(`Hi ${this.personInfo.name} your id is ${this.personInfo.id}`);
  }
}

let personOne = new Person({ id: 12, name: "ha hah" });
personOne.greet;

/**
 * @type {number}
 */
let a = 12,
  b = 8;
console.log(addition(a, b));

/**
 * for order states
 * @readonly
 * @enum {number}
 */
const ORDER_STATE = {
  CREATED: 1,
  ONGOING: 1,
  DELIVERED: 1,
  CANCELLED: 1,
};
