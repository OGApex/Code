#include <algorithm>
#include <iterator>
#include <iostream>

using namespace std;

template<typename T>
void heap_sort(T begin, T end) {
  make_heap(begin, end);
  sort_heap(begin, end);
}

int main() {
  int a[] = {-200, -190, 10, 240, 981, -10, 890, 5, 1};
  heap_sort(begin(a), end(a));
  copy(begin(a), end(a), ostream_iterator<int>(std::cout, " "));
  std::cout << "\n";
}
