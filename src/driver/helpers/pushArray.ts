export const pushArray = <T>(src: T[], toAdd: T[]): void => {
  for (const elt of toAdd) {
    src.push(elt);
  }
};
