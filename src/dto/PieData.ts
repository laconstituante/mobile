export class PieData{
    labels:Array<string>;
    datasets:PieDataSet
    addElement(label:string,value:number,bg:string,hoverBg:string){
        this.labels.push(label);
        this.datasets.addElement(value,bg,hoverBg);
    }
    constructor(){
        this.labels = new Array<string>();
        this.datasets = new PieDataSet();
    }
}

export class PieDataSet{
    data:Array<number>;
    backgroundColor:Array<string>;
    hoverBackgroundColor:Array<string>;

    addElement(data:number,bgColor:string,hoverBgColor:string){
        this.data.push(data);
        this.backgroundColor.push(bgColor);
        this.hoverBackgroundColor.push(hoverBgColor);
    }
    constructor(){
        this.data = new Array<number>();
        this.backgroundColor = new Array<string>();
        this.hoverBackgroundColor = new Array<string>();
    }
}