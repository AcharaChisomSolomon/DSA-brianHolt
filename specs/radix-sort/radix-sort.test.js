/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
const getDigit = (num, place) => {
  if (place > num.toString().length - 1) {
    return 0;
  }
  let digit = 0;

  let i = 0;
  while (i <= place) {
    digit = num % 10;
    num = Math.floor(num / 10);
    i++;
  }

  return digit;
};

const getLargestNum = (arr) => {
  return arr.reduce((acc, num) => {
    return acc > num ? acc : num;
  });
};

function radixSort(array) {
  const length = getLargestNum(array).toString().length;
  let buckets = [[], [], [], [], [], [], [], [], [], []];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < array.length; j++) {
      buckets[getDigit(array[j], i)].push(array[j]);
    }
    array = buckets.reduce((acc, arr) => {
      return acc.concat(arr);
    }, []);
    buckets = [[], [], [], [], [], [], [], [], [], []];
  }

  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort((a, b) => a - b));
  });
});
