import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Conduct = () => {
  const [markdown, setMarkdown] = useState("");
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    if (language === "en") setLanguage("th");
    else setLanguage("en");
  };

  const switchLanguagePrefix =
    language === "en" ? "version" : "This content is also available in";
  const languageSuffix = language === "en" ? "ภาษาไทย" : "English";

  useEffect(() => {
    fetch(`markdown/conduct-${language}.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, [language]);

  return (
    <div className="unreset mx-auto flex max-w-screen-2xl flex-col pb-20">
      <p className="my-3">
        {switchLanguagePrefix} :{" "}
        <span className="cursor-pointer text-blue-500" onClick={toggleLanguage}>
          {languageSuffix}
        </span>
      </p>
      <ReactMarkdown children={markdown} />
    </div>
  );
};

export default Conduct;
