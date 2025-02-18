import React, { useState } from "react";

const codeString = `
  const [sectionToShow, setSectionToShow] = useState(-1);

  return React.createElement(
    React.Fragment,
    null,
    sections.map((section, index) =>
      React.createElement(
        "section",
        {
          key: index,
          onClick: () => {
            setSectionToShow(index);
          },
        },
        index,
        section.title,
        React.createElement(
          "details",
          { hidden: index === sectionToShow },
          section.details
        )
      )
    )
  );
`;

const sections = [
  {
    title: "📌 Summary\n",
    details:
      "Full Stack Developer with more than 4 years of experience specializing in enhancing web and mobile applications.\n\n",
  },
  {
    title: "💼 Work Experience\n",
    details:
      "🔹 Take Off Labs - Full Stack Developer\n🔹 Take Off Labs - Full Time Intern\n🔹 Naggaro - Java remote learning\n\n",
  },
  {
    title: "🛠  Skills\n",
    details:
      "🔹 React\n🔹 React Native\n🔹 TypeScript\n🔹 Ruby on Rails\n🔹 SQL\n\n",
  },
  {
    title: "📂 GitHub\n",
    details:
      "🔗 github.com/PopMarius13 | Open-source projects and contributions.\n\n",
  },
  {
    title: "⚛️  ReactCV Demo Code",
    details: codeString,
  },
];

const CV = () => {
  const [sectionToShow, setSectionToShow] = useState(-1);

  return React.createElement(
    React.Fragment,
    null,
    sections.map((section, index) =>
      React.createElement(
        "section",
        {
          key: index,
          onClick: () => {
            setSectionToShow(index);
          },
        },
        index,
        section.title,
        React.createElement(
          "details",
          { hidden: index === sectionToShow },
          section.details
        )
      )
    )
  );
};

export default CV;
