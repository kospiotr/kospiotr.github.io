---
Title: Buble Sort
---

Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent
elements, and swaps them if they are in the wrong order. The process is repeated until no swaps are needed, indicating
that the list is sorted.

It is named "bubble sort" because smaller elements "bubble" to the top of the list (beginning of the array), while
larger elements sink to the bottom (end of the array) during the sorting process.

# Method

1. Compare: Start from the first element and compare it with the next element.
2. Swap: If the current element is greater than the next element, swap them.
3. Repeat: Move to the next element and repeat the comparison and swap process.
4. Pass: After each pass through the array, the largest unsorted element is placed at its correct position at the end of
   the array.
5. End: Continue iterating through the array until no more swaps are required, meaning the array is sorted.

# Implementation

```java
public class BubbleSort {

    public static void bubbleSort(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            boolean changed = false;
            for (int j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                    changed = true;
                }
            }
            if(!changed){
                break;
            }
        }
    }

    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original Array:");
        for (int num : array) {
            System.out.print(num + " ");
        }

        // Perform Bubble Sort
        bubbleSort(array);

        System.out.println("\nSorted Array:");
        for (int num : array) {
            System.out.print(num + " ");
        }
    }
}
```
# Sequence

```
Before sort: [9, 1, 8, 2, 7, 3, 6, 4, 5]
Sorting A=[9, 1, 8, 2, 7, 3, 6, 4, 5]
A={L[9], R[1], 8, 2, 7, 3, 6, 4, 5}
Swap A[0] = 9 <=> A[1] = 1
A={1, L[9], R[8], 2, 7, 3, 6, 4, 5}
Swap A[1] = 9 <=> A[2] = 8
A={1, 8, L[9], R[2], 7, 3, 6, 4, 5}
Swap A[2] = 9 <=> A[3] = 2
A={1, 8, 2, L[9], R[7], 3, 6, 4, 5}
Swap A[3] = 9 <=> A[4] = 7
A={1, 8, 2, 7, L[9], R[3], 6, 4, 5}
Swap A[4] = 9 <=> A[5] = 3
A={1, 8, 2, 7, 3, L[9], R[6], 4, 5}
Swap A[5] = 9 <=> A[6] = 6
A={1, 8, 2, 7, 3, 6, L[9], R[4], 5}
Swap A[6] = 9 <=> A[7] = 4
A={1, 8, 2, 7, 3, 6, 4, L[9], R[5]}
Swap A[7] = 9 <=> A[8] = 5
A={L[1], R[8], 2, 7, 3, 6, 4, 5, 9}
A={1, L[8], R[2], 7, 3, 6, 4, 5, 9}
Swap A[1] = 8 <=> A[2] = 2
A={1, 2, L[8], R[7], 3, 6, 4, 5, 9}
Swap A[2] = 8 <=> A[3] = 7
A={1, 2, 7, L[8], R[3], 6, 4, 5, 9}
Swap A[3] = 8 <=> A[4] = 3
A={1, 2, 7, 3, L[8], R[6], 4, 5, 9}
Swap A[4] = 8 <=> A[5] = 6
A={1, 2, 7, 3, 6, L[8], R[4], 5, 9}
Swap A[5] = 8 <=> A[6] = 4
A={1, 2, 7, 3, 6, 4, L[8], R[5], 9}
Swap A[6] = 8 <=> A[7] = 5
A={L[1], R[2], 7, 3, 6, 4, 5, 8, 9}
A={1, L[2], R[7], 3, 6, 4, 5, 8, 9}
A={1, 2, L[7], R[3], 6, 4, 5, 8, 9}
Swap A[2] = 7 <=> A[3] = 3
A={1, 2, 3, L[7], R[6], 4, 5, 8, 9}
Swap A[3] = 7 <=> A[4] = 6
A={1, 2, 3, 6, L[7], R[4], 5, 8, 9}
Swap A[4] = 7 <=> A[5] = 4
A={1, 2, 3, 6, 4, L[7], R[5], 8, 9}
Swap A[5] = 7 <=> A[6] = 5
A={L[1], R[2], 3, 6, 4, 5, 7, 8, 9}
A={1, L[2], R[3], 6, 4, 5, 7, 8, 9}
A={1, 2, L[3], R[6], 4, 5, 7, 8, 9}
A={1, 2, 3, L[6], R[4], 5, 7, 8, 9}
Swap A[3] = 6 <=> A[4] = 4
A={1, 2, 3, 4, L[6], R[5], 7, 8, 9}
Swap A[4] = 6 <=> A[5] = 5
A={L[1], R[2], 3, 4, 5, 6, 7, 8, 9}
A={1, L[2], R[3], 4, 5, 6, 7, 8, 9}
A={1, 2, L[3], R[4], 5, 6, 7, 8, 9}
A={1, 2, 3, L[4], R[5], 6, 7, 8, 9}
After sort: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

# Time Complexity

| Case         | O-notation | Comment                                               |
|--------------|------------|-------------------------------------------------------|
| Best Case    | O(n)       | When the array is already sorted.                     |
| Average Case | O(n^2)     | On average, the pivot results in balanced partitions. |
| Worst Case   | O(n^2)     | When the array is in reverse order.                   |

# Space Complexity

| Case       | O-notation |
|------------|------------|
| Worst Case | O(1)       |

# Advantages

- Simplicity: Bubble Sort is easy to understand and implement.
- No Extra Memory: It sorts the array in-place, so no additional memory is required.
- Detects Sorted Array Early: In the best-case scenario, where the array is already sorted, it can break out of the loop
  early after one pass, giving it an O(n) performance.

# Disadvantages of QuickSort

- Inefficiency: Its O(n^2) time complexity makes it highly inefficient for large datasets.
- Too Many Comparisons and Swaps: Bubble Sort does more work (comparisons and swaps) than necessary, especially when
  there are more efficient algorithms like QuickSort, MergeSort, and even Insertion Sort for small datasets.
- Not Suitable for Large Datasets: Its inefficiency makes it impractical for sorting large arrays or when performance is
  critical.