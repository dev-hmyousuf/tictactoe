import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '@/components/ui/GradientButton';
import ResultPopup from '@/components/ResultPopup';

interface GameBoardProps {
  difficulty?: 'easy' | 'medium' | 'hard';
  onReset: () => void;
  isSinglePlayer: boolean;
}

// Add this type guard for cell values
type CellValue = 'X' | 'O' | null;

const GameBoard = ({ difficulty, onReset, isSinglePlayer }: GameBoardProps) => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'draw' | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (isSinglePlayer && !isXNext) {
      const aiMove = getAIMove(board, difficulty!);
      if (aiMove !== null) {
        handlePress(aiMove);
      }
    }
  }, [isXNext, isSinglePlayer]);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setGameResult('win');
      setWinner(winner);
      setShowResult(true);
    } else if (board.every(cell => cell !== null)) {
      setGameResult('draw');
      setShowResult(true);
    }
  }, [board]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showResult) {
      timer = setTimeout(() => {
        handlePlayAgain();
      }, 2000); // 2 seconds delay
    }
    return () => clearTimeout(timer);
  }, [showResult]);

  const handlePress = (index: number) => {
    if (board[index] || status) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus(null);
    onReset();
  };

  const getAIMove = (board: CellValue[], difficulty: 'easy' | 'medium' | 'hard'): number | null => {
    switch (difficulty) {
      case 'easy':
        return getRandomMove(board);
      case 'medium':
        return getMediumMove(board);
      case 'hard':
        return getBestMove(board);
      default:
        return null;
    }
  };

  const getRandomMove = (board: CellValue[]): number | null => {
    const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const getMediumMove = (board: CellValue[]): number | null => {
    return getRandomMove(board); // Placeholder for a more complex strategy
  };

  const getBestMove = (board: CellValue[]): number | null => {
    return getRandomMove(board); // Placeholder for Minimax
  };

  const calculateWinner = (squares: CellValue[]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePlayAgain = () => {
    resetBoard();
    setShowResult(false);
  };

  const handleClosePopup = () => {
    setShowResult(false);
    onReset();
  };

  return (
    <>
      <LinearGradient 
        colors={['#f8f9fa', '#e9ecef']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.board}>
          {[0, 1, 2].map((row) => (
            <View key={row} style={styles.row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                return (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.cell,
                      board[index] && styles[board[index].toLowerCase() as 'x' | 'o'],
                      col < 2 && styles.rightBorder,
                      row < 2 && styles.bottomBorder,
                    ]}
                    onPress={() => handlePress(index)}
                  >
                    <Text style={styles.cellText}>{board[index]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
        
        {status && <Text style={styles.status}>{status}</Text>}
        
        <GradientButton
          title="Reset Game"
          onPress={resetBoard}
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.resetButton}
        />
      </LinearGradient>
      <ResultPopup
        visible={showResult}
        result={gameResult}
        winner={winner || ''}
        onPlayAgain={handlePlayAgain}
        onClose={handlePlayAgain}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  board: {
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  rightBorder: {
    borderRightWidth: 3,
    borderColor: '#dee2e6',
  },
  bottomBorder: {
    borderBottomWidth: 3,
    borderColor: '#dee2e6',
  },
  x: {
    backgroundColor: '#ff6b6b',
  },
  o: {
    backgroundColor: '#4dabf7',
  },
  cellText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  status: {
    display: 'none',
  },
  resetButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default GameBoard; 