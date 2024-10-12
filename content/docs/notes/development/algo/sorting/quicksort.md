---
Title: Quicksort
---

QuickSort is a highly efficient divide-and-conquer algorithm used for sorting. It picks a pivot element from the array
and partitions the other elements into two sub-arrays: those smaller than the pivot and those greater than the pivot.
The process is recursively repeated for the sub-arrays, and the result is a sorted array.

# Method

1. Choose a Pivot: Select an element from the array (usually the first, last, or middle element, or a random element).
2. Partitioning: Rearrange the array so that:
    - All elements smaller than the pivot are moved to the left of the pivot.
    - All elements greater than the pivot are moved to the right. The pivot is now in its correct sorted position.
5. Recursion: Recursively apply the same process to the sub-arrays of elements less than and greater than the pivot.

# Implementation

```java
public class QuickSort {

    // Method to perform QuickSort on the array
    public static void quickSort(int[] array, int low, int high) {
        if (low < high) {
            // Partition the array and get the pivot index
            int pivotIndex = partition(array, low, high);

            // Recursively sort the elements before and after the pivot
            quickSort(array, low, pivotIndex - 1);
            quickSort(array, pivotIndex + 1, high);
        }
    }

    // Partition method that arranges elements around a pivot
    public static int partition(int[] array, int low, int high) {
        // Select the last element as the pivot
        int pivot = array[high];
        int i = low - 1;

        // Move elements smaller than the pivot to the left
        for (int j = low; j < high; j++) {
            if (array[j] <= pivot) {
                i++;
                // Swap array[i] and array[j]
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        // Move the pivot to its correct sorted position
        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;

        return i + 1;
    }

    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        int n = array.length;

        System.out.println("Original Array:");
        for (int num : array) {
            System.out.print(num + " ");
        }

        // Call quickSort
        quickSort(array, 0, n - 1);

        System.out.println("\nSorted Array:");
        for (int num : array) {
            System.out.print(num + " ");
        }
    }
}
```

# Time Complexity

| Case         | O-notation | Comment                                                               |
|--------------|------------|-----------------------------------------------------------------------|
| Best Case    | O(n log n) | Pivot splits the array into two nearly equal halves.                  |
| Average Case | O(n log n) | On average, the pivot results in balanced partitions.                 |
| Worst Case   | O(n^2)     | This happens when the pivot is always the smallest or largest element |

# Space Complexity

| Case       | O-notation |
|------------|------------|
| Best Case  | O(log n)   |
| Worst Case | O(n)       |

# Advantages
- Efficient: QuickSort is generally faster in practice than other sorting algorithms like MergeSort or HeapSort because of its cache-efficient behavior and smaller constant factors.
- In-place sorting: QuickSort doesn’t require extra space for arrays, unlike MergeSort, which needs auxiliary arrays.
- Divide and conquer: This makes the algorithm easy to parallelize.

# Disadvantages of QuickSort
- Worst-case time complexity: QuickSort can degrade to O(n^2) in the worst case (e.g., when the input is already sorted or reverse-sorted and no pivot optimization is used).
- Not stable: QuickSort is not a stable sort (i.e., it doesn't preserve the relative order of elements with equal keys).

Refs:
- [Visualization of Quick sort](https://www.youtube.com/watch?v=aXXWXz5rF64)