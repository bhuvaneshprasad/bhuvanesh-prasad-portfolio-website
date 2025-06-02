"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaClipboard, FaClipboardCheck, FaDownload, FaUpload, FaExpand, FaCompress, FaUndo, FaRedo, FaSyncAlt, FaChevronDown, FaChevronRight, FaEye } from "react-icons/fa";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(null); // null, 'input', or 'output'
  const [syncScroll, setSyncScroll] = useState(false);
  const [expandLevel, setExpandLevel] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHistory, setShowHistory] = useState(true);
  const [expandedDates, setExpandedDates] = useState({});
  const [inputHeight, setInputHeight] = useState(400); // Increased height
  const [outputHeight, setOutputHeight] = useState(400); // Increased height

  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize history and preferences from localStorage
  useEffect(() => {
    try {
      // Load history
      const savedHistory = localStorage.getItem("jsonFormatterHistory");
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        // Filter history to only include items from the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const filteredHistory = parsedHistory.filter(item => {
          return new Date(item.timestamp) > sevenDaysAgo;
        });

        setHistory(filteredHistory);
      }

      // Load sync scroll preference
      const savedSyncScroll = localStorage.getItem("jsonFormatterSyncScroll");
      if (savedSyncScroll !== null) {
        setSyncScroll(savedSyncScroll === "true");
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("jsonFormatterHistory", JSON.stringify(history));
    }
  }, [history]);

  // Save sync scroll preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("jsonFormatterSyncScroll", syncScroll.toString());
  }, [syncScroll]);

  // Format JSON when expand level changes (but not on input change)
  useEffect(() => {
    if (input && expandLevel !== null) {
      formatJSON(input);
    }
  }, [expandLevel]);

  // Sync scroll between input and output
  useEffect(() => {
    if (syncScroll && inputRef.current && outputRef.current) {
      const handleInputScroll = () => {
        const inputEl = inputRef.current;
        const outputEl = outputRef.current;

        const inputScrollRatio = inputEl.scrollTop / (inputEl.scrollHeight - inputEl.clientHeight);
        outputEl.scrollTop = inputScrollRatio * (outputEl.scrollHeight - outputEl.clientHeight);
      };

      const handleOutputScroll = () => {
        const inputEl = inputRef.current;
        const outputEl = outputRef.current;

        const outputScrollRatio = outputEl.scrollTop / (outputEl.scrollHeight - outputEl.clientHeight);
        inputEl.scrollTop = outputScrollRatio * (inputEl.scrollHeight - inputEl.clientHeight);
      };

      inputRef.current.addEventListener("scroll", handleInputScroll);
      outputRef.current.addEventListener("scroll", handleOutputScroll);

      return () => {
        inputRef.current?.removeEventListener("scroll", handleInputScroll);
        outputRef.current?.removeEventListener("scroll", handleOutputScroll);
      };
    }
  }, [syncScroll, input, output]);

  // Format JSON
  const formatJSON = (jsonString) => {
    if (!jsonString.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      // Try to repair common JSON errors
      const repairedJson = repairJSON(jsonString);

      // Parse the JSON to validate it
      const parsedJson = JSON.parse(repairedJson);

      // Format with proper indentation based on expand level
      let formattedJson;

      if (expandLevel === 1) {
        // Collapse all - just show the structure
        formattedJson = JSON.stringify(parsedJson);
      } else if (expandLevel > 1) {
        // Custom formatter that limits nesting depth
        formattedJson = formatWithDepth(parsedJson, expandLevel);
      } else {
        // Fully expanded
        formattedJson = JSON.stringify(parsedJson, null, 2);
      }

      // Add to history
      addToHistory(jsonString, formattedJson);

      // Set the output
      setOutput(formattedJson);
      setError("");
    } catch (err) {
      setError(`Error: ${err.message}`);
      setOutput("");
    }
  };

  // Format JSON with specific depth
  const formatWithDepth = (obj, depth) => {
    const indent = '  '; // 2 spaces

    const format = (obj, currentDepth) => {
      if (currentDepth > depth) {
        // Beyond the specified depth, collapse the structure
        if (Array.isArray(obj)) {
          return '[ ... ]';
        } else if (obj !== null && typeof obj === 'object') {
          return '{ ... }';
        } else {
          return JSON.stringify(obj);
        }
      }

      if (obj === null || typeof obj !== 'object') {
        return JSON.stringify(obj);
      }

      if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';

        let result = '[\n';
        for (let i = 0; i < obj.length; i++) {
          result += indent.repeat(currentDepth) + format(obj[i], currentDepth + 1);
          if (i < obj.length - 1) result += ',';
          result += '\n';
        }
        result += indent.repeat(currentDepth - 1) + ']';
        return result;
      } else {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';

        let result = '{\n';
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          result += indent.repeat(currentDepth) + `"${key}": ` + format(obj[key], currentDepth + 1);
          if (i < keys.length - 1) result += ',';
          result += '\n';
        }
        result += indent.repeat(currentDepth - 1) + '}';
        return result;
      }
    };

    return format(obj, 1);
  };

  // Repair common JSON errors
  const repairJSON = (jsonString) => {
    let result = jsonString;

    // Replace single quotes with double quotes (but not inside strings)
    result = result.replace(/'/g, '"');

    // Remove trailing commas in objects and arrays
    result = result.replace(/,\s*([}\]])/g, '$1');

    // Remove comments (both // and /* */)
    result = result.replace(/\/\/.*$/gm, '');
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');

    // Fix unquoted property names
    result = result.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');

    // Convert JavaScript literals to JSON format
    result = result.replace(/\btrue\b/gi, 'true');
    result = result.replace(/\bfalse\b/gi, 'false');
    result = result.replace(/\bnull\b/gi, 'null');

    // Remove JSONP function calls
    result = result.replace(/^[a-zA-Z0-9_$]+\s*\(/, '');
    result = result.replace(/\);$/, '');

    return result;
  };

  // Add to history
  const addToHistory = (input, output) => {
    // Only add if different from the current entry
    if (history.length === 0 || 
        (historyIndex >= 0 && history[historyIndex].input !== input) || 
        historyIndex < 0) {
      const newHistoryItem = {
        input,
        output,
        timestamp: new Date().toISOString()
      };

      // Remove future history if we're not at the end
      const newHistory = history.slice(0, historyIndex + 1);

      // Add new item
      newHistory.push(newHistoryItem);

      // Update history and index
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  // Handle undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(history[newIndex].input);
    }
  };

  // Handle redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setInput(history[newIndex].input);
    }
  };

  // Group history by date
  const groupHistoryByDate = () => {
    const groups = {};

    history.forEach((item, index) => {
      const date = new Date(item.timestamp);
      const dateStr = date.toLocaleDateString();

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }

      groups[dateStr].push({
        ...item,
        index: history.length - 1 - index
      });
    });

    return groups;
  };

  // Toggle date expansion
  const toggleDateExpansion = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  // Copy history item to clipboard
  const copyHistoryItem = (text, isInput) => {
    navigator.clipboard.writeText(text);
    // We could add a toast notification here
  };

  // Apply history item to current input/output
  const applyHistoryItem = (index) => {
    setHistoryIndex(index);
    setInput(history[index].input);
  };

  // Handle input resize
  const handleInputResize = (e) => {
    const startY = e.clientY;
    const startHeight = inputHeight;

    const doDrag = (e) => {
      const newHeight = startHeight + e.clientY - startY;
      if (newHeight > 100) { // Minimum height
        setInputHeight(newHeight);
      }
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  // Handle output resize
  const handleOutputResize = (e) => {
    const startY = e.clientY;
    const startHeight = outputHeight;

    const doDrag = (e) => {
      const newHeight = startHeight + e.clientY - startY;
      if (newHeight > 100) { // Minimum height
        setOutputHeight(newHeight);
      }
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      setError("Failed to read from clipboard. Please check permissions.");
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Handle file download
  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formatted.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = (mode) => {
    setFullscreenMode(fullscreenMode === mode ? null : mode);
  };

  // Syntax highlighting for JSON
const syntaxHighlight = (jsonString) => {
  if (!jsonString) return '';

  let json;
  try {
    json = JSON.parse(jsonString);
  } catch (e) {
    return 'Invalid JSON';
  }

  const escapeHtml = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const styleMap = {
    key: 'color:#9876AA',
    string: 'color:#6A8759',
    number: 'color:#6897BB',
    boolean: 'color:#CC7832',
    null: 'color:#CC7832',
    date: 'color:#FFC66D',
    url: 'color:#409EFF',
    punctuation: 'color:#A9B7C6'
  };

  const isDate = (val) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?$/.test(val);
  const isUrlOrEmail = (val) => /^(https?:\/\/|mailto:|.*@.*\..*)/.test(val);

  const pretty = JSON.stringify(json, null, 2);
  const highlighted = pretty.replace(
    /("(.*?)")(\s*:)?|(\b(true|false|null)\b)|(-?\d+(\.\d+)?([eE][+-]?\d+)?)/g,
    (match, strGroup, keyName, colon, keywordGroup, boolNull, number) => {
      if (strGroup) {
        if (colon) {
          // It's a key
          return `<span style="${styleMap.key}">${escapeHtml(strGroup)}</span>:`;
        } else {
          const unquoted = strGroup.slice(1, -1);
          if (isDate(unquoted)) {
            return `<span style="${styleMap.date}">${escapeHtml(strGroup)}</span>`;
          } else if (isUrlOrEmail(unquoted)) {
            return `<span style="${styleMap.url}">${escapeHtml(strGroup)}</span>`;
          }
          return `<span style="${styleMap.string}">${escapeHtml(strGroup)}</span>`;
        }
      } else if (keywordGroup) {
        if (keywordGroup === 'null') {
          return `<span style="${styleMap.null}">${keywordGroup}</span>`;
        }
        return `<span style="${styleMap.boolean}">${keywordGroup}</span>`;
      } else if (number !== undefined) {
        return `<span style="${styleMap.number}">${number}</span>`;
      }
      return match;
    }
  );

  const withPunctuationStyled = highlighted.replace(
    /([{}\[\],])/g,
    `<span style="${styleMap.punctuation}">$1</span>`
  );

  return (
    <pre
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.4em',
        fontSize: '14px',
      }}
      dangerouslySetInnerHTML={{ __html: withPunctuationStyled }}
    />
  );
};


  // Expand/collapse by level
  const handleExpandLevel = (level) => {
    setExpandLevel(level);
    // Implementation would require a more complex JSON renderer
    // For now, we'll just set the state
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <Link href="/tools" className="text-blue-500 hover:underline mb-4 inline-block">
          &larr; Back to Tools
        </Link>
        <h1 className="text-3xl font-bold text-textColor">JSON Formatter</h1>
        <p className="text-textColorSoft mt-2">
          Format, validate, and beautify JSON with syntax highlighting and advanced features.
        </p>
      </div>

      {/* Main content or fullscreen sections */}
      {fullscreenMode === 'input' ? (
        <div className="fixed inset-0 z-50 p-4 bg-bgcolorSoft">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-textColor">Input JSON (Fullscreen)</h2>
            <div className="flex space-x-2">
              <button 
                onClick={handlePaste} 
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                title="Paste from clipboard"
              >
                <FaClipboard />
              </button>
              <button 
                onClick={() => toggleFullscreen('input')} 
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                title="Exit Fullscreen"
              >
                <FaCompress />
              </button>
            </div>
          </div>
          <div className="relative w-full h-[calc(100vh-120px)] border border-gray-600 rounded overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-800 text-gray-500 text-xs text-right pr-2 pt-2 font-mono select-none">
              {input.split('\n').map((_, i) => (
                <div key={i} className="leading-5">{i + 1}</div>
              ))}
            </div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full pl-12 pr-2 pt-2 bg-bgcolorSoft font-mono text-textColor resize-none"
              placeholder="Paste your JSON here..."
              spellCheck="false"
            />
          </div>
        </div>
      ) : fullscreenMode === 'output' ? (
        <div className="fixed inset-0 z-50 p-4 bg-bgcolorSoft">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-textColor">Formatted JSON (Fullscreen)</h2>
            <div className="flex space-x-2">
              <button 
                onClick={handleCopy} 
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                {copied ? <FaClipboardCheck /> : <FaClipboard />}
              </button>
              <button 
                onClick={() => toggleFullscreen('output')} 
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                title="Exit Fullscreen"
              >
                <FaCompress />
              </button>
            </div>
          </div>
          {error ? (
            <div className="w-full h-[calc(100vh-120px)] p-2 bg-red-100 border border-red-300 rounded text-red-700 overflow-auto">
              {error}
            </div>
          ) : (
            <div className="relative w-full h-[calc(100vh-120px)] border border-gray-600 rounded overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-800 text-gray-500 text-xs text-right pr-2 pt-2 font-mono select-none">
                {output.split('\n').map((_, i) => (
                  <div key={i} className="leading-5">{i + 1}</div>
                ))}
              </div>
              <pre
                ref={outputRef}
                className="w-full h-full pl-12 pr-2 pt-2 bg-bgcolorSoft font-mono text-textColor overflow-auto"
              >
                {syntaxHighlight(output)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Input Section */}
          <div className="flex-1">
            <div className="bg-bgcolorSoft p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-textColor">Input JSON</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={handlePaste} 
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    title="Paste from clipboard"
                  >
                    <FaClipboard />
                  </button>
                  <button 
                    onClick={() => fileInputRef.current.click()} 
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    title="Upload file"
                  >
                    <FaUpload />
                  </button>
                  <button 
                    onClick={() => toggleFullscreen('input')} 
                    className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    title="Fullscreen"
                  >
                    <FaExpand />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".json,.txt"
                  />
                </div>
              </div>
              <div className="relative w-full border border-gray-600 rounded overflow-hidden" style={{ height: `${inputHeight}px` }}>
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-800 text-gray-500 text-xs text-right pr-2 pt-2 font-mono select-none">
                  {/*<div className="flex flex-col items-end">*/}
                  {/*  <button*/}
                  {/*    onClick={() => handleExpandLevel(null)}*/}
                  {/*    className="mb-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"*/}
                  {/*    title="Expand All"*/}
                  {/*  >*/}
                  {/*    <FaChevronDown size={10} />*/}
                  {/*  </button>*/}
                  {/*  <button*/}
                  {/*    onClick={() => handleExpandLevel(1)}*/}
                  {/*    className="mb-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"*/}
                  {/*    title="Collapse All"*/}
                  {/*  >*/}
                  {/*    <FaChevronRight size={10} />*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                  {input.split('\n').map((_, i) => (
                    <div key={i} className="leading-5">{i + 1}</div>
                  ))}
                </div>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-full pl-12 pr-2 pt-2 bg-bgcolorSoft font-mono text-textColor resize-none"
                  placeholder="Paste your JSON here..."
                  spellCheck="false"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700 cursor-ns-resize hover:bg-blue-500"
                  onMouseDown={handleInputResize}
                ></div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="flex-1">
            <div className="bg-bgcolorSoft p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-textColor">Formatted JSON</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    title={copied ? "Copied!" : "Copy to clipboard"}
                  >
                    {copied ? <FaClipboardCheck /> : <FaClipboard />}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    title="Download JSON"
                    disabled={!output}
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => toggleFullscreen('output')}
                    className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    title="Fullscreen"
                  >
                    <FaExpand />
                  </button>
                </div>
              </div>
              {error ? (
                <div className="w-full p-2 bg-red-100 border border-red-300 rounded text-red-700 overflow-auto" style={{ height: `${outputHeight}px` }}>
                  {error}
                </div>
              ) : (
                <div className="relative w-full border border-gray-600 rounded overflow-hidden" style={{ height: `${outputHeight}px` }}>
                  <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-800 text-gray-500 text-xs text-right pr-2 pt-2 font-mono select-none">
                    {/*<div className="flex flex-col items-end">*/}
                    {/*  <button */}
                    {/*    onClick={() => handleExpandLevel(null)} */}
                    {/*    className="mb-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"*/}
                    {/*    title="Expand All"*/}
                    {/*  >*/}
                    {/*    <FaChevronDown size={10} />*/}
                    {/*  </button>*/}
                    {/*  <button */}
                    {/*    onClick={() => handleExpandLevel(1)} */}
                    {/*    className="mb-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"*/}
                    {/*    title="Collapse All"*/}
                    {/*  >*/}
                    {/*    <FaChevronRight size={10} />*/}
                    {/*  </button>*/}
                    {/*</div>*/}
                    {output.split('\n').map((_, i) => (
                      <div key={i} className="leading-5">{i + 1}</div>
                    ))}
                  </div>
                  <pre
                    ref={outputRef}
                    className="w-full h-full pl-12 pr-2 pt-2 bg-bgcolorSoft font-mono text-textColor overflow-auto"
                  >
                    {syntaxHighlight(output)}
                  </pre>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700 cursor-ns-resize hover:bg-blue-500"
                    onMouseDown={handleOutputResize}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Format button centered below input/output boxes - Only show when not in fullscreen mode */}
      {!fullscreenMode && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => formatJSON(input)}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-bold"
          >
            Format JSON
          </button>
        </div>
      )}

      {/* Controls - Only show when not in fullscreen mode */}
      {!fullscreenMode && (
        <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
          <div className="flex space-x-2">
            <button 
              onClick={handleUndo} 
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:opacity-50"
              disabled={historyIndex <= 0}
              title="Undo"
            >
              <FaUndo />
            </button>
            <button 
              onClick={handleRedo} 
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:opacity-50"
              disabled={historyIndex >= history.length - 1}
              title="Redo"
            >
              <FaRedo />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center text-textColor">
              <input
                type="checkbox"
                checked={syncScroll}
                onChange={() => setSyncScroll(!syncScroll)}
                className="mr-2"
              />
              Sync Scroll
            </label>
          </div>

          {/*<div className="flex space-x-1">*/}
          {/*  {[1, 2, 3, 4, 5].map(level => (*/}
          {/*    <button */}
          {/*      key={level}*/}
          {/*      onClick={() => handleExpandLevel(level)} */}
          {/*      className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 text-xs"*/}
          {/*      title={`Expand to level ${level}`}*/}
          {/*    >*/}
          {/*      L{level}*/}
          {/*    </button>*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      )}

      {/* History Toggle Button - Only show when not in fullscreen mode */}
      {!fullscreenMode && (
        <div className="mt-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-textColor">History</h2>
          <button 
            onClick={() => setShowHistory(!showHistory)} 
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            title={showHistory ? "Hide History" : "Show History"}
          >
            <FaEye />
          </button>
        </div>
      )}

      {/* History Section - Only show when not in fullscreen mode */}
      {!fullscreenMode && history.length > 0 && showHistory && (
        <div className="mt-2">
          <div className="bg-bgcolorSoft p-4 rounded-lg">
            <div className="max-h-80 overflow-y-auto">
              {Object.entries(groupHistoryByDate()).sort((a, b) => new Date(b[0]) - new Date(a[0])).map(([date, items]) => (
                <div key={date} className="mb-4">
                  <div 
                    className="flex items-center cursor-pointer p-2 bg-gray-700 rounded"
                    onClick={() => toggleDateExpansion(date)}
                  >
                    {expandedDates[date] ? <FaChevronDown className="mr-2" /> : <FaChevronRight className="mr-2" />}
                    <span className="font-semibold text-textColor">{date}</span>
                    <span className="ml-2 text-textColorSoft text-sm">({items.length} items)</span>
                  </div>

                  {expandedDates[date] && (
                    <div className="ml-4 mt-2">
                      {items.map((item) => (
                        <div 
                          key={item.index} 
                          className={`p-3 mb-2 rounded border border-gray-600 ${item.index === historyIndex ? 'bg-gray-700' : 'bg-gray-800'}`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-textColor font-mono truncate w-1/2">
                              {item.input.substring(0, 30)}{item.input.length > 30 ? '...' : ''}
                            </span>
                            <span className="text-textColorSoft text-sm">
                              {new Date(item.timestamp).toLocaleTimeString()}
                            </span>
                          </div>

                          <div className="flex space-x-2 mt-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                copyHistoryItem(item.input, true);
                              }}
                              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                              title="Copy original JSON"
                            >
                              Copy Input
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                copyHistoryItem(item.output, false);
                              }}
                              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                              title="Copy formatted JSON"
                            >
                              Copy Output
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                applyHistoryItem(item.index);
                              }}
                              className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                              title="Apply this JSON"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
