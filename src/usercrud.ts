import { data } from "./json-data";
import { userclass } from "./user";
//import { roletype } from "./roletype";
import { Crud } from "./crudinterface";

export class usercrud implements Crud{

    users: userclass[];
    header: string[];
    table: HTMLTableElement;
    tableContainer: HTMLDivElement;
    data: { id: string; FirstName: string; MiddleName: string; LastName: string; Email: string; Phone: string; Role: string; Address: string; }[];

    constructor() {
      
        this.data = data;
        this.header = [];
        this.tableContainer = <HTMLDivElement>document.querySelector('.Table')!;
        this.table = document.createElement("table");
        this.read();
       
    }
    create() {
        this.createTable();
    }
    createTable() {
        let table = document.createElement('table');
        table.id = 'table';
        let existableTable = document.getElementById('table');
        if (typeof (existableTable) != undefined && existableTable != null) {
            existableTable.parentNode.removeChild(existableTable);
        }

        let newHeader = table.insertRow();
        for (const [key, value] of Object.entries(data[0])) {
            var cell = newHeader.insertCell();
            var text = document.createTextNode(key);
            cell.appendChild(text);
        }

        for (let i = 0; i < data.length; i++) {
            let newRow = table.insertRow();
            newRow.id = i.toString();
            for (const [key, value] of Object.entries(data[i])) {
                let newCell = newRow.insertCell();
                let text = document.createTextNode(value.length > 0 ? value : "");
                newCell.append(text);
            }
            let cell1 = newRow.insertCell();
            let editButton = document.createElement('Button');
            editButton.innerHTML = "Edit";
            editButton.id = "button" + i;
            editButton.classList.add("editButton");

            cell1.appendChild(editButton);
            editButton.addEventListener('click', (event: Event) => {
                if (editButton.innerHTML === 'Edit') {
                    editButton.innerHTML = 'Save';
                    return this.update(event);
                }
                else {
                    editButton.innerHTML = 'Edit';
                    return this.saveData(event);
                }
            });
            let cell2 = newRow.insertCell();
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.id = 'button' + i;
            deleteButton.classList.add("deleteButton");

            cell2.append(deleteButton);
            deleteButton.addEventListener('click', (event: Event) => {
                if (deleteButton.innerHTML === 'Delete') {
                    return this.delete(event);
                }
                else {
                    deleteButton.innerHTML = 'Delete';
                    return this.cancel(event);
                }
            });

        }
        this.tableContainer.append(table); 
    }
    cancel(event) {
       let tr = event.target.parentNode.parentNode;
        tr.contentEditable = false;
        let indexOfRow = tr.id;
        let Button = document.getElementById("button" + indexOfRow);
        Button.innerHTML = "Edit"; 
    }
    read() {

    }
    update(event) {
        let tr = event.target.parentNode.parentNode;
        let indexOfRow = tr.id;
        tr.contentEditable = true;
        console.log("tr value : " + tr);
        let button = document.getElementById("button" + indexOfRow);
        button.innerHTML = "Cancel";   
    }
    saveData(event) {
        let tr = event.target.parentNode.parentNode;
        tr.contentEditable = false;
        let i = tr.id;
        let Button = document.getElementById('button' + i);
        console.log(Button);
        Button.innerHTML = "Delete";  
    }
    delete(event) {
      let targetButton = event.target as HTMLElement;
        let tr = targetButton.parentNode.parentNode;
        tr.parentNode.removeChild(tr);   
    }
    refreshData() {
        this.createTable(); 
    }
}