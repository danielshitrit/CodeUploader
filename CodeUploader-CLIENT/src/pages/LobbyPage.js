import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useNavigate } from "react-router-dom";

export function LobbyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelectorAll("pre").forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, []);

  const codeBlocks = [
    {
      name: "Async case",
      lang: "javascript",
      code: `async function foo() {
            let result = await bar();
            console.log(result);
          }`,
    },
    {
      name: "Hello world",
      language: "java",
      code: `public class HelloWorld {
    public static void main(String[] args) {
      System.out.println("Hello, world!");
    }`,
    },
    {
      name: "Factorial",
      language: "c",
      code: `int factorial(int n) {
    if (n == 0 || n == 1) {
      return 1;
    }
    return n * factorial(n - 1);
    }`,
    },
    {
      name: "For loop",
      language: "python",
      code: `for i in range(10):
    print(i)`,
    },
  ];

  const handleCodeBlockClick = (index) => {
    navigate(`/code/${index}`);
  };

  return (
    <div className="lobbyPage">
      <h1>Choose code block</h1>
      <ul className="code-block-list">
        {codeBlocks.map((item, index) => (
          <li key={index} onClick={() => handleCodeBlockClick(index)}>
            <p>{item.name}</p>
            <pre>
              <code className={`language-${item.lang}`}>{item.code}</code>
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LobbyPage;
