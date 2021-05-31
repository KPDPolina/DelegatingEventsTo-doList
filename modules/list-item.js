export default class ListItem {

    constructor(container) {

        this.HTMLContainer = container;
    }

    addStart(toDo) {
        const { name, id } = toDo;
        let listItem = this.createItem(name, id);
        this.HTMLContainer.prepend(listItem);
    }

    addEnd(toDo) {
        const { name, id } = toDo;
        let listItem = this.createItem(name, id);
        this.HTMLContainer.append(listItem);
    }


    removeById(id) {
        let child = this.HTMLContainer.querySelector(`[data-id ="${id}"]`);
        this.HTMLContainer.removeChild(child);
    }

    createItem(name, id) {
        const li = document.createElement("li");
        li.dataset.id = id;
        li.textContent = `${name} ${id}`;
        return li;
    }
}