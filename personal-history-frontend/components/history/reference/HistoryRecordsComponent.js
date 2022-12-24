import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

export default function HistoryRecordsComponent(prop) {
  return (
    <>
      {prop.histories.map((history) => (
        <div className="w-[360px]">
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton style={{ padding: "5px" }}>
                  <div className="ml-2">{history.title}</div>
                  {history.startDateYyyyMMStr && history.endDateYyyyMMStr && (
                    <div className="text-right mt-2 mr-2">
                      {history.startDateYyyyMMStr && (
                        <span className="mr-2">
                          {history.startDateYyyyMMStr}
                        </span>
                      )}
                      <span>〜</span>
                      {history.endDateYyyyMMStr && (
                        <span className="ml-2">{history.endDateYyyyMMStr}</span>
                      )}
                    </div>
                  )}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{history.description}</AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </>
  );
}
