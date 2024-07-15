import { useInView } from 'react-intersection-observer';
import '../../styles/Animations/AnimateText.css';

const AnimateText = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.0
  });

  return (
    <span ref={ref} className={`text ${inView ? 'animate' : ''} animate-text`}>
      {children}
    </span>
  );
};

export default AnimateText;
