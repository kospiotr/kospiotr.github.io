---
Title: HashSet
---

In Java, a `HashSet` implements the `Set` interface. It is backed by a `HashMap` and is primarily used to store unique
elements (no duplicates). Since it uses hashing for its internal implementation, operations like add, remove, and search
can be performed in constant time on average.

# Advantages

1. **Fast Performance**: Most operations like adding, removing, and checking if an element exists have an average time
   complexity of `O(1)` due to the underlying hash table.
2. **No Duplicates**: Ensures that all elements are unique, which is useful when you need to maintain a collection
   without duplicates.
3. **Allows Null**: `HashSet` allows a single `null` element.
4. **Unordered**: Elements are not stored in any particular order, which can be more efficient when order doesn’t
   matter.
5. **Good for large data sets**: Efficient for handling large collections due to its fast average-time complexity for
   fundamental operations.

# Disadvantages

1. **No Ordering**: Does not maintain the insertion order of elements. If you need order, you should
   consider `LinkedHashSet` or `TreeSet`.
2. **Poor Performance for Large Load Factors**: If the hash function is inefficient or the load factor (ratio of
   elements to table size) becomes too high, performance can degrade significantly.
3. **Requires Proper Hashing**: Performance heavily depends on a good implementation of the `hashCode()` method for the
   elements. Poorly implemented `hashCode()` can lead to excessive collisions and degrade performance to `O(n)` for some
   operations.
4. **Extra Memory**: Requires additional space to store the hash table.

# Time and Space Complexity

| Operation | Average Time Complexity | Worst-Case Time Complexity | Space Complexity | Description                                                                     |
|-----------|-------------------------|----------------------------|------------------|---------------------------------------------------------------------------------|
| Add       | `O(1)`                  | `O(n)`                     | `O(n)`           | `O(1)` on average; `O(n)` in the worst case when there are too many collisions. |
| Remove    | `O(1)`                  | `O(n)`                     | `O(n)`           | `O(1)` on average; `O(n)` in the worst case when collisions occur.                                                                                |
| Contains  | `O(1)`                  | `O(n)`                     | `O(n)`           | `O(1)` on average; `O(n)` in the worst case when collisions occur.                                                                                |
| Size      | `O(1)`                  | `O(1)`                     | `O(n)`           |                                                                                 |
| isEmpty   | `O(1)`                  | `O(1)`                     | `O(n)`           |                                                                                 |

# Examples

1. **Add (add)**: Adds an element to the set if it's not already present.
    - Time Complexity: O(1)
    ```java
    HashSet<String> hashSet = new HashSet<>();
    
    // Adding elements
    hashSet.add("Apple");  // [ "Apple" ]
    hashSet.add("Banana"); // [ "Apple", "Banana" ]
    hashSet.add("Cherry"); // [ "Apple", "Banana", "Cherry" ]

    // Duplicates are not allowed
    hashSet.add("Apple"); // [ "Apple", "Banana", "Cherry" ]
    ```

2. **Remove (remove)**: Removes a specified element from the set.
    - Time Complexity: O(1)
    ```java
    hashSet.remove("Banana"); // [ "Apple", "Cherry" ]
    ```
3. **Contains (contains)**: Checks if a particular element exists in the set.
    - Time Complexity: O(1)
    ```java
    hashSet.contains("Apple"); // true
    ```
4. **Size (size)**: Returns the number of elements in the set.
    - Time Complexity: O(1)
    ```java
    hashSet.size(); // 2
    ```
5. **isEmpty**: Checks if the set is empty.
    - Time Complexity: O(1)
    ```java
    hashSet.isEmpty(); // false
    ```
    - Time Complexity: O(n)
    ```java
    for (String item : hashSet) {
        System.out.println(item);
    }
    ```

# Conclusion

- **HashSet** is highly efficient for basic operations like adding, removing, and searching for elements as long as you
  don't need the order of elements.
- For applications that require ordering, `LinkedHashSet` or `TreeSet` may be better alternatives, though with different
  time complexities.
- When working with a `HashSet`, always ensure that the elements have properly implemented `hashCode()` and `equals()`
  methods to maintain good performance.