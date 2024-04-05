import React from "react";
import parse, { domToReact, attributesToProps } from 'html-react-parser';

const options = {
  replace(domNode) {
    const props = attributesToProps(domNode.attribs);
    if (domNode.name === 'h2') {
      return <h2 {...props} className="font-bold text-3xl md:text-4xl py-4 md:py-6" >{domToReact(domNode.children, options)}</h2>;
    }
    if (domNode.name === 'h3') {
      return <h3 className="font-bold text-xl md:text-3xl py-2 md:py-4" >{domToReact(domNode.children, options)}</h3>;
    }
    if (domNode.name === 'p') {
      return <p className="text-textColorSoft text-base md:text-xl py-4 leading-loose md:leading-loose text-justify" >{domToReact(domNode.children, options)}</p>;
    }
    if (domNode.name === 'img') {
      const props = attributesToProps(domNode.attribs);
      return <img {...props} className="rounded-xl"/>;
    }
    if (domNode.name === 'pre') {
      return <pre className="bg-bgcolorSoft text-xs mg:text-lg p-5 md:p-8 leading-loose rounded-xl overflow-auto" >{domToReact(domNode.children, options)}</pre>;
    }
    if (domNode.name === 'iframe') {
      const props = attributesToProps(domNode.attribs);
      return <iframe {...props} className="w-full h-64 md:h-[500px] rounded-xl" ></iframe>;
    }
    if (domNode.name === 'ol') {
      return <ol className="text-textColorSoft text-base md:text-xl list-decimal" >{domToReact(domNode.children, options)}</ol>;
    }
    if (domNode.name === 'ul') {
      return <ul className="text-textColorSoft text-base md:text-xl list-disc" >{domToReact(domNode.children, options)}</ul>;
    }
    if (domNode.name === 'li') {
      return <li className="ml-8 md:ml-16 -mt-6" >{domToReact(domNode.children, options)}</li>;
    }
    if (domNode.name === 'strong') {
      return <strong className="font-bold text-textColor opacity-80" >{domToReact(domNode.children, options)}</strong>;
    }
    if (domNode.name === 'em') {
      return <em className="italic" >{domToReact(domNode.children, options)}</em>;
    }
    if (domNode.name === 'a') {
      const props = attributesToProps(domNode.attribs);
      return <a {...props} className="underline underline-offset-4 italic cursor-pointer" >{domToReact(domNode.children, options)}</a>;
    }
    if (domNode.name === 'hr') {
      return <hr className="my-5 opacity-40" ></hr>;
    }
    if (domNode.name === 'blockquote') {
      return <div className="italic px-4 border-l-4 border-bgcolorSoft text-textColorSoft">{domToReact(domNode.children, options)}</div>;
    }
  },
};

const BlogContent = ({ content }) => {

  return (
    <div className="flex justify-center pb-8">
      <div className="mx-2 px-3 md:px-8 lg:px-0 lg:mx-0 lg:w-3/5 text-textColor w-full">
        {(parse(content.html, options))}
      </div>
    </div>
  );
};

export default BlogContent;
