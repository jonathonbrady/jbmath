export type Color =
  | 'red'
  | 'yellow'
  | 'green'
  | 'light-blue'
  | 'blue'
  | 'theme'
  | 'light-gray'
  | 'gray'
  | 'white'
  | 'black';
export type CSSColor =
  | 'is-danger'
  | 'is-warning'
  | 'is-success'
  | 'is-info'
  | 'is-link'
  | 'is-primary'
  | 'is-light'
  | 'is-dark'
  | 'is-white'
  | 'is-black';

/**
 * Returns the Bulma class name corresponding to the desired color.
 * @param c the "real" desired color
 */
export const getBulmaColorClass = (c: string): CSSColor => {
  switch (c) {
    case 'red':
      return 'is-danger';
    case 'yellow':
      return 'is-warning';
    case 'green':
      return 'is-success';
    case 'light-blue':
      return 'is-info';
    case 'blue':
      return 'is-link';
    case 'theme':
      return 'is-primary';
    case 'light-gray':
      return 'is-light';
    case 'gray':
      return 'is-dark';
    case 'white':
      return 'is-white';
    case 'black':
      return 'is-black';
    default:
      throw new Error('Undefined color.');
  }
};
