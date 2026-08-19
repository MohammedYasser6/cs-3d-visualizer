const LL_CODE = {
  "C++": `// 1. Define the Node struct
struct Node {
    int data;
    Node* next;
    // Constructor
    Node(int d) : data(d), next(nullptr) {}
};

// 2. Create nodes and link them
Node* head = new Node(10);
head->next = new Node(24);`,

  Java: `// 1. Define the Node class
class Node {
    int data;
    Node next;
    // Constructor
    Node(int d) { 
        data = d; 
        next = null; 
    }
}

// 2. Create nodes and link them
Node head = new Node(10);
head.next = new Node(24);`,

  Kotlin: `// 1. Define a concise Data Class
class Node(var data: Int, var next: Node? = null)

// 2. Create nodes and link them
val head = Node(10)
head.next = Node(24)`,

  Python: `# 1. Define the Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# 2. Create nodes and link them
head = Node(10)
head.next = Node(24)`,
};
