           
           
           
            


            
                
                
                
                
                   
               
                
            


            

            var slideButton = document.getElementById("slideButton")
            const boardButtonFake = document.getElementById('boardButtonFake')
            var eraseButton = document.getElementById("eraseButton")


            var canvas = document.getElementById("canvas")
            var boardButton = document.getElementById("boardButton")
            var brushButton = document.getElementById("brushButton")
           
            var voiceButton = document.getElementById("voiceButton")
            var slideContainer = document.getElementById("slideContainer")
           var my_pdf_viewer = document.getElementById('my_pdf_viewer')

           
         const slideButtonClicked = ()=>{
           slideButton.addEventListener("click", () => {
                canvas.style.display = "none";
                boardButtonFake.style.display = "none";
                brushButtonFake.style.display = "none";
                eraseButton.style.display = "none";
                document.body.style.backgroundColor = "white";
               
                voiceButton.style.marginTop = "-600px";
                voiceButton.style.display = "block";
                slideContainer.style.display = "block"
                slideButton.style.backgroundColor = "#C9C9C9";
                slideButton.style.color = "white";
                drawingBoard.style.backgroundColor = "white";
                my_pdf_viewer.style.display = "block"
                drawingBoard.style.color = "#C9C9C9"

            });

        }

        slideButtonClicked();
        
     const boardButtonClicked =   () =>{    
        var drawingBoard = document.getElementById("drawingBoard")
            drawingBoard.addEventListener("click", () => {
                canvas.style.display = "block";
                slideContainer.style.display = "none"
                boardButtonFake.style.display = "block";
                brushButtonFake.style.display = "block";
                eraseButton.style.display = "block";
                voiceButton.style.marginTop = "5px";
               // brushButton.style.marginTop = "-49px";
                eraseButton.style.marginTop = "10px";
                drawingBoard.style.backgroundColor = "#C9C9C9";
                drawingBoard.style.color = "white";
                slideButton.style.backgroundColor = "white";
                my_pdf_viewer.style.display = "none"
                slideButton.style.color = "#C9C9C9"


            });
     }

     boardButtonClicked();



        