---
Title: Arrays
---

In Java, arrays are a fundamental data structure used to store elements of the same data type in contiguous memory.

# Advantages

1. **Fixed Size**: Arrays have a predefined size, which means they allocate a contiguous block of memory. This helps
   with fast access to elements.
2. **Random Access**: Arrays allow direct access to any element by index in constant time, making it efficient for
   reading or writing.
3. **Memory Efficiency**: Arrays use memory efficiently because they don't require extra overhead like some other data
   structures (e.g., linked lists).
4. **Cache-Friendly**: Since elements are stored contiguously in memory, accessing array elements benefits from CPU
   cache locality, improving performance.

# Disadvantages

1. **Fixed Size**: The size of an array cannot be changed after its initialization. To resize, a new array needs to be
   created, and data must be copied.
2. **Insertion/Deletion Overhead**: Inserting or deleting elements in the middle requires shifting other elements, which
   can be costly.
3. **Homogeneity**: Arrays can only store elements of a single data type, so they lack the flexibility of structures
   like `ArrayList` that can grow dynamically.

# Time and Space Complexity

| Operation               | Time Complexity | Space Complexity | Description                                                          |
|-------------------------|-----------------|------------------|----------------------------------------------------------------------|
| **Access (Read/Write)** | O(1)            | O(1)             | Direct access to an element via its index is constant time.          |
| **Search**              | O(n)            | O(1)             | Linear search is O(n); for sorted arrays, binary search is O(log n). |
| **Insertion**           | O(n)            | O(1)             | Inserting at the start or middle requires shifting elements.         |
| **Deletion**            | O(n)            | O(1)             | Deleting an element also requires shifting elements.                 |
| **Initialization**      | O(n)            | O(n)             | Initializing an array takes O(n) as each element needs to be set.    |

# Examples

1. **Accessing Elements by Index:**
    - Time Complexity: O(1)
   ```java
   int[] arr = {1, 2, 3, 4, 5};
   int element = arr[2]; // Accesses the element at index 2, which is 3
   ```

2. **Linear Search:**
    - Time Complexity: O(n)
   ```java
   int[] arr = {1, 2, 3, 4, 5};
   int target = 4;
   for (int i = 0; i < arr.length; i++) {
       if (arr[i] == target) {
           System.out.println("Element found at index: " + i);
       }
   }
   ```

3. **Binary Search (for Sorted Arrays):**
    - Time Complexity: O(log n)
   ```java
   int[] sortedArr = {1, 2, 3, 4, 5};
   int target = 4;
   int index = Arrays.binarySearch(sortedArr, target);  // Binary search for element 4
   ```

4. **Inserting an Element:**
    - Time Complexity: O(n) (Inserting in the middle or start requires shifting elements)
   ```java
   int[] arr = {1, 2, 3, 5};
   int[] newArr = new int[arr.length + 1];
   int index = 3;  // Insert at index 3
   for (int i = 0; i < newArr.length; i++) {
       if (i < index) {
           newArr[i] = arr[i];
       } else if (i == index) {
           newArr[i] = 4;  // Insert new element
       } else {
           newArr[i] = arr[i - 1];
       }
   }
   ```

5. **Deleting an Element:**
    - Time Complexity: O(n) (Deleting from the middle or start requires shifting elements)
   ```java
   int[] arr = {1, 2, 3, 4, 5};
   int indexToDelete = 2;  // Delete element at index 2 (which is 3)
   for (int i = indexToDelete; i < arr.length - 1; i++) {
       arr[i] = arr[i + 1];  // Shift elements left
   }
   arr[arr.length - 1] = 0;  // Optionally set the last element to 0 or handle resizing
   ```

6. **Resizing an Array (Indirect via Copying):**
    - Time Complexity: O(n) (Creating a new array and copying)
   ```java
   int[] arr = {1, 2, 3, 4};
   int[] largerArr = new int[arr.length + 2];  // Create a larger array
   System.arraycopy(arr, 0, largerArr, 0, arr.length);  // Copy original array
   ```
