#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char *argv[])
{
	int a,b,rows;

	printf("How many rows?");
	scanf("%d",&rows);

	for(a=1; a<=rows; a++){
		for(b=1; b<a; b++){
			printf(" *");
		}
		printf("\n");
	}
}
