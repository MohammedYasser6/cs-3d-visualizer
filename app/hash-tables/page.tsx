const HASH_CODE = {
  "C++": `struct HashNode {
    string key;
    HashNode* next; // For collision chaining
};

// Array of pointers (The 5 Buckets)
HashNode* buckets[5] = {nullptr};

// The Hashing Math
int getBucketIndex(string key) {
    int asciiSum = 0;
    for(char c : key) {
        asciiSum += c;
    }
    return asciiSum % 5;
}`,

  Java: `class HashNode {
    String key;
    HashNode next; // For collision chaining
}

// Array of object references (The 5 Buckets)
HashNode[] buckets = new HashNode[5];

// The Hashing Math
int getBucketIndex(String key) {
    int asciiSum = 0;
    for(char c : key.toCharArray()) {
        asciiSum += c;
    }
    return asciiSum % 5;
}`,

  Kotlin: `class HashNode(val key: String, var next: HashNode? = null)

// Array of object references (The 5 Buckets)
val buckets = Array<HashNode?>(5) { null }

// The Hashing Math
fun getBucketIndex(key: String): Int {
    return key.sumOf { it.code } % 5
}`,

  Python: `class HashNode:
    def __init__(self, key):
        self.key = key
        self.next = None # For collision chaining

# Array of references (The 5 Buckets)
buckets = [None] * 5

# The Hashing Math
def get_bucket_index(key: str) -> int:
    ascii_sum = sum(ord(c) for c in key)
    return ascii_sum % 5`,
};
