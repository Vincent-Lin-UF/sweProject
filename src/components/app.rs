use leptos::*;
use surrealdb::Surreal;
use surrealdb::engine::local::Db;
use std::sync::Arc;

#[component]
pub fn App(cx: Scope, db: Arc<Surreal<Db>>) -> impl IntoView {
    view! { cx,
        <div>
            <h1>"Leptos Axum Todo"</h1>
            <TodoList db=db />
        </div>
    }
}

#[component]
fn TodoList(cx: Scope, db: Arc<Surreal<Db>>) -> impl IntoView {
    let todos = create_signal(cx, Vec::<Todo>::new());

    let db = db.clone();
    cx.spawn(async move {
        if let Ok(loaded_todos) = db.select::<Vec<Todo>>("todo").await {
            todos.set(loaded_todos);
        }
    });

    view! { cx,
        <ul>
            {move || todos.get().iter().map(|todo| view! { cx, <li>{&todo.content}</li> }).collect::<Vec<_>>()}
        </ul>
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Todo {
    id: String,
    content: String,
}
