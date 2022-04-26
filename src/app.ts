import { usercrud } from "./usercrud";



class App {
    loadBtn: HTMLButtonElement;
    refreshBtn: HTMLButtonElement;
    usercrud: usercrud;
    constructor() {
        this.loadBtn = document.getElementById("load-btn")! as HTMLButtonElement;
        this.refreshBtn = document.getElementById("refresh-btn")! as HTMLButtonElement;
        this.usercrud = new usercrud();
        this.loadBtn.addEventListener("click", this.loadData);
        this.refreshBtn.addEventListener("click", this.refreshData);
        this.refreshBtn.style.display = "none";
    }
    loadData = () => {
        this.usercrud.create();
        this.refreshBtn.style.display = "block";
        this.loadBtn.style.display = "none";
    }
    refreshData = () => {
        this.usercrud.refreshData();
    }
}

new App();