using namespace std;

#include <iostream>

string CryptDecrypt(string EncryptMessage) {
	char key = 'K';
	string result = EncryptMessage;

	for (int j = 0; j < EncryptMessage.size(); j++) {
		result[j] = EncryptMessage[j] ^ key;

	}
	return result;
}

int main()
{
	string Encrypted = CryptDecrypt("Hello, my name is Kirils!");
	cout << "The encrypted text is: " << Encrypted << "\n";
	string Decrypted = CryptDecrypt(Encrypted);
	cout << "The decrypted text is: " << Decrypted << "\n";
}