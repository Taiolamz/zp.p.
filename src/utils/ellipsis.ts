const ellipsis = (text: string, maxlimit: number) => {
    return `${
      text?.length > maxlimit ? text?.substring(0, maxlimit - 3) + "..." : text
    }`;
  };
  
  export default ellipsis;