import { useState } from 'react';

type dataType = {
    initialContent:string,
    expandedContent:string
}
const Content = ({ initialContent, expandedContent }: dataType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p>{isExpanded ? initialContent + expandedContent : initialContent  }<a className='fw-bold cursor-pointer ms-2 text-secondary' onClick={toggleExpand} hidden={expandedContent === "" ? true : false}>{isExpanded ? 'Read Less' :".... " + ' Read More'}</a></p>
    </div>
  );
};

export default Content;