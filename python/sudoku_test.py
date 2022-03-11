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

    def get_square(self,square):
        """int -> list
        Renvoie une liste contenant les numéros du carré donné en paramètres ('square')"""
        pass


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
    
    sk_4x4.debug()
    sk_6x6.debug()
    sk_9x9.debug()