import { InterpolationWithTheme } from '@emotion/core'
// import generateTheme from 'styles/theme'
// import { Theme as MUITheme } from '@material-ui/core'

// type Thema = ReturnType<typeof generateTheme>

// https://github.com/emotion-js/emotion/issues/1197

declare module 'react' {
  interface DOMAttributes<T> {
    css?: InterpolationWithTheme<Theme>
  }
}

declare global {
  namespace JSX {
    /**
     * Do we need to modify `LibraryManagedAttributes` too,
     * to make `className` props optional when `css` props is specified?
     */

    interface IntrinsicAttributes {
      css?: InterpolationWithTheme<Theme>
    }
  }
}
