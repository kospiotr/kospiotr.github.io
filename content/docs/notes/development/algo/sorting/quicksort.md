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
@Slf4j
public class Quicksort {

   public static void sort(int[] array) {
      quicksort(array, 0, array.length - 1);
   }

   private static void quicksort(int[] array, int lo, int hi) {
      if (lo >= hi || hi < 0) return;
      int partitionIndex = partition(array, lo, hi);
      quicksort(array, lo, partitionIndex - 1);
      quicksort(array, partitionIndex + 1, hi);
   }

   private static int partition(int[] array, int lo, int hi) {
      int pivot = array[hi];
      while (true) {
         while (array[lo] < pivot) lo++;
         while (array[hi] > pivot) hi--;
         if (lo >= hi) return lo;
         swap(array, lo, hi);
      }
   }

}

@Slf4j
class QuicksortTest {

   @Test
   void testPairSortedArray() {
      //given
      int[] arr = {9, 1, 8, 2, 7, 3, 6, 4, 5};

      //when
      log.info("Before sort: {}", arr);
      Quicksort.sort(arr);
      log.info("After sort: {}", arr);

      //then
      assertThat(arr).containsExactly(1, 2, 3, 4, 5, 6, 7, 8, 9);
   }
}
```

# Sequence

```
Before sort: [9, 1, 8, 2, 7, 3, 6, 4, 5]
Sorting A=[9, 1, 8, 2, 7, 3, 6, 4, 5]
Partition: L=0, R=8, M=4, P=7
A={L[9], 1, 8, 2, 7, 3, 6, 4, R[5]}
Swap A[0] = 9 <=> A[8] = 5
L++
R--
A={5, L[1], 8, 2, 7, 3, 6, R[4], 9}
L++
A={5, 1, L[8], 2, 7, 3, 6, R[4], 9}
Swap A[2] = 8 <=> A[7] = 4
L++
R--
A={5, 1, 4, L[2], 7, 3, R[6], 8, 9}
L++
A={5, 1, 4, 2, L[7], 3, R[6], 8, 9}
Swap A[4] = 7 <=> A[6] = 6
L++
R--
A={5, 1, 4, 2, 6, L[R[3]], 7, 8, 9}
L++
A={5, 1, 4, 2, 6, R[3], L[7], 8, 9}
Partition result A=[5, 1, 4, 2, 6, 3, 7, 8, 9], I=6
Sorting A=[5, 1, 4, 2, 6, 3]
Partition: L=0, R=5, M=2, P=4
A={L[5], 1, 4, 2, 6, R[3], 7, 8, 9}
Swap A[0] = 5 <=> A[5] = 3
L++
R--
A={3, L[1], 4, 2, R[6], 5, 7, 8, 9}
L++
A={3, 1, L[4], 2, R[6], 5, 7, 8, 9}
R--
A={3, 1, L[4], R[2], 6, 5, 7, 8, 9}
Swap A[2] = 4 <=> A[3] = 2
L++
R--
Partition result A=[3, 1, 2, 4, 6, 5, 7, 8, 9], I=3
Sorting A=[3, 1, 2]
Partition: L=0, R=2, M=1, P=1
A={L[3], 1, R[2], 4, 6, 5, 7, 8, 9}
R--
A={L[3], R[1], 2, 4, 6, 5, 7, 8, 9}
Swap A[0] = 3 <=> A[1] = 1
L++
R--
Partition result A=[1, 3, 2, 4, 6, 5, 7, 8, 9], I=1
Sorting A=[1]
Sorting A=[3, 2]
Partition: L=1, R=2, M=1, P=3
A={1, L[3], R[2], 4, 6, 5, 7, 8, 9}
Swap A[1] = 3 <=> A[2] = 2
L++
R--
Partition result A=[1, 2, 3, 4, 6, 5, 7, 8, 9], I=2
Sorting A=[2]
Sorting A=[3]
Sorting A=[4, 6, 5]
Partition: L=3, R=5, M=4, P=6
A={1, 2, 3, L[4], 6, R[5], 7, 8, 9}
L++
A={1, 2, 3, 4, L[6], R[5], 7, 8, 9}
Swap A[4] = 6 <=> A[5] = 5
L++
R--
Partition result A=[1, 2, 3, 4, 5, 6, 7, 8, 9], I=5
Sorting A=[4, 5]
Partition: L=3, R=4, M=3, P=4
A={1, 2, 3, L[4], R[5], 6, 7, 8, 9}
R--
A={1, 2, 3, L[R[4]], 5, 6, 7, 8, 9}
Swap A[3] = 4 <=> A[3] = 4
L++
R--
Partition result A=[1, 2, 3, 4, 5, 6, 7, 8, 9], I=4
Sorting A=[4]
Sorting A=[5]
Sorting A=[6]
Sorting A=[7, 8, 9]
Partition: L=6, R=8, M=7, P=8
A={1, 2, 3, 4, 5, 6, L[7], 8, R[9]}
L++
A={1, 2, 3, 4, 5, 6, 7, L[8], R[9]}
R--
A={1, 2, 3, 4, 5, 6, 7, L[R[8]], 9}
Swap A[7] = 8 <=> A[7] = 8
L++
R--
Partition result A=[1, 2, 3, 4, 5, 6, 7, 8, 9], I=8
Sorting A=[7, 8]
Partition: L=6, R=7, M=6, P=7
A={1, 2, 3, 4, 5, 6, L[7], R[8], 9}
R--
A={1, 2, 3, 4, 5, 6, L[R[7]], 8, 9}
Swap A[6] = 7 <=> A[6] = 7
L++
R--
Partition result A=[1, 2, 3, 4, 5, 6, 7, 8, 9], I=7
Sorting A=[7]
Sorting A=[8]
Sorting A=[9]
After sort: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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

# Refs:
- [Visualization of Quick sort](https://www.youtube.com/watch?v=aXXWXz5rF64)
- [Quicksort Algorithm: A Step-by-Step Visualization](https://www.youtube.com/watch?v=pM-6r5xsNEY)