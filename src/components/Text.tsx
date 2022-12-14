import React from 'react';

type Rainbow =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'violet';


// * Polymorphic Props Utility Functions    
type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsWithAs<C extends React.ElementType, Props> = Props & AsProp<C>;

type PropsToOmit<C extends React.ElementType, P> = keyof (PropsWithAs<C, P>)

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// * end Polymorphic Props Utility Functions

type TextProps = {
  color?: Rainbow | "black" | "white";
}

type PolymorphicRef<C extends React.ElementType> = 
React.ComponentPropsWithRef<C>[ 'ref' ]

type Props<C extends React.ElementType, P> = PolymorphicComponentProps<C, P>;

type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  P
  > = PolymorphicComponentProps<C, P> & {
    ref?: PolymorphicRef<C>
  }

type TextComponent = <C extends React.ElementType>(
  props: PolymorphicComponentPropsWithRef<C, TextProps>
) => React.ReactElement | null;


export const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = "span">(
    { as, style, color, children, ...otherProps }: Props<C, TextProps>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'span';
    const internalStyles = color ? { style: { ...style, color } } : {}
    return (
      <Component {...otherProps} {...internalStyles} ref={ref}>
        {children}
      </Component>
    )
  }
)


