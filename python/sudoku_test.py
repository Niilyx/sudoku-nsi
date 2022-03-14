"""
Je fais quelques tests pour la partie logique des sudokus.
Toute aide est la bienvenue !
 - Alexis

Notes :
    • sk = sudoku
    • ici, les 0 dans les sudokus représentent des cases vides
"""

class Sudoku:
    """doc needed"""
    def __init__(self,size=4):  # je met la taille du sudoku à 4x4 par défaut pour l'instant
        """Constructeur
        Arguments :
            - size : taille du sudoku (4x4,6x6,9x9), par défaut 4
        """
        self.size = size
        self.tableau = self.generate_empty_sudoku(self.size)  # tableau qui représente le sudoku


    # --- Fonctions modifiants le sudoku ---
    def generate_empty_sudoku(self,size):
        """int -> list
        Génére et renvoie un sudoku vide en fonction de la taille précisée ('size')
        """
        return [i for i in range(size**2)]


    # --- Fonctions récupérants des données sur le sudoku (getters,...) ---
    def get_row(self,row):
        """int -> list | bool
        Renvoie une liste contenant les numéros de la ligne donnée en paramètres ('row')"""
        if row > self.size or row < 1:
            return False

        start = (row-1)*self.size
        return [self.tableau[i] for i in range(start,start+self.size)]
        
    def get_column(self,column):
        """int -> list | bool
        Renvoie une liste contenant les numéros de la colonne donnée en paramètres ('column')"""
        if column > self.size or column < 1:
            return False
        print([self.tableau[i] for i in range(column-1,self.size**2,self.size)])

    def get_square(self,square):    # pas du tout opti, à amélorer si possible
        """int -> list
        Renvoie une liste contenant les numéros du carré donné en paramètres ('square')"""
        
        # sudoku 4x4
        if self.size == 4:
            if square == 1:
                print([self.tableau[0],self.tableau[1],self.tableau[4],self.tableau[5]])
            elif square == 2:
                print([self.tableau[2],self.tableau[3],self.tableau[6],self.tableau[7]])
            elif square == 3:
                print([self.tableau[8],self.tableau[9],self.tableau[12],self.tableau[13]])
            elif square == 4:
                print([self.tableau[10],self.tableau[11],self.tableau[14],self.tableau[15]])
            else:
                print("Invalid square number")

        # sudoku 6x6
        elif self.size == 6:
            if square == 1:
                print([self.tableau[i+j] for i in range(0,7,6) for j in range(3)])
            elif square == 2:
                print([self.tableau[i+j] for i in range(3,10,6) for j in range(3)])
            elif square == 3:
                print([self.tableau[i+j] for i in range(12,19,6) for j in range(3)])
            elif square == 4:
                print([self.tableau[i+j] for i in range(15,22,6) for j in range(3)])
            elif square == 5:
                print([self.tableau[i+j] for i in range(24,31,6) for j in range(3)])
            elif square == 6:
                print([self.tableau[i+j] for i in range(27,34,6) for j in range(3)])
            else:
                print("Invalid square number")

    # sudoku 9x9
        elif self.size == 9:
            if square == 1:
                print([(i+j) for i in range(0,19,9) for j in range(3)])
            elif square == 2:
                print([(i+j) for i in range(3,22,9) for j in range(3)])
            elif square == 3:
                print([(i+j) for i in range(6,25,9) for j in range(3)])
            elif square == 4:
                print([(i+j) for i in range(27,46,9) for j in range(3)])
            elif square == 5:
                print([(i+j) for i in range(30,49,9) for j in range(3)])
            elif square == 6:
                print([(i+j) for i in range(33,52,9) for j in range(3)])
            elif square == 7:
                print([(i+j) for i in range(54,73,9) for j in range(3)])
            elif square == 8:
                print([(i+j) for i in range(57,76,9) for j in range(3)])
            elif square == 9:
                print([(i+j) for i in range(60,79,9) for j in range(3)])
            else:
                print("Invalid square number")
    

    # --- Fonctions de tests ---
    def debug(self):
        """-> str | bool
        Print le sudoku actuel dans un format plus lisible"""

        sk = self.tableau   # pour éviter de réécrire self.tableau à chaque foiss
        
        # sudoku 4x4
        if self.size == 4:                  
            for i in range(0,16,4):
                print(f" | {sk[i]} | {sk[i+1]} | {sk[i+2]} | {sk[i+3]} |")
                print(f" |{(('-'*3)+'|')*4}")
        
        # sudoku 6x6
        elif self.size == 6:                  
            for i in range(0,36,6):
                print(f" | {sk[i]} | {sk[i+1]} | {sk[i+2]} | {sk[i+3]} | {sk[i+4]} | {sk[i+5]} |")
                print(f" |{(('-'*3)+'|')*6}")

        # sudoku 9x9s
        elif self.size == 9:                  
            for i in range(0,81,9):
                print(f" | {sk[i]} | {sk[i+1]} | {sk[i+2]} | {sk[i+3]} | {sk[i+4]} | {sk[i+5]} | {sk[i+6]} | {sk[i+7]} | {sk[i+8]} |")
                print(f" |{(('-'*3)+'|')*9}")
        
        print("\n")



if __name__ == "__main__":
    sk_4x4 = Sudoku() # 4x4 par défaut
    sk_6x6 = Sudoku(6)
    sk_9x9 = Sudoku(9)
    
    # sk_4x4.debug() 
    # sk_6x6.debug()
    sk_9x9.debug()
    for i in range(1,10):
        sk_9x9.get_square(i)