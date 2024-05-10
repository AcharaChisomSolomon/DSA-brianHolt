/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

function combineArrays(arr1, arr2) {
  let i = 0;
  let j = 0;
  let newArr = []

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      newArr.push(arr1[i]);
      i++;
    } else {
      newArr.push(arr2[j]);
      j++;
    }
  }

  newArr = [...newArr, ...arr1.slice(i), ...arr2.slice(j)]
  return newArr
}

const mergeSort = (nums) => {
  if (nums.length === 1) return nums;

  let midId = Math.floor(nums.length / 2);
  const leftArr = nums.slice(0, midId);
  const rightArr = nums.slice(midId);

  return combineArrays(mergeSort(leftArr), mergeSort(rightArr));
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
