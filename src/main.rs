use axum::{routing::get, Router};
use std::sync::Arc;
use surrealdb::{Surreal, engine::local::Db};
use tokio::sync::Mutex;

mod components;
use components::app::{App, TodoList};

#[derive(Clone)]
struct AppState {
    db: Arc<Surreal<Db>>,  // Changed Mem to Db
}

#[tokio::main]
async fn main() {
    // Initialize the in-memory database
    let db = Surreal::new::<Db>("memory").await.unwrap();

    // Create the application state with the database connection
    let state = AppState {
        db: Arc::new(db),
    };

    // Setup the router and pass the state to handlers
    let app = Router::new()
        .route("/", get(move || async move {
            let html = leptos::ssr::render_to_string(|cx| view! { cx, <App db=state.db.clone() /> });
            html
        }));

    // Run the web server
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
