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
    """doc needed"""
    def __init__(self,size=4):  # je met la taille du sudoku à 4x4 par défaut pour l'instant
        """Constructeur
        Arguments :
            - size : taille du sudoku (4x4 ou 9x9), par défaut 4
        """
        self.size = size
        # self.tableau = [
        #     [Cell(2,0,0),Cell(3,1,0),Cell(1,2,0),Cell(4,3,0)],
        #     [Cell(4,0,1),Cell(1,1,1),Cell(3,2,1),Cell(2,3,1)],
        #     [Cell(1,0,2),Cell(2,1,2),Cell(3,2,2),Cell(3,3,2)],
        #     [Cell(3,0,3),Cell(4,1,3),Cell(2,2,3),Cell(1,3,3)],
        # ]
        self.tableau = self.__generate_empty_sudoku()  # tableau qui représente le sudoku

    # --- Fonctions modifiants le sudoku ---
    def __generate_empty_sudoku(self):
        """int -> list[int]
        Génére et renvoie un sudoku vide en fonction de la taille précisée ('size')
        """
        return [[Cell(0,i,int(j/self.size)) for i in range(self.size)] for j in range(0,self.size**2,self.size)]
        

    def generate_sudoku(self):      # TRES basique pour l'instant et pas opti DU TOUT (no way)
        # l = [i for i in range(1,self.size+1)]
        # for i in range(self.size):
        #     choice_l  = choice(l)
        #     self.tableau.append(choice_l)
        #     l.remove(choice_l)
        
            # test = 0
            # while test <= 15:
            
        while True:

            if self.is_complete():
                break
            else:
                self.tableau = self.__generate_empty_sudoku()
    
            for i in range(5000):
                random_x = randint(0,self.size-1)
                random_y = randint(0,self.size-1)
                random_cell = self.tableau[random_y][random_x]
                
                if random_cell.value == 0:
                    random_list = [i for i in range(1,self.size+1)]
                    new_cell = choice(random_list)
    
                    while True:
                        # print(new_cell)
                        # self.debug()
                        move_is_correct = self.is_correct(random_cell,new_cell)
                        if move_is_correct == True:
                            # print("je pose")
                            random_cell.value = new_cell
                            # self.debug()
                            break
                        else :
                            try:
                                # print("je change de nombre")
                                random_list.remove(new_cell)
                                new_cell = choice(random_list)
                            except:
                                # print("je swap")
                                if self.is_correct(random_cell,random_cell.value):
                                    old_cell = move_is_correct[0][move_is_correct[1]]
                                    old_cell.value = 0
                                    random_cell.value = new_cell
                                    # print("")
                                break
               # print("-------")
    
       # self.debug()
        print(self.is_complete())




    # --- Fonctions récupérants des données sur le sudoku (getters,...) ---
    def get_column(self,column,values=True):
        """int * bool -> lis[int] | False
        Renvoie une liste contenant les numéros de la colonne donnée en paramètres ('column')"""
        if column > self.size or column < 1:
            return False

        if values:
            return [self.tableau[i][column-1].value for i in range(len(self.tableau))]
        else:
            return [self.tableau[i][column-1] for i in range(len(self.tableau))]


    def get_row(self,row,values=True):
        """int * bool -> list[int] | False
        Renvoie une liste contenant les numéros de la ligne donnée en paramètres ('row')"""
        if row > self.size or row < 1:
            return False

        if values:
            return [i.value for i in self.tableau[row-1]]
        else:
            return [i for i in self.tableau[row-1]]



    def get_square(self,square,values=True):    # pas du tout opti, à amélorer si possible
        """int * bool -> list[int] | False
        Renvoie une liste contenant les numéros du carré donné en paramètres ('square')"""
        if square < 1 or square > self.size:
            return False

        l = []
        sr_size = sqrt(self.size)   # racine carrée de la taille du sudoku
        x_min = ((square-1)%sr_size)*sr_size
        y_min = ((square-1)//sr_size)*sr_size

        if values:
            for j in self.tableau:
                for k in j:
                    if x_min <= k.x < x_min+sr_size and y_min <= k.y < y_min*sr_size+sr_size:
                        l.append(k.value)
        
        else:
            for j in self.tableau:
                for k in j:
                    if x_min <= k.x < x_min+sr_size and y_min <= k.y < y_min*sr_size+sr_size:
                        l.append(k)
        return l
    

    # --- Fonctions de tests et aide ---
    def is_complete(self):
        """renvoie True si le sudoku est entier sinon False"""
        for i in range(self.size):
            for j in range(self.size):
                current_cell = self.tableau[i][j]
                if current_cell.value == 0 or self.get_row(i+1).count(current_cell.value) > 1 or self.get_column(j+1).count(current_cell.value) > 1 or self.get_square(current_cell.get_square(self.size)).count(current_cell.value) > 1:
                    return False
        return True

    def is_correct(self,cell,new_cell):
        """Cell*int-> bool
        Renvoie True si 'new_cell' peut être placée aux coordonées x,y de 'cell'
            sinon renvoie False"""
        x,y,square = cell.x,cell.y,cell.get_square(self.size)     # square est le numéro carré auqel appartient la case
        
        if new_cell in self.get_row(y+1):
            return self.get_row(y+1,False),self.get_row(y+1).index(new_cell)

        elif new_cell in self.get_column(x+1):
            return self.get_column(x+1,False),self.get_column(x+1).index(new_cell)

        elif new_cell in self.get_square(square):
            return self.get_square(square,False),self.get_square(square).index(new_cell)

        return True


    def debug(self):
        """-> str
        Print le sudoku actuel dans un format plus lisible"""        
        for i in self.tableau:
            print([(i[j].value) for j in range(len(i))])





if __name__ == "__main__":
    sk_4x4 = Sudoku() # 4x4 par défaut
    sk_9x9 = Sudoku(9)
    
    #sk_9x9.debug()
    sk_4x4.generate_sudoku()
    # sk_4x4.debug()
