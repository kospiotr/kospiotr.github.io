---
Title: ArrayList
---

In Java, `ArrayList` is a part of the Java Collections Framework and is a resizable array implementation of the `List`
interface. It is widely used when you need a dynamic array that can grow and shrink as needed.

For scenarios where the list size changes frequently or insertions/deletions are common in the middle, alternatives
like `LinkedList` or other specialized data structures might be more suitable.

# Advantages:

1. **Dynamic Resizing**: Unlike arrays, `ArrayList` can grow or shrink dynamically when elements are added or removed,
   making it more flexible.
2. **Random Access**: `ArrayList` provides constant time (O(1)) access to elements by index, just like arrays.
3. **Ease of Use**: Java’s `ArrayList` comes with various methods (`add`, `remove`, `get`, etc.) that simplify working
   with dynamic arrays.
4. **Type Safety**: Since Java 5, `ArrayList` supports generics, allowing type-safe collections.

# Disadvantages:

1. **Resizing Cost**: When the `ArrayList` reaches its capacity, it needs to resize (usually by 50% or 100% increase),
   which involves copying the elements to a new array. This resizing operation is costly.
2. **Slow Insertions and Deletions (at arbitrary positions)**: Inserting or deleting an element from the middle or start
   of the list requires shifting elements, making it slower (O(n)) compared to other data structures like linked lists.
3. **Memory Overhead**: `ArrayList` may consume more memory than arrays because of its capacity (an internal array
   that's typically larger than the actual list size).

# Time and Space Complexity:

| Operation                  | Time Complexity  | Space Complexity                | Description                                                                                                |
|----------------------------|------------------|---------------------------------|------------------------------------------------------------------------------------------------------------|
| **Access (get/set)**       | O(1)             | O(1)                            | Constant time for accessing or updating an element at a specific index.                                    |
| **Search**                 | O(n)             | O(1)                            | Linear search takes O(n) as you have to check each element.                                                |
| **Insertion (add)**        | O(1) (amortized) | O(n) (worst case when resizing) | Appending to the end is O(1) in amortized time, but adding to arbitrary positions is O(n) due to shifting. |
| **Deletion (remove)**      | O(n)             | O(1)                            | Deleting an element at an arbitrary position involves shifting elements, which takes O(n).                 |
| **Resizing (on capacity)** | O(n)             | O(n)                            | When the internal array is full, resizing the array involves copying all elements to a new array.          |
| **Initialization**         | O(1)             | O(n)                            | Initializing an `ArrayList` is constant time, but space grows dynamically.                                 |

# Examples

1. **Initialization and Adding Elements:**
    - Time Complexity: O(1) (Amortized)
   ```java
   // Initialize an ArrayList
   ArrayList<Integer> list = new ArrayList<>();
   
   // Add elements to the list
   list.add(1);  // [1]
   list.add(2);  // [1, 2]
   list.add(3);  // [1, 2, 3]
   ```

2. **Accessing Elements:**
    - Time Complexity: O(1)
   ```java
   // Access an element by index
   int element = list.get(1);  // Returns 2 (the element at index 1)
   ```

3. **Inserting at a Specific Index:**
    - Time Complexity: O(n) (Due to shifting)
   ```java
   // Insert element 10 at index 1
   list.add(1, 10);  // [1, 10, 2, 3]
   ```

4. **Removing an Element by Index:**
    - Time Complexity: O(n) (Due to shifting)
   ```java
   // Remove element at index 2
   list.remove(2);  // [1, 10, 3]
   ```

5. **Iterating Over an ArrayList:**
    - Time Complexity: O(n)
   ```java
   // Iterate using a for-each loop
   for (Integer num : list) {
       System.out.println(num);
   }
   ```

6. **Checking if an Element Exists (Search):**
    - Time Complexity: O(n)
   ```java
   boolean exists = list.contains(10);  // Returns true if 10 exists in the list
   ```

7. **Resizing Automatically:**
    - Time Complexity: O(n) (during resizing)
    - Internally, when you keep adding elements, the `ArrayList` resizes its internal array when it reaches capacity.
      This resizing involves copying all existing elements to a new, larger array, which incurs O(n) time complexity for
      that operation.

   Example:
   ```java
   ArrayList<Integer> list = new ArrayList<>(2);  // Initial capacity is 2
   list.add(1);  // No resizing
   list.add(2);  // No resizing
   list.add(3);  // Resizing happens here, O(n) operation
   ```
