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
            - size : taille du sudoku (4x4,6x6,9x9), par défaut 4
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
        """int -> list
        Renvoie une liste contenant les numéros du carré donné en paramètres ('square')"""
        

        l = []
        for i,j in enumerate(self.tableau):
            for k in j:
                # print(int(i//sqrt(self.size)*sqrt(self.size)))
                # if sqrt(self.size)+(square-1)*sqrt(self.size) > k.x >= (square-1)*sqrt(self.size):
                #     print("x est dans le carré ")
                # if sqrt(self.size) > k.y >= 0:    # c'est long xD
                # print(k.x,":",k.y)
                print(k.x%2,":",k.y//2)
                if 2 <= k.x < 4 and 2 <= k.y < 4:
                    l.append(k.value)
        return l
        
        
            
    #         if square == 1:
    #             print([self.tableau[0][0],self.tableau[0][1],self.tableau[1][4],self.tableau[1][5]])
    #         elif square == 2:
    #             print([self.tableau[0][2],self.tableau[0][3],self.tableau[1][6],self.tableau[1][7]])
    #         elif square == 3:
    #             print([self.tableau[2][8],self.tableau[2][9],self.tableau[3][12],self.tableau[3][13]])
    #         elif square == 4:
    #             print([self.tableau[2][10],self.tableau[2][11],self.tableau[3][14],self.tableau[3][15]])
    #         else:
    #             print("Invalid square number")

    #     # sudoku 6x6
    #     elif self.size == 6:
    #         if square == 1:
    #             print([self.tableau[i+j] for i in range(0,7,6) for j in range(3)])
    #         elif square == 2:
    #             print([self.tableau[i+j] for i in range(3,10,6) for j in range(3)])
    #         elif square == 3:
    #             print([self.tableau[i+j] for i in range(12,19,6) for j in range(3)])
    #         elif square == 4:
    #             print([self.tableau[i+j] for i in range(15,22,6) for j in range(3)])
    #         elif square == 5:
    #             print([self.tableau[i+j] for i in range(24,31,6) for j in range(3)])
    #         elif square == 6:
    #             print([self.tableau[i+j] for i in range(27,34,6) for j in range(3)])
    #         else:
    #             print("Invalid square number")

    # # sudoku 9x9
    #     elif self.size == 9:
    #         if square == 1:
    #             print([(i+j) for i in range(0,19,9) for j in range(3)])
    #         elif square == 2:
    #             print([(i+j) for i in range(3,22,9) for j in range(3)])
    #         elif square == 3:
    #             print([(i+j) for i in range(6,25,9) for j in range(3)])
    #         elif square == 4:
    #             print([(i+j) for i in range(27,46,9) for j in range(3)])
    #         elif square == 5:
    #             print([(i+j) for i in range(30,49,9) for j in range(3)])
    #         elif square == 6:
    #             print([(i+j) for i in range(33,52,9) for j in range(3)])
    #         elif square == 7:
    #             print([(i+j) for i in range(54,73,9) for j in range(3)])
    #         elif square == 8:
    #             print([(i+j) for i in range(57,76,9) for j in range(3)])
    #         elif square == 9:
    #             print([(i+j) for i in range(60,79,9) for j in range(3)])
    #         else:
    #             print("Invalid square number")
    

    # --- Fonctions de tests ---
    def debug(self):
        """-> str | bool
        Print le sudoku actuel dans un format plus lisible"""        

        for i in self.tableau:
            print([i[j].value for j in range(len(i))])
        for i in self.tableau:
            print([(i[j].x,i[j].y) for j in range(len(i))])




if __name__ == "__main__":
    sk_4x4 = Sudoku() # 4x4 par défaut
    # sk_6x6 = Sudoku(6)
    # sk_9x9 = Sudoku(9)

    sk_4x4.debug()
    print(sk_4x4.get_square(1))
    # sk_9x9.generate_sudoku()
    # sk_9x9.debug()
    # sk_4x4.debug() 
    # sk_6x6.debug()
    # sk_9x9.debug()