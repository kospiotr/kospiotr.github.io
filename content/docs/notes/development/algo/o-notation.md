---
Title: O-notation
---

In **Big O Notation** (or **O-notation**), we analyze the efficiency of algorithms, typically focusing on **time complexity** and **space complexity**. The goal is to understand how an algorithm’s performance scales as the input size grows. Big O notation expresses this growth in terms of the worst-case scenario.

Examples:

| **Operation Type** | **Typical Big O Complexity** |
| --- | --- |
| Constant-time operations (e.g., reading/writing a variable) | **O(1)** |
| Loop over `n` elements | **O(n)** |
| Nested loops | **O(n^2)** |
| Binary search | **O(log n)** |
| Merge sort, Quick sort | **O(n log n)** |
| Insertion in balanced BST, Heap | **O(log n)** |
| BFS/DFS (graph traversal) | **O(V + E)** |


# Basic Operations

These are simple operations that are treated as having a constant time complexity, i.e., **O(1)**.

*   **Reading a value** from a variable or array at a known index.
*   **Writing a value** to a variable or array at a known index.
*   **Arithmetic operations**: addition, subtraction, multiplication, division.
*   **Comparisons**: checking equality or inequality of values.
*   **Incrementing/Decrementing** a value.
*   **Function calls** that perform a constant amount of work.

# Loops

The time complexity of loops is based on the number of iterations.

## Single loop
Time complexity: **O(n)**.

```java
for (int i = 0; i < n; i++) {
    // Constant time work (O(1)) }
}
```

## Nested loops
Time complexity: **O(n^2)** (quadratic).

```java
for (int i = 0; i < n; i++) {     
    for (int j = 0; j < n; j++) {
        // Constant time work (O(1))
    }
}
```

## Logarithmic loops
Time complexity: **O(log n)**.

```java
while (n > 1) {     
    n = n / 2; 
}
```

# Recursion

The time complexity of recursion depends on the number of recursive calls and the work done at each level.

## Linear recursion
Time complexity: **O(n)**.

```java
void recurse(int n) {     
    if (n == 0) return;     
    recurse(n - 1); // Call for smaller problem 
}
```
  
## Divide-and-conquer recursion
Time complexity: **O(n log n)**.

```java
void mergeSort(int[] array, int low, int high) {
    if (low < high) {
        int mid = (low + high) / 2;
        mergeSort(array, low, mid);
        mergeSort(array, mid + 1, high);
        merge(array, low, mid, high);
    }
}
```


# Searching

Searching operations have different complexities depending on the algorithm and data structure used.

## Linear Search
Searching through an unsorted list requires checking every element, making it **O(n)**.

```java
int linearSearch(int[] arr, int target) {
    for(int i=0; i<arr.length; i++){
        if(arr[i] == target) return i;
    }
    return -1; // Not found
}

```

## Binary Search

Time complexity: **O(log n)**.

```java
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Not found
}

```


# Sorting

Sorting algorithms are analyzed based on the number of comparisons and swaps or other operations they perform.

*   **Bubble Sort, Selection Sort, Insertion Sort**:
    
    These algorithms have a time complexity of **O(n^2)** due to the nested loops used for comparisons and swaps.
*   **Merge Sort, Quick Sort**:
    
    Efficient sorting algorithms have a time complexity of **O(n log n)** in the average and best cases.
*   **Radix Sort, Counting Sort**:
    
    Non-comparative sorting algorithms can have linear time complexity **O(n)** under certain conditions.

# Data Structures

## Array Operations

*   **Accessing an element by index:** **O(1)**
*   **Inserting at the end (in dynamic arrays like ArrayList):** Amortized **O(1)**
*   **Inserting or deleting at the beginning or in the middle:** **O(n)** (since elements need to be shifted).

## LinkedList Operations

*   **Inserting at the beginning or end:** **O(1)** if the pointer to the first or last node is known.
*   **Accessing an element by index:** **O(n)** (since traversal is needed).
*   **Inserting or deleting in the middle:** **O(n)** (requires traversal to the position).

## HashMap / HashSet Operations

*   **Insertion, Deletion, Lookup (on average):** **O(1)**.
*   **Worst-case for Lookup (in case of hash collisions):** **O(n)**, but modern hash functions and rehashing techniques keep this rare.

## Tree-Based Data Structures

*   **Binary Search Tree (BST) Operations:**

    *   Insertion, Deletion, Lookup: **O(log n)** (on average) for balanced trees. In worst-case (unbalanced), **O(n)**.
*   **Heap Operations (Priority Queue):**

    *   Insertion: **O(log n)**.
    *   Deletion (Extract Max or Min): **O(log n)**.
    *   Peek (Max or Min): **O(1)**.

# Graph Algorithms

*   **Breadth-First Search (BFS) and Depth-First Search (DFS):**
    *   Time complexity is **O(V + E)**, where `V` is the number of vertices and `E` is the number of edges.
*   **Dijkstra's Algorithm:**
    *   Time complexity is **O((V + E) log V)** using a priority queue (like a binary heap).

# Matrix Operations

*   **Matrix Multiplication:**  
    The time complexity for multiplying two `n x n` matrices is **O(n^3)** using the traditional method, but it can be optimized with algorithms like Strassen’s algorithm to **O(n^2.81)**.
