import React from 'react';
import styles from './Header.module.scss';

const Overlay: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

export default Overlay;
