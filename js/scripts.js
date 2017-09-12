/* jshint esversion: 6 */
import * as ko from 'knockout';

class Todo {
    constructor(text, index, isEditing = false, isCompleted = false) {
        this.isEditing = ko.observable(isEditing);
        this.isCompleted = ko.observable(isCompleted);
        this.text = ko.observable(text);
        this.index = ko.observable(index);
    }
}

class TodoModel {
    constructor() {
        this.items = ko.observableArray([]);
        const todos = JSON.parse(localStorage.getItem('SimpleTodoList'));
        if (todos) {
            Array.from(todos).forEach((t) => {
                this.items.push(new Todo(t.text, t.index, false, t.isCompleted));
            });
        }

        this.todoToAdd = ko.observable('');
        this.selectedItems = ko.observableArray([]);
        this.itemEditing = ko.observable({});

        this.addItem = () => {
            const newTast = new Todo(this.todoToAdd(), this.items.length);
            if (this.todoToAdd() != null) {
                this.items.unshift(newTast);
                this.saveItems();
            }
            this.todoToAdd('');
        };
        this.removeItem = (e) => {
            this.items.remove(e);
            this.saveItems();
        };
        this.edit = (e) => {
            if (!e.isCompleted()) {
                if (e.isEditing()) {
                    this.saveItems();
                }
                e.isEditing(!e.isEditing());
            }
        };
        this.complete = (e) => {
            e.isEditing(false);
            e.isCompleted(!e.isCompleted());
            this.saveItems();
        };
        this.saveItems = () => {
            localStorage.setItem('SimpleTodoList', ko.toJSON(this.items()));
        };
    }
}

ko.applyBindings(new TodoModel(), document.getElementById('todo'));
