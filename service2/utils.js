/**
 * Parses the first line of a string to extract keys, ensuring multi-word keys
 * are joined by capitalizing subsequent words.
 *
 * @param {string} string - Input string where the first line contains the keys.
 * @returns {Array<string>} An array of processed key strings in lowercase. Multi-word keys
 *                          are joined by capitalizing the first letter of each subsequent word (camelCase).
 */
const parseKeys = (string) => {
  const keyString = string.split("\n")[0];
  const keyWords = keyString.trim().replace(/\s+/g, " ").split(" ");
  keys = [];

  for (let word of keyWords) {
    if (word.toLowerCase() === word) {
      keys[keys.length - 1] += word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      keys.push(word.toLowerCase());
    }
  }

  return keys;
};

/**
 * Parses the remaining lines of the string to extract values, splitting each line
 * based on the provided maxSplit value.
 *
 * @param {string} string - Input string where the second line onward contains values.
 * @param {number} maxSplit - The maximum number of splits to perform on each value line.
 * @returns {Array<Array<string>>} An array of arrays, where each sub-array represents
 *                                 the parsed values from each line.
 */
const parseValues = (string, maxSplit) => {
  const valueString = string.split("\n").slice(1);
  const values = valueString.map((value) => {
    const splitValues = value.trim().replace(/\s+/g, " ").split(" ");
    return !maxSplit
      ? splitValues
      : [
          ...splitValues.slice(0, maxSplit),
          splitValues.slice(maxSplit).join(" "),
        ];
  });

  return values;
};

/**
 * Parses the input string into a single object or an array of objects,
 * using the first line for keys and subsequent lines for values.
 *
 * @param {string} string - Input string with keys in the first line and values in subsequent lines.
 * @param {number} [maxSplit=0] - The maximum number of splits to perform when parsing values.
 * @returns {Object|Array<Object>|string} An object if only one line of values is present, or an array of
 *                                 objects if multiple lines of values are present. If parsing fails,
 *                                 the original string is returned.
 */
const parseData = (string, maxSplit = 0) => {
  try {
    const keys = parseKeys(string);
    const values = parseValues(string, maxSplit);

    const data = values.map((value) => {
      return keys.reduce((acc, key, index) => {
        acc[key] = value[index];
        return acc;
      }, {});
    });

    return data.length === 1 ? data[0] : data;
  } catch (err) {
    return string;
  }
};

module.exports = parseData;
