---
Title: Vector
---

In Java, `Vector` is a legacy class that implements a dynamically resizable array, much like `ArrayList`. It is part of
the original Java collections framework but is synchronized, which makes it thread-safe. However, this synchronization
introduces overhead, and thus `Vector` is generally less preferred compared to `ArrayList` for non-threaded
applications.

For modern Java development, `Vector` is generally replaced by `ArrayList` in non-threaded applications and
by `CopyOnWriteArrayList` or `Collections.synchronizedList()` in threaded applications. If you need a dynamic array in a
multithreaded environment and are concerned about thread safety, you can use `Vector`. Otherwise, `ArrayList` is usually
a better choice for general usage.

# Advantages

1. **Thread-Safe**: `Vector` is synchronized, meaning it is thread-safe out of the box. If you need a thread-safe
   dynamic array, `Vector` can be useful without needing external synchronization mechanisms.
2. **Resizing Mechanism**: Like `ArrayList`, `Vector` automatically resizes itself when more elements are added beyond
   its current capacity. By default, the resizing increases the capacity by 100% (i.e., doubles the current capacity),
   which reduces the frequency of reallocations.
3. **Index-Based Access**: Since `Vector` uses an array internally, it provides O(1) random access to elements.
4. **Legacy Support**: Some legacy systems or APIs still use `Vector`, so it may be required to work with them for
   backward compatibility.

# Disadvantages

1. **Performance Overhead**: The synchronized methods in `Vector` add overhead even if only a single thread is accessing
   it. In modern applications, `ArrayList` is generally preferred unless synchronization is required.
2. **Excessive Synchronization**: Even in non-concurrent contexts, `Vector` performs synchronization, leading to
   unnecessary performance degradation. If synchronization is not needed, using `ArrayList` or explicit synchronization
   mechanisms (like `Collections.synchronizedList`) is more efficient.
3. **Less Used in Modern Java**: `Vector` has largely been replaced by `ArrayList` and other collections that are not
   synchronized by default. Explicit synchronization can be applied when necessary.

# Time and Space Complexity:

| Operation             | Time Complexity | Space Complexity | Description                                                                     |
|-----------------------|-----------------|------------------|---------------------------------------------------------------------------------|
| **Access (get/set)**  | O(1)            | O(n)             | Index-based access and setting values are O(1), thanks to the underlying array. |
| **Search (contains)** | O(n)            | O(1)             | Searching for an element requires scanning the entire array.                    |
| **Insertion (add)**   | O(1) amortized  | O(n)             | Amortized O(1) when adding elements, though occasional resizing costs O(n).     |
| **Deletion (remove)** | O(n)            | O(n)             | Removing an element requires shifting elements, which takes O(n).               |
| **Resizing Array**    | O(n)            | O(n)             | Resizing involves creating a new array and copying elements.                    |
| **Iteration**         | O(n)            | O(1)             | Iterating through the vector takes O(n).                                        |

# Examples

1. **Initialization and Adding Elements**:
    - Time Complexity: O(1) (amortized for adding elements)
   ```java
   // Initialize a Vector
   Vector<Integer> vector = new Vector<>();
   
   // Add elements
   vector.add(1);   // [1]
   vector.add(2);   // [1, 2]
   vector.add(3);   // [1, 2, 3]
   vector.addElement(4);  // [1, 2, 3, 4] (addElement is legacy method from the initial Java days)
   ```

2. **Accessing Elements by Index**:
    - Time Complexity: O(1)
   ```java
   // Get an element by index
   int value = vector.get(2);  // Returns 3
   ```

3. **Inserting at a Specific Index**:
    - Time Complexity: O(n) (since elements need to be shifted)
   ```java
   // Insert element at index 1
   vector.add(1, 10);  // [1, 10, 2, 3, 4]
   ```

4. **Removing an Element**:
    - Time Complexity: O(n) (due to shifting elements)
   ```java
   // Remove by index
   vector.remove(2);  // Removes element at index 2 (2), result: [1, 10, 3, 4]
   
   // Remove by value
   vector.remove((Integer) 10);  // Removes the element 10, result: [1, 3, 4]
   ```

5. **Resizing Behavior**:
    - Vectors automatically double their size when the capacity is exceeded. You can control the capacity explicitly as
      well:
   ```java
   // Initialize a Vector with an initial capacity of 5
   Vector<String> v = new Vector<>(5);
   
   // Add elements to force resizing
   v.add("A");
   v.add("B");
   v.add("C");
   v.add("D");
   v.add("E");
   v.add("F");  // Triggers a resize (capacity doubles)
   ```

6. **Thread-Safe Access**:
    - Time Complexity: O(1) for simple access but with added synchronization overhead
   ```java
   // Accessing a vector safely in a multithreaded environment
   synchronized (vector) {
       for (int element : vector) {
           System.out.println(element);
       }
   }
   ```

7. **Iterating Over a Vector**:
    - Time Complexity: O(n)
   ```java
   // Iterating over a Vector
   for (Integer num : vector) {
       System.out.println(num);
   }
   ```

8. **Using Legacy Methods**:
    - The `Vector` class also has several legacy methods such as `addElement` and `removeElement` which were part of the
      original version of Java collections.
   ```java
   // Add using legacy method
   vector.addElement(5);  // [1, 3, 4, 5]
   
   // Remove using legacy method
   vector.removeElement((Integer) 3);  // [1, 4, 5]
   ```


