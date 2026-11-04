import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from './motion';

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'p' | 'span';
};

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({ children, delay = 0, y = 32, as = 'div', ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
