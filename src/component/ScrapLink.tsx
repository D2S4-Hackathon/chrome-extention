// import { useState } from "react";

// const ScrapLink = () => {
//   const [links, setLinks] = useState<LinkItem[]>([]);

//   const handleButton = async () => {
//     const [tab] = await chrome.tabs.query({
//       active: true,
//       currentWindow: true,
//     })

//     chrome.runtime.sendMessage({
//       type: "GET_LINKS",
//       tabId: tab.id,
//     }, (response) => {
//       if (response?.links) {
//         setLinks(response.links)
//       }
//     });

//     console.log(links)
//   }

//   return (
//     <div>
//       <h1>현재 페이지 링크</h1>
//       {links.map((l) => (
//         <li key={l.id}>
//           <a href={l.url} target="_blank" rel="noreferrer">
//             {l.text || "제목 없음"}
//           </a>
//         </li>
//       ))}
//       <button onClick={handleButton} value={"버튼"}>버튼</button>
//     </div>
//   )
// }

// export default ScrapLink;