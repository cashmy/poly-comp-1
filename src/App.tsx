import { Text } from './components/Text';
import React from 'react'
import './App.css';

const Emphasis = ({ children }: { children: React.ReactNode }) => {
  return (
    <em style={{ background: "yellow", color: "black" }}>
      {children}
    </em>
  )
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Text as="h1"> Hello Cash </Text>
        <Text as="h2" color="orange" style={{backgroundColor: 'white'}}>Start editing to see some magic happen!</Text>
        <Text as="a" href="www.google.com">Hello world</Text>
        <Text >This has no "as" </Text>
        <br />
        <Text as={Emphasis}>You are Awesome!</Text>
      </header>
    </div>
  );
}

