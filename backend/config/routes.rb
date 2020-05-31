Rails.application.routes.draw do
  scope :api do
    resources :posts do
      resources :comments, except: [:show]

      post :like_it, as: :like_it
      post :dislike_it, as: :dislike_it
    end
    
    devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
    
    devise_scope :user do
      post "users/sessions.json" => 'users/sessions#create'
      delete "users/sessions.json" => 'users/sessions#destroy'
      get "users/sessions.json" => 'users/sessions#current'
    end

  end
end
