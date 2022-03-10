"""
Je fais quelques tests pour la partie logique des sudokus
 - Alexis

Notes :
    • sk = sudoku
    • ici, les 0 dans les sudokus représentent des cases vides
"""
from math import sqrt

def debug_sk(sk):
    """list[list[int]] -> str | bool
    Print le sudoku 'sk' dans un format facile à lire"""

    if type(sk) != list:
        print("sk doit être de type list")
        return False

    sk_size = len(sk)
    line_size = int(sqrt(sk_size))
    
    # sudoku 4x4
    if line_size == 4:                  
        for i in range(0,16,4):
            print(f" | {sk[i]} | {sk[i+1]} | {sk[i+2]} | {sk[i+3]} |")
            print(f" |{(('-'*3)+'|')*4}")
    
    # sudoku 6x6
    elif line_size == 6:                  
        for i in range(0,36,6):
            print(f" | {sk[i]} | {sk[i+1]} | {sk[i+2]} | {sk[i+3]} | {sk[i+4]} | {sk[i+5]} |")
            print(f" |{(('-'*3)+'|')*6}")

    # sudoku 9x9s
    elif line_size == 9:                  
        for i in range(0,81,9):
            print(f" | {sk[i]} | {sk[i+1]} | {sk[i+2]} | {sk[i+3]} | {sk[i+4]} | {sk[i+5]} | {sk[i+6]} | {sk[i+7]} | {sk[i+8]} |")
            print(f" |{(('-'*3)+'|')*9}")
    
    print("\n")


if __name__ == "__main__":
    sk_4x4 = [0 for i in range(16)]
    sk_6x6 = [0 for i in range(36)]
    sk_9x9 = [0 for i in range(81)]

    debug_sk(sk_4x4)
    debug_sk(sk_6x6)
    debug_sk(sk_9x9)