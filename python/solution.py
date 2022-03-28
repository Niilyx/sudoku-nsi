"""
Je fais quelques tests pour la partie logique des sudokus.
Toute aide est la bienvenue !
 - Alexis

Notes :
    • sk = sudoku
    • ici, les 0 dans les sudokus représentent des cases vides
    • Le sudoku peut être de taille 4x4 ou 9x9
    • Chaque case de sudoku est représentée par un objet de la classe Cell
            chaque Cell a donc une valeur, ainsi qu'un x et un y correspondant à sa place dans le tableau 
"""
from math import sqrt
from random import choice

class Cell:
    """Classe Cell, représente chaque cellule (case) du sudoku"""
    def __init__(self,value,x,y):
        """Constructeur
        Arguments :
            - value : la valeur de la case (entre 0 et 9)
            - x : position sur l'axe x de la case dans le sudoku
            - y : position sur l'axe y de la case dans le sudoku
        """
        self.value = value
        self.x = x
        self.y = y
    
    def get_square(self,size):      # à améliorer si possible
        """int -> int
        Renvoie le carré auquel appartient la case"""
        if size == 4:
            if 0 <= self.x <= 1 and 0 <= self.y <= 1:
                return 1
            elif 2 <= self.x <= 3 and 0 <= self.y <= 1:
                return 2
            elif 0 <= self.x <= 1 and 2 <= self.y <= 3:
                return 3
            elif 2 <= self.x <= 3 and 2 <= self.y <= 3:
                return 4

        elif size == 9:
            if 0 <= self.x <= 2 and 0 <= self.y <= 2:
                return 1
            elif 3 <= self.x <= 5 and 0 <= self.y <= 2:
                return 2
            elif 6 <= self.x <= 8 and 0 <= self.y <= 2:
                return 3
            elif 0 <= self.x <= 2 and 3 <= self.y <= 5:
                return 4
            elif 3 <= self.x <= 5 and 3 <= self.y <= 5:
                return 5
            elif 6 <= self.x <= 8 and 3 <= self.y <= 5:
                return 6
            elif 0 <= self.x <= 2 and 6 <= self.y <= 8:
                return 7
            elif 3 <= self.x <= 5 and 6 <= self.y <= 8:
                return 8
            elif 6 <= self.x <= 8 and 6 <= self.y <= 8:
                return 9


class Sudoku:
    """Classe Sudoku, réprésente le sudoku entier"""
    def __init__(self,size=4):
        """Constructeur
        Arguments :
            - size : taille du sudoku (4x4 ou 9x9), par défaut 4
            - grid : listes imbriquées représentant la grille de sudoku
        """
        self.size = size
        self.grid = self.__generate_empty_sudoku()  # la grille est vide au départ
        print("-----------------")
        print(self.get_square(1))
        print(self.get_square(2))
        print(self.get_square(3))
        print(self.get_square(4))
        print(self.get_square(5))
        print(self.get_square(6))
        print(self.get_square(7))
        print(self.get_square(8))
        print(self.get_square(9))
        print("-----------------")
        

    # --- Fonctions modifiants le sudoku ---

    def __generate_empty_sudoku(self):
        """int -> list[int]
        Génére et renvoie une liste d'objet 'Cell' (dont la valeur est 0) en fonction de 'self.size'
        """
        return [[Cell(0,i,int(j/self.size)) for i in range(self.size)] for j in range(0,self.size**2,self.size)]
        

    def generate_sudoku(self):      # assez basique, à améliorer si possible
        """Modifie 'self.grid' en générant un sudoku entier dont la taille dépend de 'self.size'"""
        
        # while not self.is_complete():
        while True:
            empty_cell = self.find_empty_cell()
            if not empty_cell:
                break
            
            numbers = list(range(1,self.size+1)) # Les possibilités à tester
            new_value = choice(numbers)

            while True:

                move_is_correct = self.is_correct(empty_cell,new_value)

                if move_is_correct == True:
                    # print(True)
                    # on pose le chiffre
                    # print("On pose")
                    empty_cell.value = new_value
                    break

                else:
                    # print(False)
                    try:
                        # on réessaye avec un autre chiffre
                        numbers.remove(new_value)
                        new_value = choice(numbers)
                        # print(f"On change new_value : {new_value}")
                    except:
                        # on échange les cases
                        #ici il faudrait test 3 fois en fait, (au cas où il y'auraits)
                        old_cell = move_is_correct[0][move_is_correct[1]]
                        # print(f"Cases changées : {old_cell.value,old_cell.x,old_cell.y} => {new_value}")
                        old_cell.value = 0
                        # if self.is_correct(empty_cell,new_value) == True:
                        #     empty_cell.value = new_value
                        # break
            # self.debug()
            # print("---")


    # --- Fonctions récupérants des données sur le sudoku (getters,...) ---

    def find_empty_cell(self):
        """-> Cell | None
        Renvoie la première case de la grille dont la valeur est 0, renvoie None s'il n'y en a pas"""
        for i in self.grid:
            for j in i:
                if j.value == 0:
                    return j
        return None

    def get_column(self,column,values=True):
        """int * bool -> list[int] | list[Cell] | False
        Renvoie une liste contenant les numéros de la colonne donnée en paramètres ('column') si 'values' == True
                                                                                              sinon renvoies la liste même liste mais avec des objet Cell directement"""
        if column > self.size or column < 1:
            return False

        if values:
            return [self.grid[i][column-1].value for i in range(len(self.grid))]
        else:
            return [self.grid[i][column-1] for i in range(len(self.grid))]


    def get_row(self,row,values=True):
        """int * bool -> list[int] | list[Cell] | False
        Renvoie une liste contenant les numéros de la ligne donnée en paramètres ('row') si 'values' == True
                                                                                           sinon renvoies la liste même liste mais avec des objet Cell directement"""
        if row > self.size or row < 1:
            return False

        if values:
            return [i.value for i in self.grid[row-1]]
        else:
            return [i for i in self.grid[row-1]]



    def get_square(self,square,values=True):    # pas du tout opti, à amélorer si possible
        """int * bool -> list[int] | list[Cell] | False
        Renvoie une liste contenant les numéros du carré (sous-grille) donné en paramètres ('square') si 'values' == True
                                                                                                      sinon renvoies la liste même liste mais avec des objet Cell directement"""
        if square < 1 or square > self.size:
            return False

        l = []
        sr_size = sqrt(self.size)   # racine carrée de la taille du sudoku
        x_min = ((square-1)%sr_size)*sr_size
        y_min = ((square-1)//sr_size)*sr_size

        if values:
            for j in self.grid:
                for k in j:
                    if x_min <= k.x < x_min+sr_size and y_min <= k.y < y_min+sr_size:
                        l.append(k.value)
        
        else:
            for j in self.grid:
                for k in j:
                    if x_min <= k.x < x_min+sr_size and y_min <= k.y < y_min+sr_size:
                        l.append(k)
        return l
    

    # --- Fonctions de tests et aide ---

    def is_complete(self):
        """renvoie True si le sudoku est entier sinon False"""
        for i in range(self.size):
            for j in range(self.size):
                current_cell = self.grid[i][j]
                if current_cell.value == 0 or self.get_row(i+1).count(current_cell.value) > 1 or self.get_column(j+1).count(current_cell.value) > 1 or self.get_square(current_cell.get_square(self.size)).count(current_cell.value) > 1:
                    return False
        return True


    def is_correct(self,cell,new_value):
        """Cell*int -> tuple(list[Cell],int) | True
        Renvoie True si 'new_value' peut être placée aux coordonées x,y de 'cell'
            sinon renvoie un tuple de la liste des cellules où se trouve l'élément dupliqué, ainsi que de l'index de 'new_value' dans cette même liste ([Cell],int)"""
        x,y,square = cell.x,cell.y,cell.get_square(self.size)

        # si la ligne contient la nouvelle valeur
        if new_value in self.get_row(y+1):  
            return self.get_row(y+1,False),self.get_row(y+1).index(new_value)

        # si la colonne contient la nouvelle valeur
        elif new_value in self.get_column(x+1): 
            return self.get_column(x+1,False),self.get_column(x+1).index(new_value)

        # si le carré contient la nouvelle valeur
        elif new_value in self.get_square(square):  
            return self.get_square(square,False),self.get_square(square).index(new_value)

        return True

   
    def debug(self):
        """Print le sudoku actuel dans un format plus lisible"""        
        for i in self.grid:
            print([i[j].value for j in range(len(i))])



if __name__ == "__main__":
    sk_9x9 = Sudoku(9)
    sk_9x9.generate_sudoku()
    sk_9x9.debug()
    print("Le sudoku est complet : ",sk_9x9.is_complete())
    