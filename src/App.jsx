import React, { useCallback, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import samplePdf from "./assets/Resume.pdf";
import "./App.css";

const App = () => {
  const [searchKeywords, setSearchKeywords] = useState([
    "Talha Moazzam",
    "Talhamoazzam4118@gmail.com",
    "Frontend Developer",
    "React",
  ]);
  const [searchOtherKeywords, setSearchOtherKeywords] = useState([
    "Skills",
    "Experience",
    "LinkedIn",
    "Licenses & Certifications",
  ]);

  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const highlightPattern = (text, value) => {
    let search = new RegExp(value, "gi");
    return text.replace(search, (value) => `<mark>${value}</mark>`);
  };

  const highlightPatternOther = (text, value) => {
    let search = new RegExp(value, "gi");
    return text.replace(
      search,
      (value) => `<mark style='background-color: #75D117'>${value}</mark>`
    );
  };

  const textRenderer = useCallback(
    (textItem) => {
      let text = textItem.str;
      searchKeywords.forEach((value, index) => {
        let search = new RegExp(value, "gi");
        if (text.match(search) != null) {
          text = highlightPattern(text, value);
        }
      });

      searchOtherKeywords.forEach((value) => {
        let search = new RegExp(value, "gi");
        if (text.match(search) != null) {
          text = highlightPatternOther(text, value);
        }
      });

      return text;
    },
    [searchKeywords]
  );

  return (
    <div className="App">
      <Document file={samplePdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            customTextRenderer={textRenderer}
          />
        ))}
      </Document>
    </div>
  );
};

export default App;
