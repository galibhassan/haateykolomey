var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}


let myPdfPath = "./pdf/DCNbyForouzan.pdf";

const pdfUrlInput = document.getElementById('pdfUrlInput')
const loadPdf = document.getElementById('loadPdf')

const handlePdf = (pdfPath)=>{
    myPdfPath = pdfPath
    showPdf()
}

const handlePdfInfo = ()=>{
    handlePdf(pdfUrlInput.value)
    clientSocket.emit('appearPdf', pdfUrlInput.value)

}

loadPdf.addEventListener('click', handlePdfInfo )

clientSocket.on("receivePdf", (ro_myPdfPath)=>{
    console.log(ro_myPdfPath)
    handlePdf(ro_myPdfPath)
    //myPdfPath = pdfUrlInput.value

})
    





const appearPdf = "appearPdf"
const nextButtonClicked = 'nextButtonClicked'
const prevButtonClicked = 'prevButtonClicked'
const pageNumberEntered = 'pageNumberEntered'
const zoomInClicked = 'zoomInClicked'
const zoomOutClicked = 'zoomOutClicked'

const showPdf = ()=> {
    pdfjsLib.getDocument(myPdfPath).then(pdf => {
        myState.pdf = pdf;
        render();
    });
}

showPdf()

function render() {
    myState.pdf.getPage(myState.currentPage).then(page => {
        var canvas = document.getElementById("pdf_renderer");
        var ctx = canvas.getContext('2d');
        var viewport = page.getViewport(myState.zoom);
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        //rendering the page
        page.render({
            canvasContext: ctx,
            viewport: viewport
        })
    })
}

const handlePreviousButtonClicked = () =>{
    if (myState.pdf == null || myState.currentPage == 1) return;
    myState.currentPage = myState.currentPage - 1;

    document.getElementById('current_page').value = myState.currentPage;
    render();
}
document.getElementById('go_previous').addEventListener('click', (e) => {
    handlePreviousButtonClicked()
    clientSocket.emit(prevButtonClicked)
})


const handleNextButtonClicked = () => {
    if (myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages) return;
    myState.currentPage = myState.currentPage + 1;
    document.getElementById('current_page').value = myState.currentPage;
    render();
}
document.getElementById('go_next').addEventListener('click', (e) => {
    handleNextButtonClicked()
    clientSocket.emit(nextButtonClicked)

})

clientSocket.on('goToNextPage', () => {
    handleNextButtonClicked()
})

clientSocket.on("goToPrevButton", ()=>{
    handlePreviousButtonClicked()
})

const handlePageNumber = (e)=>{
    if (myState.pdf == null) return;

    
    //get the key
var code = (e.keyCode ? e.keyCode : e.which)
    if (code == 13) {
        var desiredPage = document.getElementById('current_page').valueAsNumber;
        if (desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages) {
            myState.currentPage = desiredPage
            document.getElementById('current_page').value = desiredPage;
            render();
        }
    }
}

/*const handlePageNumberInfo = (e)=>{
    handlePageNumber()
   clientSocket.emit(pageNumberEntered)

}*/




document.getElementById('current_page').addEventListener('keypress', (e)=>{ 
  
    handlePageNumber(e)
   
   clientSocket.emit(pageNumberEntered)
})

clientSocket.on("pressEnter", (e)=>{
    
    handlePageNumber(e)
})

zoomInButtonClicked = (e)=>{
    if (myState.pdf == null) return;
    myState.zoom = myState.zoom + 0.5;
    render()
}

document.getElementById('zoom_in').addEventListener('click', (e) => {
    zoomInButtonClicked()
    clientSocket.emit(zoomInClicked)
})

clientSocket.on("zoomIn", ()=>{
    zoomInButtonClicked()
})

const zoomOutClickedButton =()=>{
    if (myState.pdf == null) return;
    myState.zoom = myState.zoom - 0.5;
    render()

}

document.getElementById('zoom_out').addEventListener('click', (e) => {
   zoomOutClickedButton()
   clientSocket.emit(zoomOutClicked)
})

clientSocket.on("zoomOut", ()=>{
    zoomOutClickedButton()
})


