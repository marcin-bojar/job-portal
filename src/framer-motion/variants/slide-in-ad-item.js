const slideInAdItem = {
  visible: i => ({
    x: 0,
    transition: {
      delay: i * 0.2,
      ease: 0,
    },
  }),
  hidden: { x: '-100vw' },
};

export default slideInAdItem;
