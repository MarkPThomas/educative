export function circularArrayLoop(arr) {
  for (let i = 0; i < arr.length; i++) {
    let fast = i;
    let slow = i;
    let isForward = arr[fast] > 0;
    for (let j = 0; j < arr.length; j++) {
      fast = nextIndex(arr, fast);
      if (isDirectionChange(arr[fast], isForward)) {
        break;
      } else {
        isForward = arr[fast] > 0;
      }
      fast = nextIndex(arr, fast);
      if (isDirectionChange(arr[fast], isForward)) {
        break;
      } else {
        isForward = arr[fast] > 0;
      }

      slow = nextIndex(arr, slow);

      if (fast === slow) {
        return true;
      }
    }
  }

  return false;
}

function nextIndex(arr, index) {
  const increment = arr[index];
  let newIndex = index + increment;

  while (newIndex > arr.length - 1) {
    newIndex -= arr.length;
  }

  while (newIndex < 0) {
    newIndex += arr.length;
  }

  return newIndex;
}

function isDirectionChange(increment, isForward) {
  return (isForward && increment < 0 ||
    !isForward && increment > 0)
}