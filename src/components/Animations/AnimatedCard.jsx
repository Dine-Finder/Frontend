import { useInView } from 'react-intersection-observer';

const AnimatedCard = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  return (
    <div ref={ref} className={`card ${inView ? 'animate' : ''}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { inView: inView })
      )}
    </div>
  );
};

export default AnimatedCard;
