/**
 * helper functions which can be used
 * @module helper
 */
/**
 * @file My file
 * @copyright Devdutt Chudasama
 */

/**
 * add two numbers
 * @deprecated use add function instead
 * @see {@link add}
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
exports.addition = (num1, num2) => {
  return num1 + num2;
};
/**
 * add two numbers
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
let add = (exports.add = (num1, num2) => {
  return num1 + num2;
});

/**
 * @async
 * @function downloadData
 * @param {string} url - url to download data from
 * @returns {Promise<*>}
 * @author Devdutt <devduttchudasama1339@gmail.com>
 */
exports.downloadData = async (url) => {
  return Promise.resolve(() => {
    return `received from  ${url}`;
  });
};
