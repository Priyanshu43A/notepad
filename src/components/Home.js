import React, { useState, useEffect } from "react";

function Home() {
  const [text, setText] = useState("");
  const [inputText, setInputText] = useState("");
  const [fontWeight, setFontWeight] = useState("normal");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setbgColor] = useState("#ffffff");
  const [savedNotes, setSavedNotes] = useState([]);

  // Functions
  const handleTextColor = (event) => {
    setTextColor(event.target.value);
  };

  const handlebgColor = (event) => {
    setbgColor(event.target.value);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleInputTitleChange = (event) => {
    setInputText(event.target.value);
  };

  const getWordAndCharacterCount = (text) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = text.length;

    return { wordCount, charCount };
  };

  const { wordCount, charCount } = getWordAndCharacterCount(text);

  const getReadingTime = (wordCount) => {
    const wordsPerMinute = 200;
    const timeInMinutes = wordCount / wordsPerMinute;
    const minutes = Math.floor(timeInMinutes);
    const seconds = Math.round((timeInMinutes - minutes) * 60);

    return { minutes, seconds };
  };

  const { minutes, seconds } = getReadingTime(wordCount);

  const handleUppercaseClick = () => {
    setText(text.toUpperCase());
  };

  const handleLowercaseClick = () => {
    setText(text.toLowerCase());
  };

  const capitalizeWords = () => {
    const capitalText = text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    setText(capitalText);
  };

  const formatText = () => {
    const formattedText = text.trim().replace(/\s+/g, " ");
    setText(formattedText);
  };

  const toggleBoldness = () => {
    if (fontWeight === "normal") {
      setFontWeight("bold");
    } else {
      setFontWeight("normal");
    }
  };

  const getButtonLabel = () => {
    return fontWeight === "normal" ? "Bold" : "Normal";
  };

  function copyText(text) {
    navigator.clipboard.writeText(text).then(
      () => console.log("Text copied to clipboard successfully!"),
      (err) => console.error("Failed to copy text: ", err)
    );
  }

  const handleCopy = () => {
    copyText(text);
  };

  const handleClear = () => {
    setText("");
    setInputText("");
    setTextColor("#000000");
    setFontWeight("normal");
  };

  const formatTextForPreview = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const saveNote = () => {
    // Check if the textarea is not blank
    if (text.trim() === "") {
      alert("The text area cannot be blank. Please enter some text.");
      return;
    }

    // Get existing notes from local storage or initialize an empty array
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

    // Create a new note object
    const newNote = {
      title: inputText,
      text: text,
      fontWeight: fontWeight,
      textColor: textColor,
    };

    // Add the new note to the array
    savedNotes.push(newNote);

    // Save the updated array back to local storage
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    // Optional: Clear the input fields after saving
    setInputText("");
    setText("");
    setTextColor("#000000");
    setFontWeight("normal");
    //setBgColor("#ffffff");

    // Show success alert
    alert("Your note was saved successfully!");

    // Reload notes to update the UI
    loadNotes();
  };

  const loadNotes = () => {
    // Retrieve notes from local storage
    const notes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    setSavedNotes(notes);
  };

  // Load notes when the component mounts
  useEffect(() => {
    loadNotes();
  }, []);

  const handleDelete = (index) => {
    // Retrieve existing notes from local storage
    const notes = JSON.parse(localStorage.getItem("savedNotes")) || [];

    // Remove the note at the specified index
    notes.splice(index, 1);

    // Update local storage with the remaining notes
    localStorage.setItem("savedNotes", JSON.stringify(notes));

    // Update state to reflect the changes
    setSavedNotes(notes);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Utilities Menu */}
      <div className="utilsMenu bg-white shadow-md p-4 rounded-md md:col-span-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Utilities</h2>
        <div className="flex flex-col space-y-2">
          <button
            onClick={toggleBoldness}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {getButtonLabel()}
          </button>
          <button
            onClick={handleUppercaseClick}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Uppercase
          </button>
          <button
            onClick={capitalizeWords}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Capitalize
          </button>
          <button
            onClick={handleLowercaseClick}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Lowercase
          </button>
          <button
            onClick={handleCopy}
            className="bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
          >
            Copy text
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Clear text
          </button>
          <button
            onClick={formatText}
            className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Format text
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="editor bg-white shadow-md p-4 rounded-md md:col-span-2">
        <input
          onChange={handleInputTitleChange}
          value={inputText}
          className="w-full text-xl font-semibold border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 mb-4"
          placeholder="Title"
          type="text"
        />
        <textarea
          onChange={handleInputChange}
          style={{ fontWeight }}
          value={text}
          className="w-full h-56 border-2 border-gray-300 focus:border-blue-500 outline-none p-2 rounded-md mb-4"
          placeholder="Enter text here..."
        />
        <button
          onClick={saveNote}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      {/* Stats */}
      <div className="stats bg-white shadow-md p-4 rounded-md md:col-span-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistics</h2>
        <div>
          <p className="text-gray-600">
            Words: <span className="font-bold">{wordCount}</span>
          </p>
          <p className="text-gray-600">
            Characters: <span className="font-bold">{charCount}</span>
          </p>
          <p className="text-gray-600">
            Time to read:{" "}
            <span className="font-bold">
              {minutes} minutes and {seconds} seconds
            </span>
          </p>
        </div>
        {/* saved notes */}
        <div className="saved-notes bg-white shadow-md p-4 rounded-md md:col-span-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Saved Notes
          </h2>
          {savedNotes.length === 0 ? (
            <p>No notes saved yet.</p>
          ) : (
            savedNotes.map((note, index) => (
              <div
                key={index}
                className="border border-gray-300 mb-4 pb-4 p-4 rounded-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {note.title}
                </h3>
                <p
                  //   style={{ fontWeight, color: note.textColor }}
                  className="text-gray-700 mb-4 overflow-hidden text-ellipsis whitespace-nowrap"
                  title={note.text} // Tooltip to show full text on hover
                >
                  {note.text.split(" ").slice(0, 4).join(" ")}
                  {note.text.split(" ").length > 4 ? "..." : ""}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setText(note.text);
                      setInputText(note.title);
                      setFontWeight(note.fontWeight);
                      setTextColor(note.textColor);
                      handleDelete(index);
                    }} // Replace with actual open functionality
                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="preview bg-white shadow-md p-4 rounded-md md:col-span-2">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Preview</h2>
        <div className="flex space-x-4 mb-4">
          <button className="flex items-center space-x-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
            <span>Change text color:</span>
            <input
              type="color"
              id="textcolor"
              name="textcolor"
              value={textColor}
              onChange={handleTextColor}
            />
          </button>
          <button className="flex items-center space-x-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
            <span>Change background color:</span>
            <input
              type="color"
              name="bgcolor"
              value={bgColor}
              onChange={handlebgColor}
              id="bgcolor"
            />
          </button>
        </div>
        <div
          style={{ backgroundColor: bgColor }}
          className="border-t-2 border-gray-200 p-4"
        >
          <h2
            style={{ color: textColor }}
            className="title text-2xl font-bold text-gray-800 mb-2"
          >
            {inputText || "Title"}
          </h2>
          <p
            style={{ fontWeight, color: textColor }}
            className="text text-gray-700 break-words"
          >
            {text
              ? formatTextForPreview(text)
              : "Your input text will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
