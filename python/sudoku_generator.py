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
from random import choice, randint

class Cell:
    """doc needed"""
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



class Sudoku:
    """doc needed"""
    def __init__(self,size=4):  # je met la taille du sudoku à 4x4 par défaut pour l'instant
        """Constructeur
        Arguments :
            - size : taille du sudoku (4x4 ou 9x9), par défaut 4
        """
        self.size = size
        self.tableau = []
        self.generate_sudoku()
        self.debug()
        # self.tableau = self.__generate_empty_sudoku()  # tableau qui représente le sudoku
        

    # --- Fonctions modifiants le sudoku ---
    def __generate_empty_sudoku(self):
        """int -> list[int]
        Génére et renvoie un sudoku vide en fonction de la taille précisée ('size')
        """
        return [[Cell(0,i,int(j/self.size)) for i in range(self.size)] for j in range(0,self.size**2,self.size)]
        

    def generate_sudoku(self):      # assez basique pour l'instant et pas opti
        # l = [i for i in range(1,self.size+1)]
        # for i in range(self.size):
        #     choice_l  = choice(l)
        #     self.tableau.append(choice_l)
        #     l.remove(choice_l)


        for i in range(16):
            random_cell = self.tableau[randint(0,self.size-1)][randint(0,self.size-1)]

            if random_cell.value == 0:
                random_list = [i for i in range(1,5)]
                new_cell = choice(random_list)

                while True:
                    self.debug()
                    print(new_cell)
                    if self.is_correct(random_cell,new_cell):
                        print(True)
                        random_cell.value = new_cell
                        break                        
                    else:
                        print(False)
                        random_cell.value = "X"
                        random_list.remove(new_cell)
                        if len(random_list) <= 0:
                            r=len([i for i in self.get_row(random_cell.y+1) if i == 0])
                            c=len([i for i in self.get_column(random_cell.x+1) if i == 0])
                            s=len([i for i in self.get_square(random_cell.get_square()) if i == 0])

                            print(min(r,c,s))

                        else:
                            new_cell = choice(random_list)



    # --- Fonctions récupérants des données sur le sudoku (getters,...) ---
    def get_column(self,column):
        """int -> lis[int] | False
        Renvoie une liste contenant les numéros de la colonne donnée en paramètres ('column')"""
        if column > self.size or column < 1:
            return False
        return [self.tableau[i][column-1].value for i in range(len(self.tableau))]


    def get_row(self,row):
        """int -> list[int] | False
        Renvoie une liste contenant les numéros de la ligne donnée en paramètres ('row')"""
        if row > self.size or row < 1:
            return False
        return [i.value for i in self.tableau[row-1]]


    def get_square(self,square):    # pas du tout opti, à amélorer si possible
        """int -> list[int] | False
        Renvoie une liste contenant les numéros du carré donné en paramètres ('square')"""
        if square < 1 or square > self.size:
            return False

        l = []
        sr_size = sqrt(self.size)   # racine carrée de la taille du sudoku
        x_min = ((square-1)%sr_size)*sr_size
        y_min = ((square-1)//sr_size)*sr_size

        for j in self.tableau:
            for k in j:
                if x_min <= k.x < x_min+sr_size and y_min <= k.y < y_min*sr_size+sr_size:
                    l.append(k.value)
        return l
    

    # --- Fonctions de tests et aide ---
    def is_correct(self,cell,new_cell):
        """Cell*int-> bool
        Renvoie True si 'new_cell' peut être placée aux coordonées x,y de 'cell'
            sinon renvoie False"""
        x,y,square = cell.x,cell.y,cell.get_square(self.size)     # square est le numéro carré auqel appartient la case
        # print(x+1,y+1,square)
        # print(new_cell,":\n",self.get_row(y+1),"\n",self.get_column(x+1),"\n",self.get_square(square))
        if new_cell in self.get_row(y+1) or new_cell in self.get_column(x+1) or new_cell in self.get_square(square):
            return False
        return True


    def debug(self):
        """-> str
        Print le sudoku actuel dans un format plus lisible"""        
        for i in self.tableau:
            print([i[j].value for j in range(len(i))])




if __name__ == "__main__":
    sk_4x4 = Sudoku() # 4x4 par défaut
    sk_9x9 = Sudoku(9)

    # sk_4x4.debug()
    sk_4x4.generate_sudoku()
    # sk_4x4.debug()