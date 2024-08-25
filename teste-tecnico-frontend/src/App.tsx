import React, { useState, useRef, useEffect } from 'react';


interface Frame {
  id: string;
  demoId: string;
  order: number;
  html: string;
  createdAt: string;
  updatedAt: string;
}

interface Demo {
  id: string;
  name: string;
  frames: Frame[];
  createdAt: string;
  updatedAt: string;
}

function App() {

  const [demos, setDemos]  = useState<Demo[] | undefined>(undefined);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalHtml, setOriginalHtml] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
console.log(selectedFrame);

  const handleViewFrame = (frame : Frame, demo: Demo) => {

    setSelectedFrame(frame);
    setSelectedDemo(demo);
    setIsEditing(false);
    setOriginalHtml(null);

  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    
    const iframeDocument = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;

    if(iframeDocument){
      iframeDocument.body.contentEditable = "true";
      setIsEditing(true);
      setOriginalHtml(iframeDocument.documentElement.outerHTML);
    }
  };

  const handleCancelEditing = () => {
    const iframeDocument = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;

    if(iframeDocument && originalHtml){
      iframeDocument.documentElement.innerHTML = originalHtml;
      iframeDocument.body.contentEditable = "false";
      iframeDocument.body.addEventListener('dblclick', handleDoubleClick);
      setIsEditing(false);
    }
  };

  const handleSaveChanges = async () => {
    const iframeDocument = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;

    if (iframeDocument && selectedFrame) {
      setIsEditing(false);
      const updatedHtml = iframeDocument.documentElement.outerHTML;
      setSelectedFrame(prev => prev ? { ...prev, html: updatedHtml } : null);
      try {
        const response = await fetch(`http://localhost:3001/frames/${selectedFrame?.id}`, {
          method : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            html: updatedHtml
          }),
        });
        console.log(response);
        
        
      } catch (error) {
        console.log(error);
      }
      
      
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFrameId = event.target.value;
    const demo = demos?.find(demo => demo.frames.some(frame => frame.id === selectedFrameId));
    const frame = demo?.frames.find(frame => frame.id === selectedFrameId);
    if (frame && demo) {
      handleViewFrame(frame, demo);
    }
  };

  const handlePreviousFrame = () => {
    if (selectedDemo && selectedFrame) {
      const currentIndex = selectedDemo.frames.findIndex(frame => frame.id === selectedFrame.id);
      if (currentIndex > 0) {
        handleViewFrame(selectedDemo.frames[currentIndex - 1], selectedDemo);
      }
    }
  };
  
  const handleNextFrame = () => {
    if (selectedDemo && selectedFrame) {
      const currentIndex = selectedDemo.frames.findIndex(frame => frame.id === selectedFrame.id);
      if (currentIndex < selectedDemo.frames.length - 1) {
        handleViewFrame(selectedDemo.frames[currentIndex + 1], selectedDemo);
      }
    }
  };

  useEffect(() => {

    const iframeDocument = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;

    if (iframeDocument) {
      iframeDocument.body.addEventListener('dblclick', handleDoubleClick);

      return () => {
        iframeDocument.body.removeEventListener('dblclick', handleDoubleClick);
      };
    }
  }, [selectedFrame]); 

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/demos')
      if(response.ok){
        setDemos(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 w-80 p-4 border-r border-black rounded-lg h-full overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-lg font-bold mb-2 text-center">Demos</h2>
        </div>
        <div>
          {demos && demos.map(demo => (
            <div key={demo.id} className="mb-8 text-center">
              <h3 className="text-md font-semibold mb-4">{demo.name}</h3>
              <select onChange={handleSelectChange} className="border border-black text-black text-lg rounded-lg  focus:border-blue-500 block w-full p-2.5">
                <option  value=''>Selecione um Frame</option>
                {demo.frames.map(frame => (
                  <option key={frame.id} value={frame.id}>
                    Frame {frame.order}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 ml-80 px-4 mt-4">
        {selectedFrame && selectedDemo ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                <span className='text-gray-500'>Visualizando Demo: </span> {selectedDemo.name} <span className='text-gray-500'>e Frame: </span> {selectedFrame.order}
              </h3>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    onClick={handleCancelEditing}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => handlePreviousFrame()}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10 ml-8"
              >
                &lt;
              </button>
              <iframe
                srcDoc={selectedFrame.html}
                title={`Frame ${selectedFrame.order}`}
                className="border-2 border-gray-800"
                width='100%'
                height='780px'
                ref={iframeRef}
                onLoad={() => {
                  const iframeDocument = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
                  if (iframeDocument) {
                    iframeDocument.body.addEventListener('dblclick', handleDoubleClick);
                  }
                }}
              />
              <button
                onClick={() => handleNextFrame()}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10 mr-8"
              >
                &gt;
              </button>
            </div>
          </div>
        ): (
          <div className="flex items-center justify-center h-full">
            <img 
              src='../public/no_image.jpg'
              alt="Nenhum Frame Selecionado"
              className="max-w-full max-h-full"
            />
          </div>
        )
        }
      </div>
    </div>
);
};

export default App
