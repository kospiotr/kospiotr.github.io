---
title: Data Structures
---

Using Java Framework


## Queue

## Set



## HashMap (or Map Interface)

* **Description:** A collection that stores key-value pairs, providing constant-time complexity for insertions,
  deletions, and lookups.
* **Java Implementation:**

Example:

```java
HashMap<String, Integer> map = new HashMap<>();
```

* **Use Cases:** Frequently used for scenarios requiring fast lookups by a key, like counting frequencies of elements or
  caching.

### 5. HashSet (or Set Interface)

* **Description:** A collection that stores unique elements with no duplicate values and provides constant-time
  operations.
* **Java Implementation:**

Example:

```java
HashSet<Integer> set = new HashSet<>();
```

* **Use Cases:** Efficient for checking the existence of an element in a collection.

### 7. Queue

* **Description:** A first-in-first-out (FIFO) data structure where the first element added is the first one to be
  removed.
* **Java Implementation:**

Example:

```java
Queue<Integer> queue = new LinkedList<>();
```

* **Use Cases:** Task scheduling, breadth-first search (BFS), etc.


### 9. Tree (Binary Tree, Binary Search Tree)

* **Description:** A hierarchical data structure where each node has a value and pointers to child nodes.
* **Java Implementation:** Custom implementations for Binary Tree or Binary Search Tree.
* **Use Cases:** Efficient searching, sorting, hierarchical data representation, etc.

### 10. Trie

* **Description:** A tree-like data structure used to store dynamic sets of strings, where each node represents a
  character.
* **Java Implementation:** Custom implementation is typically required.
* **Use Cases:** Autocomplete, dictionary implementations, and prefix-based searches.

### 11. Graph

* **Description:** A data structure consisting of nodes (vertices) and edges that connect pairs of nodes.
* **Java Implementation:** You can implement graphs using an adjacency list, adjacency matrix, or edge list.
* **Use Cases:** Modeling relationships, networks, pathfinding algorithms (BFS, DFS, Dijkstra), etc.

### 13. LinkedHashMap

* **Description:** A HashMap that maintains the insertion order.
* **Java Implementation:**

Example:

```java
LinkedHashMap<String, Integer> lhm = new LinkedHashMap<>();
```

* **Use Cases:** Useful when you need to maintain the order of entries while performing fast lookups.

### 14. TreeMap

* **Description:** A Red-Black tree-based implementation of `Map` that keeps keys in sorted order.
* **Java Implementation:**

Example:

```java
TreeMap<String, Integer> treeMap = new TreeMap<>();
```

* **Use Cases:** When you need sorted key-value pairs.

### 15. BitSet

* **Description:** A special array-like data structure that efficiently stores bits.
* **Java Implementation:**

Example:

```java
BitSet bitSet = new BitSet();
```

* **Use Cases:** Storing and performing operations on bits like flags, bloom filters, etc.

### 16. EnumSet

* **Description:** A specialized `Set` for use with enum types.
* **Java Implementation:**

Example:

```java
EnumSet<Day> days = EnumSet.of(Day.MONDAY, Day.WEDNESDAY);
```

* **Use Cases:** Handling sets of enums, particularly in situations where performance matters.