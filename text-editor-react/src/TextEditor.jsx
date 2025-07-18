import React, { useEffect, useRef, useState } from "react";

const lineHeight = 20;

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [lineCount, setLineCount] = useState(1);
  const [jumpTo, setJumpTo] = useState("");
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    setLineCount(content.split("\n").length || 1);
  }, [content]);

  const handleScroll = () => {
    lineRef.current.scrollTop = textRef.current.scrollTop;
  };

  const handleJump = () => {
    const targetLine = parseInt(jumpTo);
    if (targetLine > 0 && targetLine <= lineCount) {
      textRef.current.scrollTop = (targetLine - 1) * lineHeight;
      textRef.current.setSelectionRange(
        content
          .split("\n")
          .slice(0, targetLine - 1)
          .join("\n").length,
        content
          .split("\n")
          .slice(0, targetLine - 1)
          .join("\n").length
      );
      textRef.current.focus();
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setContent(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div
        style={{ display: "flex", height: "400px", border: "1px solid #ccc" }}
      >
        <div
          ref={lineRef}
          style={{
            background: "#eee",
            width: "40px",
            padding: "5px",
            textAlign: "right",
            fontFamily: "monospace",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              style={{
                height: `${lineHeight}px`,
                lineHeight: `${lineHeight}px`,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onScroll={handleScroll}
          style={{
            flex: 1,
            padding: "5px",
            border: "none",
            outline: "none",
            resize: "none",
            lineHeight: `${lineHeight}px`,
            fontFamily: "monospace",
            height: "100%",
          }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          placeholder="Jump to line..."
          value={jumpTo}
          onChange={(e) => setJumpTo(e.target.value)}
        />
        <button onClick={handleJump}>Jump</button>
        <input type="file" accept=".txt" onChange={handleFile} />
      </div>
    </>
  );
};

export default TextEditor;
