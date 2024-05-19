/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  createMaxHeap(array);
  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, 0, i);
  }
  return array;
};

const createMaxHeap = (array) => {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, i, array.length);
  }
};

const heapify = (array, index, heapSize) => {
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  if (left < heapSize && array[left] > array[index]) {
    [array[left], array[index]] = [array[index], array[left]];
    heapify(array, left, heapSize);
  }
  if (right < heapSize && array[right] > array[index]) {
    [array[right], array[index]] = [array[index], array[right]];
    heapify(array, right, heapSize);
  }
};

// unit tests
// do not modify the below code
test("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
