
class Brush {
    constructor(brushSize, brushColor, brushType, canvas) {
        this.brushSize = brushSize;
        this.brushColor = brushColor;
        this.brushType = brushType;
        this.canvas = canvas;
    }

    getBrushSize() {
        return this.brushSize;
    }
    setBrushSize(newSize) {
        this.brushSize = newSize;
    }
    getBrushColor() {
        return this.brushColor;
    }
    setBrushColor(newColor) {
        this.brushColor = newColor;
    }
    drawLine() {
        console.log("line tana hocche");
        // ki shob ghorar dim
    }
    drawCircle(x, y, color) {
        const ctx = this.canvas.getContext("2d")
        ctx.beginPath();
        ctx.arc(x, y, this.brushSize, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();


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

