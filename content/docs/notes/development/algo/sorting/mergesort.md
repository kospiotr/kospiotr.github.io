---
Title: Merge Sort
---

Merge Sort is a divide-and-conquer algorithm used for sorting. It works by dividing the array into smaller subarrays, sorting those subarrays recursively, and then merging them back together. The key characteristic of Merge Sort is that it guarantees O(n log n) time complexity in all cases (best, average, and worst), making it efficient even for large datasets.

# Method

1. Divide: Split the array into two halves until you have subarrays of size 1.
2. Conquer: Recursively sort the two subarrays.
3. Merge: Combine (merge) the two sorted subarrays into one sorted array.

# Implementation

```java
public class MergeSort {

    // Merge Sort function
    public static void mergeSort(int[] array, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = (left + right) / 2;

            // Recursively sort the first and second halves
            mergeSort(array, left, mid);
            mergeSort(array, mid + 1, right);

            // Merge the sorted halves
            merge(array, left, mid, right);
        }
    }

    // Merge two subarrays
    public static void merge(int[] array, int left, int mid, int right) {
        // Sizes of two subarrays to be merged
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Temporary arrays
        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        // Copy data to temp arrays
        System.arraycopy(array, left, leftArray, 0, n1);
        System.arraycopy(array, mid + 1, rightArray, 0, n2);

        // Initial indices of the two subarrays and the merged array
        int i = 0, j = 0, k = left;

        // Merge the two subarrays into the main array
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
            } else {
                array[k] = rightArray[j];
                j++;
            }
            k++;
        }

        // Copy the remaining elements of leftArray (if any)
        while (i < n1) {
            array[k] = leftArray[i];
            i++;
            k++;
        }

        // Copy the remaining elements of rightArray (if any)
        while (j < n2) {
            array[k] = rightArray[j];
            j++;
            k++;
        }
    }

    // Test the algorithm
    public static void main(String[] args) {
        int[] array = {12, 11, 13, 5, 6, 7};
        System.out.println("Original Array:");
        for (int num : array) {
            System.out.print(num + " ");
        }

        // Perform merge sort
        mergeSort(array, 0, array.length - 1);

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
| Worst Case   | O(n log n)     | This happens when the pivot is always the smallest or largest element |

# Space Complexity

| Case       | O-notation |
|------------|------------|
| Worst Case | O(n)       |

# Advantages
- Guaranteed O(n log n): Merge Sort has a consistent time complexity across all cases, which makes it reliable for large datasets.
- Stable Sort: Merge Sort preserves the relative order of elements with equal keys, making it stable.
- Divide-and-conquer: The algorithm can be parallelized because different halves of the array can be processed independently.
- Good for Linked Lists: Merge Sort is often the preferred sorting algorithm for linked lists because it can be implemented without additional space complexity (unlike arrays).

# Disadvantages of QuickSort
- High Space Complexity: Merge Sort requires O(n) extra space for the temporary arrays used during merging. This can be a problem in environments with limited memory.
- Not In-Place: Because of its space complexity, Merge Sort is not an in-place sorting algorithm (i.e., it doesn't sort the array without using extra space).