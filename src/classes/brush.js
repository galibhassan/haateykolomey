class Brush {
    constructor(brushSize, brushColor, brushType) {
        this.brushSize = brushSize;
        this.brushColor = brushColor;
        this.brushType = brushType;
    }

    getBrushSize(){
        return this.brushSize;
    }
    setBrushSize(newSize){
        this.brushSize = newSize;
    }
    getBrushColor(){
        return this.brushColor;
    }
    setBrushColor(newColor){
        this.brushColor = newColor;
    }
    drawLine(){
        console.log("line tana hocche");
    }
    drawCircle(){
        console.log("circle aka hocche");
    }
}

module.exports = {
    Brush: Brush
}

/*
    // properties
        brushSize: number       radius of the brush tip
        brushColor: String      color that the brush will paint with
        
        to implement later
        brushType: string       whether the brushstrokes looks like a pen, pencil, marker, paintbrush

    // functionality
        drawLine
        drawCircle
        
    // test code
        const kashemBrush = new Brush(10, 'orange', 'fountainPen')
        kashemBrush.drawCircle()
        kashemBrush.setBrushSize(50)
*/

