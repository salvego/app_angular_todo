import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public todos: Todo[] = [];
  public header: String = "Minhas Tarefas";
  public form: FormGroup;
  public mode: String = 'list';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titleTarefa: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })

    this.load();
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  add(){
    const title = this.form.controls['titleTarefa'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
    this.changeMode('list');
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo){
    const index  = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save();
  }

  markAsUnDone(todo: Todo){
    todo.done = false;
    this.save();
  }
  
  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load(){
    const data = localStorage.getItem('todos');
    this.todos = JSON.parse(data!);
  }

}
