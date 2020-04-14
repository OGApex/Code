#include <iostream>
#include <vector>
#include <fstream>
#include <string>


using namespace std;


void check(string& p, string& tempP, vector<string>& words, unsigned int i)
{
    for (auto s : words)
    {
        if (s == tempP)
        {
            p.replace(i - tempP.length(), tempP.length(), string(tempP.length(), '*'));
            break;
        }
    }
    tempP = "";
}

int main()
{
    ifstream CurseWords("CurseWords.txt");
    string InputStream;
    vector<string> badWords;
    while (CurseWords >> InputStream)
    {
        badWords.push_back(InputStream);
    }
    string phrase;
    cout << "Please enter a phrase with a curse word: " << endl;
    getline(cin, phrase); 
    string tempPhrase = "";
    for (unsigned int i = 0; i < phrase.length(); i++)
    {
        if (isalpha(phrase[i]))
        {
            tempPhrase += tolower(phrase[i]);
            if ((i + 1) == phrase.length())
                check(phrase, tempPhrase, badWords, i + 1);
        }
        else
        {
            check(phrase, tempPhrase, badWords, i);
        }
    }
    cout << phrase << '\n';
}
