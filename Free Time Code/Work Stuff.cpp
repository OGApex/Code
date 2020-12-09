#include <iostream>
#include <windows.h>
#include <string>

int main(){

class Example 
    {
        public:
            int procId;
            std::string name;
            void Details(int id, std::string n)
            {
                procId = id;
                name = n;
            }

            void PrintDetails()
            {
                std::cout << "Hello, " << name << ". Your current process id is: 0x" << std::hex << procId << std::endl;
            }
            virtual void print()
            {
                std::cout << "Class 1" << std::endl;
            }
            ~Example();
    };

    class Class2 : public Example
    {
        public:
            void print()
            {
                std::cout << "Overloaded class" << std::endl;
            }
    };
    Example work;
    work.Details(GetCurrentProcessId(), "Alex");
    work.PrintDetails();
    Example* test = new Class2();
    test->print();
}