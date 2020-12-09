#include <iostream>
#include <windows.h>
#include <string>


int main()
{
    int varInt = 123456;
    std::string varString = "DefaultString";
    char arrChar[128] = "Long char array right here ->";
    int* ptr2int = &varInt;
    int* ptr2ptr = ptr2int;
    int* ptr2ptr2 = ptr2ptr;
    std::string input;
    int intRead = 0;
    std::string stringRead;
    int intToWrite = 112233;
    int tempInt = 0;


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

    HANDLE hProc = OpenProcess(PROCESS_ALL_ACCESS, FALSE, GetCurrentProcessId());
    if (hProc == NULL) 
    {
	std::cout << "OpenProcess failed. GetLastError = " << std::dec << GetLastError() << std::endl;
	system("pause");
	return EXIT_FAILURE;
    }
    
    /*
    HANDLE hProcString = OpenProcess(PROCESS_ALL_ACCESS, FALSE, GetCurrentProcessId());
    if (hProcString == NULL) 
    {
	std::cout << "OpenProcess for hProcString failed. GetLastError = " << std::dec << GetLastError() << std::endl;
	system("pause");
	return EXIT_FAILURE;
    }
    */

    ReadProcessMemory(hProc, (LPCVOID)&varString, &stringRead, sizeof(std::string), NULL);
    std::cout << "stringRead = " << stringRead << std::endl;

    WriteProcessMemory(hProc, (LPVOID)&intToWrite, &tempInt, sizeof(int), NULL);
    std::cout << "Overwritten Successfully..." << std::endl;

    ReadProcessMemory(hProc, (LPCVOID)&varInt, &intRead, sizeof(int), NULL);
    std::cout << "intRead = " << std::dec << intRead << std::endl;
    std::cout << "Press ENTER to quit." << std::endl;
    CloseHandle(hProc);
    getchar();
    
    do
    {
        std::cout << "Process ID: " << GetCurrentProcessId() << std::endl;
        std::cout << "\n" << std::endl;

        std::cout << "varInt     " << &varInt << ") = " << varInt << std::endl;
        std::cout << "varString     " << &varString << ") = " << varString << std::endl;
        std::cout << "arrChar     " << &arrChar << ") = " << arrChar << std::endl;
        std::cout << "\n" << std::endl;

        std::cout << "ptr2int     " << &ptr2int << ") = " <<  ptr2int << std::endl;
        std::cout << "ptr2ptr     " << &ptr2ptr << ") = " <<  ptr2ptr << std::endl;
        std::cout << "ptr2ptr2     " << &ptr2ptr2 << ") = " <<  ptr2ptr2 << std::endl;
        std::cout << "\n" << std::endl;
        //std::cout << "Press ENTER to print again" << std::endl;
        //getchar();
        //std::cout << "--------------------------------------------------" << std::endl;

    } while (true);
    

    return EXIT_SUCCESS;
}