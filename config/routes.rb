Rails.application.routes.draw do
  root "welcome#index"

  resources :users, only: [:new, :create]
  resources :links, only: [:index, :create]

  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#delete"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :links, only: [:index, :create, :show, :destroy, :update], module: "links"
    end
  end
end
