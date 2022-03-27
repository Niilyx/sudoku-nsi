"""Différents tests de sudoku pour savoir s'il est correct (histoire d'être sur)"""

class Solution(object):
    def isValidSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: bool
        """
        for i in range(9):
            row = {}
            column = {}
            block = {}
            row_cube = 3 * (i//3)
            column_cube = 3 * (i % 3)
            for j in range(9):
                if board[i][j] != '0' and board[i][j] in row:
                    return False
                row[board[i][j]] = 1
                if board[j][i] != '0' and board[j][i] in column:
                    return False
                column[board[j][i]] = 1
                rc = row_cube+j//3
                cc = column_cube + j % 3
                if board[rc][cc] in block and board[rc][cc] != '0':
                    return False
                block[board[rc][cc]] = 1
        return True

sudoku = [
    [3, 2, 6, 1, 5, 4, 9, 8, 7],
    [8, 5, 9, 7, 6, 2, 4, 1, 3],
    [4, 7, 1, 9, 3, 8, 2, 6, 5],
    [1, 4, 7, 6, 8, 5, 3, 9, 2],
    [9, 6, 2, 4, 7, 3, 1, 5, 8],
    [5, 8, 3, 2, 9, 1, 7, 4, 6],
    [6, 3, 4, 5, 2, 9, 8, 7, 1],
    [7, 1, 8, 3, 4, 6, 5, 2, 9],
    [2, 9, 5, 8, 1, 7, 6, 3, 4]
]
ob1 = Solution()
print(ob1.isValidSudoku(sudoku))
