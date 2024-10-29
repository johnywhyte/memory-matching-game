import { useMetrics } from '@/hooks/useScores';

const ResultsScreen = () => {
  const { clicks, bestScore } = useMetrics();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold">Game Completed!</h2>
        <p>Total Clicks: {clicks}</p>
        {clicks === bestScore ? (
          <p>🎉 New Best Score! 🎉</p>
        ) : (
          <p>Try to beat your best score of {bestScore} clicks!</p>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen
