import React, { useEffect } from 'react';

interface PlaygroundTransitionProps {
  onAnimationEnd: () => void;
}

const PlaygroundTransition: React.FC<PlaygroundTransitionProps> = ({ onAnimationEnd }) => {
  useEffect(() => {
    // This duration must match the longest animation duration in the CSS
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  // Create an array for the shards to easily render them
  const shardCount = 8;
  const shards = Array.from({ length: shardCount }, (_, i) => i + 1);

  return (
    <div className="playground-transition-container">
      <div className="playground-transition-perspective">
        {shards.map(id => (
          <div key={id} className={`playground-shard shard-${id}`}></div>
        ))}
      </div>
    </div>
  );
};

export default PlaygroundTransition;
