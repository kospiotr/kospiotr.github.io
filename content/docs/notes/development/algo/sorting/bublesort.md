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
        int n = array.length;
        boolean swapped;

        // Outer loop for the number of passes
        for (int i = 0; i < n - 1; i++) {
            swapped = false;  // Track if any swapping happened

            // Inner loop for comparing adjacent elements
            for (int j = 0; j < n - 1 - i; j++) {
                // Swap if the current element is greater than the next
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;  // Set swapped to true
                }
            }

            // If no swapping happened in this pass, the array is already sorted
            if (!swapped) {
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