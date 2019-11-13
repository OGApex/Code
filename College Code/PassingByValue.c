#include <stdio.h>
#include <stdlib.h>

void add(int x, int y){
    x += y;
    printf("%d %d \n", x, y);
}

int main(void)
{
    int a = 10, b = 5;

    add(5, 10);
    printf("The values of a and b are: %d %d",a,b);
    return 0;
}
