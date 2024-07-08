import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import AllotmentPDF from "../components/allotmentPDF";

export const useDownload = () => {

    const [id, setId] = useState();

  const downloadAlloc = useReactToPrint({
    content: () => <AllotmentPDF id={id}></AllotmentPDF>,
    documentTitle: "data",
    onAfterPrint: () => alert("download success"),
  });

  return {downloadAlloc, setId}
};
