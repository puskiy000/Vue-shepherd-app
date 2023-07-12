import { Sidebar } from './Sidebar';
import { Spinner } from './Spinner';
import { testHighlights as _testHighlights } from './test-highlights';
import { useEffect, useState } from 'react';
import type { IHighlight, NewHighlight } from 'react-pdf-highlighter';
import { PdfLoader, PdfHighlighter, Tip, Highlight, Popup, AreaHighlight } from 'react-pdf-highlighter';

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice('#highlight-'.length);

const resetHash = () => {
  document.location.hash = '';
};

const HighlightPopup = ({
  comment
}: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;


const TempPDFViewer = ({ pdfLink }: { pdfLink: URL }) => {
    const [highlights, setHighlights] = useState<Array<IHighlight>>([]);
    const [url, setUrl] = useState(pdfLink)
  const resetHighlights = () => {
    setHighlights([]);
  };

  let scrollViewerTo = (highlight: any) => {
    // we will fill this in later;
  };

  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight) {
      scrollViewerTo(highlight);
    }
  };

    useEffect(() => {
        if (window) window.addEventListener('hashchange', scrollToHighlightFromHash, false);
    }, [])

  const getHighlightById = (id: string) => {
    return highlights.find((highlight) => highlight.id === id);
  }

  const addHighlight = (highlight: NewHighlight) => {
      setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);
  }

  const updateHighlight = (highlightId: string, position: object, content: object) => {
      const updated = highlights.map(highlight => {
          const { id, position: originalPosition, content: originalContent, ...rest } = highlight;

          if (id === highlightId) {
              return {
                  id,
                  position: { ...originalPosition, ...position },
                  content: { ...originalContent, ...content },
                  ...rest
              }
          } else return highlight
      });

      setHighlights(updated);

  }

    return (
      <div
        style={{ display: 'flex', height: '100vh', width: '100%' }}
        className="lg:col-span-6 flex-auto h-full"
      >
        {/* <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
          toggleDocument={this.toggleDocument}
        /> */}
        <div
          style={{
            height: '100vh',
            width: '75vw',
            position: 'relative'
          }}
        >
          {/* @ts-ignore: this is a documented error regarding TS2786. I don't know how to fix yet (ref: https://stackoverflow.com/questions/72002300/ts2786-typescript-not-reconizing-ui-kitten-components)  */}
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              // @ts-ignore: same issue as linked above
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                // pdfScaleValue="page-width"
                scrollRef={(scrollTo) => {
                  scrollViewerTo = scrollTo;

                  scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  // @ts-ignore: same issue as linked above
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={(comment) => {
                      addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    // @ts-ignore: same issue as linked above
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    // @ts-ignore: same issue as linked above
                    <AreaHighlight
                      isScrolledTo={isScrolledTo}
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    // @ts-ignore: same issue as linked above
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={(popupContent) =>
                        setTip(highlight, (highlight) => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
      </div>
    );
}

export default TempPDFViewer;
