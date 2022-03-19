"""
Je fais quelques tests pour la partie logique des sudokus.
Toute aide est la bienvenue !
 - Alexis

Notes :
    • sk = sudoku
    • ici, les 0 dans les sudokus représentent des cases vides
"""
from math import sqrt
from random import randint

class Case:
    """doc needed"""
    def __init__(self,value,x,y):
        self.value = value
        self.x = x
        self.y = y
        

class Sudoku:
    """doc needed"""
    def __init__(self,size=4):  # je met la taille du sudoku à 4x4 par défaut pour l'instant
        """Constructeur
        Arguments :
            - size : taille du sudoku (4x4 ou 9x9), par défaut 4
        """
        self.size = size
        self.tableau = self.__generate_empty_sudoku()  # tableau qui représente le sudoku


    # --- Fonctions modifiants le sudoku ---
    def __generate_empty_sudoku(self):
        """int -> list
        Génére et renvoie un sudoku vide en fonction de la taille précisée ('size')
        """

        return [[Case(i+j,i,int(j/self.size)) for i in range(self.size)] for j in range(0,self.size**2,self.size)]
        

    def generate_sudoku(self):
        for i in range(60):
            tile = randint(0,80)
            if self.tableau[tile] == 0:
                print("empty tile")
                random_int = randint(1,9)
                self.tableau[tile] = random_int
            else:
                print("not empty")


    # --- Fonctions récupérants des données sur le sudoku (getters,...) ---
    def get_column(self,column):
        """int -> list | bool
        Renvoie une liste contenant les numéros de la colonne donnée en paramètres ('column')"""
        if column > self.size or column < 1:
            return False
        return [self.tableau[i][column-1].value for i in range(len(self.tableau))]


    def get_row(self,row):
        """int -> list | bool
        Renvoie une liste contenant les numéros de la ligne donnée en paramètres ('row')"""
        if row > self.size or row < 1:
            return False
        return [i.value for i in self.tableau[row-1]]


    def get_square(self,square):    # pas du tout opti, à amélorer si possible
        """int -> list | None
        Renvoie une liste contenant les numéros du carré donné en paramètres ('square')"""
        if square < 1 or square > self.size:
            return None

        l = []
        sr_size = sqrt(self.size)   # racine carrée de la taille du sudoku
        x_min = ((square-1)%sr_size)*sr_size
        y_min = ((square-1)//sr_size)*sr_size

        for j in self.tableau:
            for k in j:
                if x_min <= k.x < x_min+sr_size and y_min <= k.y < y_min*sr_size+sr_size:
                    l.append(k.value)
        return l
    

    # --- Fonctions de tests ---
    def debug(self):
        """-> str | bool
        Print le sudoku actuel dans un format plus lisible"""        

        for i in self.tableau:
            print([i[j].value for j in range(len(i))])




if __name__ == "__main__":
    # sk_4x4 = Sudoku() # 4x4 par défaut
    sk_9x9 = Sudoku(9)

    sk_9x9.debug()
    print(sk_9x9.get_square(2))
    # sk_9x9.generate_sudoku()
    # sk_9x9.debug()
    # sk_4x4.debug() 
    # sk_6x6.debug()
    # sk_9x9.debug()